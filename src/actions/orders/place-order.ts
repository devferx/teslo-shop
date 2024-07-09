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
}
