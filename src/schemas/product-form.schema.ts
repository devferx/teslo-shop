import { z } from 'zod'

import { Gender } from '@prisma/client'

export const ProductFormSchema = z.object({
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  price: z.number().min(0),
  inStock: z.number(),
  sizes: z.array(z.string()),
  tags: z.string(),
  gender: z.nativeEnum(Gender),
  categoryId: z.string(),
})

export type ProductFormInputs = z.infer<typeof ProductFormSchema>
