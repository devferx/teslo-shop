'use client'

import { useState } from 'react'

import { QuantitySelector, SizeSelector } from '@/components'
import { Product, Size } from '@/interfaces'

interface Props {
  product: Product
}

export const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>()
  const [quantity, setQuantity] = useState(1)

  const addToCart = () => {
    if (!size) return

    console.log({ size, quantity })
  }

  return (
    <>
      {/* Size Select */}
      <SizeSelector
        selectedSize={size}
        availableSizes={product.sizes}
        onSizeChanged={setSize}
      />

      {/* Quantity Select */}
      <QuantitySelector quantity={quantity} onQuantityChange={setQuantity} />

      {/* Button */}
      <button className="btn-primary my-5" onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  )
}
