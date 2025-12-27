'use client'

import { useState } from 'react'

import { QuantitySelector, SizeSelector } from '@/components'
import { CartProduct, Product, Size } from '@/interfaces'
import { useCartStore } from '@/store'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart)

  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState(1)
  const [posted, setPosted] = useState(false)

  const showSizeError = posted && !size

  const addToCart = () => {
    setPosted(true)
    if (!size) return

    const cartProduct: CartProduct = {
      id: product.id,
      slug: product.slug,
      title: product.title,
      price: product.price,
      quantity: quantity,
      size: size,
      image: product.images[0],
    }

    addProductToCart(cartProduct)
    setPosted(false)
    setQuantity(1)
    setSize(undefined)
  }

  return (
    <>
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        showSizeError={showSizeError}
        onSizeChanged={setSize}
      />

      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      <button
        className="my-5 mt-4 w-full rounded-full bg-black py-3 text-white"
        onClick={addToCart}
      >
        Agregar al carrito
      </button>
    </>
  )
}
