import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { CartProduct } from '@/interfaces'

interface SummaryInformation {
  itemsInCart: number
  subTotal: number
  tax: number
  total: number
}

interface State {
  cart: CartProduct[]

  addProductToCart: (product: CartProduct) => void
  clearCart: () => void
  getSummaryInformation: () => SummaryInformation
  getTotalItems: () => number
  removeProduct: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      // Methods
      getTotalItems: () => {
        const { cart } = get()

        return cart.reduce((total, item) => total + item.quantity, 0)
      },
      getSummaryInformation: () => {
        const { cart, getTotalItems } = get()

        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0,
        )

        const tax = subTotal * 0.15
        const total = subTotal + tax
        const itemsInCart = getTotalItems()

        return { subTotal, tax, total, itemsInCart }
      },
      addProductToCart: (product) => {
        const { cart } = get()

        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size,
        )

        if (!productInCart) {
          set({ cart: [...cart, product] })
          return
        }

        const updatedCartProducts = cart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + product.quantity }
            : item,
        )
        set({ cart: updatedCartProducts })
      },
      clearCart: () => {
        set({ cart: [] })
      },
      updateProductQuantity: (product, quantity) => {
        const { cart } = get()

        const updatedCartProducts = cart.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity }
            : item,
        )

        set({ cart: updatedCartProducts })
      },
      removeProduct: (product) => {
        const { cart } = get()

        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id || item.size !== product.size,
        )

        set({ cart: updatedCartProducts })
      },
    }),
    {
      name: 'shopping-cart',
      // skipHydration: true,
    },
  ),
)
