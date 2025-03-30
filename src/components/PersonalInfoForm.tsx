import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '../lib/util';
import { personalInfoSchema } from '../schema/personalInfoschema';
import { useStepStore } from '../store/step-store';
import FormFooterButtons from './FormFooterButtons';
import TitleAndDescription from './TitleAndDescription';

const PersonalInfoForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<z.infer<typeof personalInfoSchema>>({
    resolver: zodResolver(personalInfoSchema),
  });

  const { formData, updateFormData, increaseStep } = useStepStore();

  useEffect(() => {
    Object.entries(formData).forEach(([key, value]) => {
      setValue(
        key as keyof z.infer<typeof personalInfoSchema>,
        value.toString()
      );
    });
  }, [formData, setValue]);

  const onSubmit = handleSubmit((data) => {
    updateFormData(data); // Persist form data

    increaseStep();
  });

  return (
    <div className="relative -top-9 mx-auto h-full w-[90%] rounded-lg bg-white px-6 py-8 shadow-md lg:top-0 lg:mx-0 lg:w-auto lg:bg-none lg:p-0 lg:shadow-none">
      <form onSubmit={onSubmit} className="flex size-full flex-col">
        <TitleAndDescription
          title="Personal Info"
          description="Please provide your name, email address, and phone number."
        />
        <div className="mt-5 flex size-full flex-col gap-6 lg:mt-10">
          <div className="flex flex-col">
            {/* Name */}
            <div className="flex items-center justify-between overflow-hidden">
              <label htmlFor="name" className="text-form-denim text-sm">
                Name
              </label>
              <AnimatePresence mode="wait" initial={false}>
                {errors?.name && (
                  <motion.span
                    initial={{
                      opacity: 0,
                      y: '100%',
                    }}
                    animate={{ opacity: 1, y: '0%' }}
                    exit={{
                      opacity: 0,
                      y: '100%',
                    }}
                    transition={{
                      duration: 0.3,
                      bounce: 0,
                    }}
                    className="text-form-red overflow-hidden text-sm font-bold"
                  >
                    {errors.name.message}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <input
              className={cn(
                'border-form-light-grey hover:border-form-purple mt-2 rounded-md border px-4 py-3 focus:outline-none',
                errors?.name && 'border-form-red'
              )}
              {...register('name')}
              type="text"
              placeholder="e.g. Stephen King"
            />
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between overflow-hidden">
              <label htmlFor="email" className="text-form-denim text-sm">
                Email Address
              </label>
              <AnimatePresence mode="wait" initial={false}>
                {errors?.email && (
                  <motion.span
                    initial={{
                      opacity: 0,
                      y: '100%',
                    }}
                    animate={{ opacity: 1, y: '0%' }}
                    exit={{
                      opacity: 0,
                      y: '100%',
                    }}
                    transition={{
                      duration: 0.3,
                      bounce: 0,
                    }}
                    className="text-form-red overflow-hidden text-sm font-bold"
                  >
                    {errors.email.message}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <input
              className={cn(
                'border-form-light-grey hover:border-form-purple mt-2 rounded-md border px-4 py-3 focus:outline-none',
                errors?.email && 'border-form-red'
              )}
              {...register('email')}
              type="email"
              placeholder="e.g. stephenking@lorem.com"
            />
          </div>
          {/* Phone Number */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between overflow-hidden">
              <label htmlFor="phone" className="text-form-denim text-sm">
                Phone Number
              </label>
              <AnimatePresence mode="wait" initial={false}>
                {errors?.phone && (
                  <motion.span
                    initial={{
                      opacity: 0,
                      y: '100%',
                    }}
                    animate={{ opacity: 1, y: '0%' }}
                    exit={{
                      opacity: 0,
                      y: '100%',
                    }}
                    transition={{
                      duration: 0.3,
                      bounce: 0,
                    }}
                    className="text-form-red overflow-hidden text-sm font-bold"
                  >
                    {errors.phone.message}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <input
              className={cn(
                'border-form-light-grey hover:border-form-purple mt-2 rounded-md border px-4 py-3 focus:outline-none',
                errors?.phone && 'border-form-red'
              )}
              {...register('phone')}
              type="text"
              placeholder="e.g. +1 234 567 890"
            />
          </div>
        </div>
        <FormFooterButtons />
      </form>
    </div>
  );
};

export default PersonalInfoForm;
