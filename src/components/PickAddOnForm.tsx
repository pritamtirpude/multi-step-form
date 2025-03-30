import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import iconCheck from '../assets/images/icon-checkmark.svg';
import { AddOnType } from '../lib/types';
import { addOnItems, cn } from '../lib/util';
import { addOnsSchema } from '../schema/addOnSchema';
import { useStepStore } from '../store/step-store';
import FormFooterButtons from './FormFooterButtons';
import TitleAndDescription from './TitleAndDescription';

const PickAddOnForm = () => {
  const { handleSubmit, register, setValue, watch } = useForm<
    z.infer<typeof addOnsSchema>
  >({
    resolver: zodResolver(addOnsSchema),
  });

  const { formData, updateFormData, increaseStep } = useStepStore();

  const addOns = watch('addOns') || [];

  const onSubmit = handleSubmit((data) => {
    updateFormData({
      ...data,
      addOns: JSON.stringify(data.addOns),
    });

    increaseStep();
  });

  useEffect(() => {
    if (formData?.addOns) {
      try {
        const parsedJSON =
          typeof formData.addOns === 'string'
            ? JSON.parse(formData.addOns)
            : [];
        setValue('addOns', parsedJSON);
      } catch (error) {
        console.error('Error parsing addOns:', error);
      }
    } else {
      // Fallback to defaultValues if no data in the store
      setValue('addOns', [
        {
          addOn: 'Online Service',
          addOnPrice: 1,
          isChecked: true,
        },
        {
          addOn: 'Larger Storage',
          addOnPrice: 2,
          isChecked: true,
        },
        {
          addOn: 'Customizable Profile',
          addOnPrice: 2,
          isChecked: false,
        },
      ]);
    }
  }, [formData?.addOns, setValue]);

  return (
    <div className="relative -top-9 mx-auto h-full w-[90%] rounded-lg bg-white px-6 py-8 shadow-md lg:top-0 lg:mx-0 lg:w-auto lg:bg-none lg:p-0 lg:shadow-none">
      <form onSubmit={onSubmit} className="flex size-full flex-col">
        <TitleAndDescription
          title="Pick add-ons"
          description="Add-ons help enhance your gaming experience."
        />
        <div className="mt-5 flex size-full flex-col gap-6 lg:mt-10">
          <div className="flex w-full flex-col gap-4">
            {addOnItems.map((item, index) => {
              const isActive = addOns?.[index]?.isChecked;

              return (
                <div
                  key={item.addOn}
                  className={cn(
                    'border-form-grey hover:border-form-purple flex cursor-pointer items-center justify-between rounded-md border px-4 py-3 transition lg:px-6 lg:py-4',
                    isActive && 'bg-form-very-light-grey border-form-purple'
                  )}
                >
                  <div className="flex items-center gap-4 lg:gap-6">
                    <div className="relative">
                      <input
                        type="checkbox"
                        className="accent-form-purple group border-form-grey checked:bg-form-purple relative size-5 appearance-none rounded-md border p-1 checked:border-0"
                        {...register(`addOns.${index}.isChecked` as const)} // Register the isChecked field
                        onChange={(e) =>
                          setValue(
                            `addOns.${index}.isChecked`,
                            e.target.checked
                          )
                        }
                      />
                      <img
                        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-2"
                        src={iconCheck}
                        alt="icon check"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <span className="lg:text-regular text-form-denim text-sm font-medium">
                        {item.addOn}
                      </span>
                      <span className="text-form-grey text-xs lg:text-sm">
                        {item.addOnDesc}
                      </span>
                    </div>
                  </div>

                  <div>
                    <span className="text-form-purple text-sm">
                      {'+$' +
                        item[formData?.billingCycle as keyof AddOnType] +
                        '/'}
                      {formData?.billingCycle === 'monthly' ? 'mo' : 'yr'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <FormFooterButtons />
      </form>
    </div>
  );
};

export default PickAddOnForm;
