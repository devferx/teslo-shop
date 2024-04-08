import { CartProduct } from '@/interfaces'
import { create } from 'zustand'

interface State {
  cart: CartProduct[]

  addProductToCart: (product: CartProduct) => void
  // updateProductQuantity
  // removeProduct
}

export const useCartStore = create<State>()((set, get) => ({
  cart: [],
  // Methods
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
}))
