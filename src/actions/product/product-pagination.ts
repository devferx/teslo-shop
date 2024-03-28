'use server'

import prisma from '@/lib/prisma'
import { Gender } from '@prisma/client'

interface PaginationOptions {
  page?: number
  take?: number
  gender?: Gender
}

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  gender,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1
  if (page < 1) page = 1

  if (isNaN(Number(take))) take = 12
  if (take < 1) take = 12

  try {
    const products = await prisma.product.findMany({
      where: {
        gender: gender,
      },
      take: take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          select: {
            url: true,
          },
          take: 2,
        },
      },
    })

    // Get total count of pages
    const count = await prisma.product.count({ where: { gender } })
    const totalPages = Math.ceil(count / take)

    return {
      currentPage: page,
      totalPages,
      products: products.map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
      })),
    }
  } catch (error) {
    throw new Error('No se pudo cargar los productos')
  }
}
