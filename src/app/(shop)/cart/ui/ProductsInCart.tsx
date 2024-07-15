'use client'

import { useEffect, useState } from 'react'

import { useCartStore } from '@/store'
import { ProductImage, QuantitySelector } from '@/components'
import Link from 'next/link'

interface Props {}

export const ProductsInCart = ({}: Props) => {
  const productsInCart = useCartStore((state) => state.cart)
  const updateProductQuantity = useCartStore(
    (state) => state.updateProductQuantity,
  )
  const removeProduct = useCartStore((state) => state.removeProduct)

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) {
    return <p>Loading...</p>
  }

  return (
    <>
      {productsInCart.map((product) => (
        <div className="mb-5 flex" key={`${product.slug}-${product.size}`}>
          <ProductImage
            className="mr-5 rounded object-cover"
            src={product.image}
            alt={product.title}
            width={100}
            height={100}
            style={{
              width: '100px',
              height: '100px',
            }}
          />

          <div>
            <Link
              className="cursor-pointer hover:underline"
              href={`/product/${product.slug}`}
            >
              {product.size} - {product.title}
            </Link>
            <p>${product.price}</p>
            <QuantitySelector
              quantity={product.quantity}
              onQuantityChange={(quantity) =>
                updateProductQuantity(product, quantity)
              }
            />
            <button
              className="mt-3 underline"
              onClick={() => removeProduct(product)}
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  )
}
