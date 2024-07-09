'use server'

import { auth } from '@/auth.config'

import type { Address, Size } from '@/interfaces'
import prisma from '@/lib/prisma'

interface ProductToOrder {
  productId: string
  quantity: number
  size: Size
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  address: Address,
) => {
  const session = await auth()
  const userId = session?.user.id

  // Validate if there is a user session
  if (!userId) {
    return {
      ok: false,
      message: 'No hay sesión de usuario',
    }
  }

  // Get products data
  const products = await prisma.product.findMany({
    where: {
      id: {
        in: productIds.map((product) => product.productId),
      },
    },
  })

  // Calculate total
  const itemsInOrder = productIds.reduce(
    (count, product) => count + product.quantity,
    0,
  )

  const { subTotal, tax, total } = productIds.reduce(
    (totals, item) => {
      const productQuantity = item.quantity
      const product = products.find((p) => p.id === item.productId)

      if (!product) throw new Error('Product not found')

      const subTotal = product.price * productQuantity
      totals.subTotal += subTotal
      totals.tax += subTotal * 0.15
      totals.total += subTotal * 1.15

      return totals
    },
    { subTotal: 0, tax: 0, total: 0 },
  )

  // Crear transacción
  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      // 1. Update product stock
      const updatedProductPromises = products.map((product) => {
        const productQuantity = productIds
          .filter((p) => p.productId === product.id)
          .reduce((acc, item) => item.quantity + acc, 0)

        if (productQuantity === 0) {
          throw new Error(`${product.id} no tiene cantidad definida`)
        }

        return tx.product.update({
          where: { id: product.id },
          data: {
            inStock: {
              decrement: productQuantity,
            },
          },
        })
      })

      const updatedProducts = await Promise.all(updatedProductPromises)
      // Validate if all products were updated
      updatedProducts.forEach((product) => {
        if (product.inStock < 0) {
          throw new Error(`${product.title} no tiene inventario suficiente`)
        }
      })

      // 2. Create order
      const order = await tx.order.create({
        data: {
          userId,
          itemsInOrder,
          subTotal,
          tax,
          total,
          OrderItem: {
            createMany: {
              data: productIds.map((p) => ({
                productId: p.productId,
                price:
                  products.find((product) => product.id === p.productId)
                    ?.price ?? -1,
                quantity: p.quantity,
                size: p.size,
              })),
            },
          },
        },
      })

      // If price is -1, throw error

      // 3. Create order address
      const { country, ...restAddress } = address
      const orderAddress = await tx.orderAddress.create({
        data: {
          ...restAddress,
          countryId: country,
          orderId: order.id,
        },
      })

      return {
        order: order,
        orderAddress: orderAddress,
        updatedProducts: updatedProducts,
      }
    })

    return {
      ok: true,
      order: prismaTx.order,
      prismaTx,
    }
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    }
  }
}
