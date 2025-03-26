import * as z from 'zod';

export const personalInfoSchema = z.object({
  name: z.string().min(1, { message: 'This field is required' }),
  email: z.string().min(1, { message: 'This field is required' }).email({
    message: 'Must be a valid email',
  }),
  phone: z
    .string()
    .min(1, { message: 'This field is required' })
    .regex(/^(\+91\s)?[6-9]\d{9}$/, {
      message: 'Must be a valid mobile number',
    }),
});
