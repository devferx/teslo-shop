import { CartProduct } from '@/interfaces'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface State {
  cart: CartProduct[]

  getTotalItems: () => number
  addProductToCart: (product: CartProduct) => void
  updateProductQuantity: (product: CartProduct, quantity: number) => void
  removeProduct: (product: CartProduct) => void
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
