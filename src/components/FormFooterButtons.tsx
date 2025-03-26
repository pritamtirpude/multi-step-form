import { cn } from '../lib/util';
import { useStepStore } from '../store/step-store';

const FormFooterButtons = () => {
  const { decreaseStep, step } = useStepStore();

  return (
    <div className="flex w-full items-center justify-between bg-white p-4 lg:bg-none lg:p-0">
      {step !== 1 && (
        <button
          className="text-form-grey hover:text-form-denim cursor-pointer text-[16px] font-medium transition"
          onClick={() => decreaseStep()}
        >
          Go Back
        </button>
      )}

      <button
        type="submit"
        className={cn(
          'bg-form-denim hover:bg-form-hover cursor-pointer rounded-md px-6 py-4 text-[16px] font-medium text-white transition',
          step === 1 && 'ml-auto'
        )}
      >
        Next Step
      </button>
    </div>
  );
};

export default FormFooterButtons;
