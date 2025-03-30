import * as z from 'zod';

const addOnSchema = z.object({
  addOn: z.string().optional(),
  addOnPrice: z.number().optional(),
  isChecked: z.boolean().optional(),
});

const schemaToArray = z.array(addOnSchema);

export const addOnsSchema = z.object({
  addOns: schemaToArray,
});
