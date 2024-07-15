'use server'

import { productSchema } from '@/schemas'

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const productParsed = productSchema.safeParse(data)

  if (!productParsed.success) {
    console.log('productParsed.error', productParsed.error)
    return { ok: false }
  } else {
    console.log('productParsed.data', productParsed.data)
  }

  return { ok: true }
}
