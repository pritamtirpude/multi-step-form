import { useStepStore } from '../store/step-store';
import FormFooterButtons from './FormFooterButtons';
import ThankYou from './ThankYou';
import TitleAndDescription from './TitleAndDescription';

const FinishingUp = () => {
  const { formData, decreaseStep, isConfirmed } = useStepStore();

  const parsedAddonData =
    typeof formData?.addOns === 'string' ? JSON.parse(formData.addOns) : null;

  const calculateTotal = () => {
    if (parsedAddonData.length > 0) {
      return parsedAddonData
        .filter((item: { isChecked: boolean }) => item.isChecked)
        .reduce(
          (acc: number, item: { addOnPrice: number; isChecked: boolean }) =>
            acc + item.addOnPrice,
          formData?.price || 0
        );
    }
    return formData?.price || 0;
  };

  return (
    <div className="relative -top-9 mx-auto h-full w-[90%] rounded-lg bg-white px-6 py-8 shadow-md lg:top-0 lg:mx-0 lg:w-auto lg:bg-none lg:p-0 lg:shadow-none">
      {isConfirmed ? (
        <ThankYou />
      ) : (
        <form className="flex size-full flex-col">
          <TitleAndDescription
            title="Finishing Up"
            description="Double-check everything looks OK before confirming."
          />
          <div className="mt-5 flex size-full flex-col gap-6 lg:mt-10">
            <div className="flex flex-col gap-6">
              <div className="bg-form-very-light-grey rounded-md px-6 py-4">
                {/* Plan Details */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1.5">
                    <span className="text-form-denim text-regular font-medium capitalize">
                      {`${formData?.plan} (${formData?.billingCycle})`}
                    </span>
                    <span
                      onClick={() => decreaseStep(2)}
                      className="text-form-grey hover:text-form-purple cursor-pointer text-sm underline transition-colors"
                    >
                      Change
                    </span>
                  </div>
                  <div>
                    <span className="text-regular text-form-denim font-bold">
                      {'$' + formData?.price + '/'}
                      {formData?.billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                </div>
                {/* Separator */}
                <div className="bg-form-light-grey mt-6 h-[1px] w-full" />

                {/* Addon Details */}
                <div className="mt-4 flex flex-col gap-4">
                  {parsedAddonData
                    ?.filter((item: { isChecked: boolean }) => item.isChecked)
                    .map((item: { addOn: string; addOnPrice: number }) => (
                      <div
                        key={item.addOn}
                        className="flex items-center justify-between"
                      >
                        <span className="text-form-grey text-sm">
                          {item.addOn}
                        </span>
                        <span className="text-form-denim text-sm">
                          {'+' + '$' + item.addOnPrice + '/'}
                          {formData?.billingCycle === 'monthly' ? 'mo' : 'yr'}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/* Total */}
            <div className="flex items-center justify-between px-6">
              <span className="text-regular text-form-grey">
                Total(per{' '}
                {formData?.billingCycle === 'monthly' ? 'month' : 'year'})
              </span>

              <span className="text-form-purple text-xl font-bold">
                {'+' + '$' + calculateTotal() + '/'}
                {formData?.billingCycle === 'monthly' ? 'mo' : 'yr'}
              </span>
            </div>
          </div>
          <FormFooterButtons />
        </form>
      )}
    </div>
  );
};

export default FinishingUp;
