import * as z from 'zod';

export const planSchema = z.object({
  billingCycle: z.enum(['monthly', 'yearly']),
  plan: z.enum(['arcade', 'advance', 'pro']),
  price: z.number(),
});
