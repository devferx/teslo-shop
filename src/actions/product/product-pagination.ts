'use server'

import prisma from '@/lib/prisma'

export const getPaginatedProductsWithImages = async () => {
  try {
    const products = await prisma.product.findMany({
      take: 12,
      include: {
        ProductImage: {
          select: {
            url: true,
          },
          take: 2,
        },
      },
    })

    return {
      currentPage: 1,
      totalPages: 10,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    }
  } catch (error) {
    throw new Error('No se pudo cargar los productos')
  }
}
