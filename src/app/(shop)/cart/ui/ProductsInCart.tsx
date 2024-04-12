'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'

import { useCartStore } from '@/store'
import { QuantitySelector } from '@/components'
import Link from 'next/link'

interface Props {}

export const ProductsInCart = ({}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const productsInCart = useCartStore((state) => state.cart)

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
          <Image
            className="mr-5 rounded"
            src={`/products/${product.image}`}
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
            <QuantitySelector quantity={3} onQuantityChange={console.log} />
            <button className="mt-3 underline">Remover</button>
          </div>
        </div>
      ))}
    </>
  )
}
