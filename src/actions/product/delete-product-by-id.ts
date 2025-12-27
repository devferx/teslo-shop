'use server'

import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const deleteProductById = async (productId: string) => {
  try {
    const deletedProduct = await prisma.product.update({
      where: { id: productId },
      data: { deletedAt: new Date() },
    })

    revalidatePath('/admin/products')
    revalidatePath(`/product/${deletedProduct.slug}`)
    revalidatePath(`/admin/product/${deletedProduct.slug}`)

    return { deletedProduct }
  } catch (error) {
    console.error(error)
    throw new Error('No se pudo eliminar el producto')
  }
}
