import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import NumberFlow from '@number-flow/react';
import { motion } from 'motion/react';
import { PlanType } from '../lib/types';
import { cn, planItems } from '../lib/util';
import { planSchema } from '../schema/planSchema';
import { useStepStore } from '../store/step-store';
import FormFooterButtons from './FormFooterButtons';
import TitleAndDescription from './TitleAndDescription';

const SelectPlanForm = () => {
  const { handleSubmit, setValue, watch } = useForm<z.infer<typeof planSchema>>(
    {
      resolver: zodResolver(planSchema),
      defaultValues: {
        billingCycle: 'monthly',
        plan: 'arcade',
        price: 9,
      },
    }
  );

  const {
    isActive,
    setIsActive,
    isSwitchToggled,
    setIsSwitchToggled,
    formData,
    updateFormData,
    increaseStep,
  } = useStepStore();

  const billingCycle = watch('billingCycle');
  const plan = watch('plan');

  const handlePlan = (item: PlanType, index: number) => {
    setIsActive(index);
    setValue('plan', item.plan);
    setValue('price', item[billingCycle]);
  };

  const handleSwitch = () => {
    setIsSwitchToggled(!isSwitchToggled);
    if (!isSwitchToggled) {
      setValue('billingCycle', 'yearly');
    } else {
      setValue('billingCycle', 'monthly');
    }
  };

  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      if (
        typeof value === 'number' ||
        value === 'arcade' ||
        value === 'advanced' ||
        value === 'pro' ||
        value === 'monthly' ||
        value === 'yearly'
      ) {
        setValue(key as keyof z.infer<typeof planSchema>, value);
      }
    });
  }, [formData, setValue]);

  useEffect(() => {
    if (billingCycle !== formData.billingCycle) {
      const priceValue = planItems.find(
        (item) => item[billingCycle] && item.plan === plan
      );

      setValue('price', priceValue?.[billingCycle] ?? 0);
    }
  }, [billingCycle, formData.billingCycle, formData?.plan, setValue, plan]);

  const onSubmit = handleSubmit((data) => {
    updateFormData(data); // Persist form data

    increaseStep();
  });

  return (
    <div className="relative -top-9 mx-auto h-full w-[90%] rounded-lg bg-white px-6 py-8 shadow-md lg:top-0 lg:mx-0 lg:w-auto lg:bg-none lg:p-0 lg:shadow-none">
      <form onSubmit={onSubmit} className="flex size-full flex-col">
        <TitleAndDescription
          title="Select your plan"
          description="You have the option of monthly or yearly billing."
        />
        <div className="mt-5 flex size-full flex-col gap-6 lg:mt-10">
          <div className="flex w-full flex-col justify-between gap-4 lg:flex-row">
            {planItems.map((item, index) => (
              <div
                onClick={() => handlePlan(item, index)}
                key={item.plan}
                className={cn(
                  'border-form-light-grey hover:border-form-purple flex w-full cursor-pointer flex-row items-center gap-3.5 rounded-md border px-4 py-3.5 transition-all lg:w-[140px] lg:flex-col lg:items-start lg:gap-10 lg:py-5',
                  index === isActive &&
                    'border-form-purple bg-form-very-light-grey'
                )}
              >
                <div>
                  {typeof item.icon === 'string' ? (
                    <img src={item.icon} alt={item.plan + ' icon'} />
                  ) : (
                    item.icon
                  )}
                </div>
                <div className="flex size-full flex-col gap-1.5">
                  <span className="text-regular text-form-denim font-medium capitalize">
                    {item.plan}
                  </span>
                  <span className="text-form-grey text-sm">
                    {'$'}
                    <NumberFlow value={item[billingCycle]} />
                    {'/'}
                    {billingCycle === 'monthly' ? 'mo' : 'yr'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-form-very-light-grey flex items-center justify-center gap-6 rounded-md py-3">
            <span
              className={cn(
                'text-form-grey text-sm font-medium transition-colors',
                billingCycle === 'monthly' && 'text-form-denim'
              )}
            >
              Monthly
            </span>
            <div
              onClick={handleSwitch}
              className={cn(
                'bg-form-denim flex h-[20px] w-[40px] cursor-pointer rounded-2xl p-1',
                isSwitchToggled ? 'justify-end' : 'justify-start'
              )}
            >
              <motion.div
                layout
                transition={{
                  type: 'spring',
                  visualDuration: 0.2,
                  bounce: 0.2,
                }}
                className="size-3 rounded-full bg-white"
              />
            </div>
            <span
              className={cn(
                'text-form-grey text-sm font-medium transition-colors',
                billingCycle === 'yearly' && 'text-form-denim'
              )}
            >
              Yearly
            </span>
          </div>
        </div>
        <FormFooterButtons />
      </form>
    </div>
  );
};

export default SelectPlanForm;
