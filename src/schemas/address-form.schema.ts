import { z } from 'zod'

export const AddressFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  address: z.string().min(1),
  address2: z.string().optional(),
  postalCode: z.string().min(1),
  city: z.string().min(1),
  country: z.string().min(1),
  phone: z.string().min(1),
  rememberAddress: z.boolean().optional(),
})

export type AddressFormInputs = z.infer<typeof AddressFormSchema>
