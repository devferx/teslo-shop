'use server'

import prisma from '@/lib/prisma'
import { productSchema } from '@/schemas'
import { Product, Size } from '@prisma/client'

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const productParsed = productSchema.safeParse(data)

  if (!productParsed.success)
    return { ok: false, message: 'Error al parsear el producto' }

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
      product = await tx.product.create({
        data: {
          ...rest,
          sizes: { set: rest.sizes as Size[] },
          tags: { set: tagsArray },
        },
      })
    }

    return { product }
  })

  // TODO: RevalidatePaths

  return { ok: true }
}
