'use server'

import prisma from '@/lib/prisma'
import { productSchema } from '@/schemas'
import { Product, Size } from '@prisma/client'

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const productParsed = productSchema.safeParse(data)

  if (!productParsed.success) {
    console.log('productParsed.error', productParsed.error)
    return { ok: false }
  }

  const product = productParsed.data
  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim()

  const { id, ...rest } = product

  const prismaTx = await prisma.$transaction(async (tx) => {
    let product: Product
    const tagsArray = rest.tags.split(',').map((tag) => tag.trim())

    // If id is present, update the product
    if (id) {
      product = await tx.product.update({
        where: { id },
        data: {
          ...rest,
          sizes: { set: rest.sizes as Size[] },
          tags: { set: tagsArray },
        },
      })

      console.log('product updated', product)
    } else {
    }

    return {}
  })

  // TODO: RevalidatePaths

  return { ok: true }
}
