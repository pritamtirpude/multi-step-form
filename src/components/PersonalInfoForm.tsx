import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
      setValue(key as keyof z.infer<typeof personalInfoSchema>, value);
    });
  }, [formData, setValue]);

  const onSubmit = handleSubmit((data) => {
    updateFormData(data); // Persist form data

    increaseStep();
  });

  return (
    <div className="h-full w-full">
      <form onSubmit={onSubmit} className="flex h-full w-full flex-col">
        <TitleAndDescription
          title="Personal Info"
          description="Please provide your name, email address, and phone number."
        />
        <div className="mt-10 flex size-full flex-col gap-6">
          <div className="flex flex-col">
            {/* Name */}
            <div className="flex items-center justify-between">
              <label htmlFor="name" className="text-form-denim text-sm">
                Name
              </label>
              {errors?.name && (
                <span className="text-form-red text-sm font-bold">
                  {errors.name.message}
                </span>
              )}
            </div>
            <input
              className="border-form-light-grey mt-2 rounded-md border px-4 py-3 focus:outline-none"
              {...register('name')}
              type="text"
              placeholder="e.g. Stephen King"
            />
          </div>
          {/* Email */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label htmlFor="email" className="text-form-denim text-sm">
                Email Address
              </label>
              {errors?.email && (
                <span className="text-form-red text-sm font-bold">
                  {errors.email.message}
                </span>
              )}
            </div>
            <input
              className="border-form-light-grey mt-2 rounded-md border px-4 py-3 focus:outline-none"
              {...register('email')}
              type="email"
              placeholder="e.g. stephenking@lorem.com"
            />
          </div>
          {/* Phone Number */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between">
              <label htmlFor="phone" className="text-form-denim text-sm">
                Phone Number
              </label>
              {errors?.phone && (
                <span className="text-form-red text-sm font-bold">
                  {errors.phone.message}
                </span>
              )}
            </div>
            <input
              className="border-form-light-grey mt-2 rounded-md border px-4 py-3 focus:outline-none"
              {...register('phone')}
              type="text"
              placeholder="e.g. +91 9988776644"
            />
          </div>
        </div>
        <FormFooterButtons />
      </form>
    </div>
  );
};

export default PersonalInfoForm;
