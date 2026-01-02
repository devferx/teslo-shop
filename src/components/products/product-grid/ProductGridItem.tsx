'use client'

import { useState } from 'react'
import Link from 'next/link'

import { ProductImage } from '@/components'

import type { Product } from '@/interfaces'

interface Props {
  product: Product
}

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0] ?? '')

  return (
    <div className="fade-in overflow-hidden rounded-md">
      <Link href={`/product/${product.slug}`}>
        <ProductImage
          className="aspect-square w-full rounded-sm object-cover"
          src={displayImage}
          alt={product.title}
          width={500}
          height={500}
          onMouseEnter={() =>
            setDisplayImage(product.images[1] ?? product.images[0])
          }
          onMouseLeave={() => setDisplayImage(product.images[0] ?? '')}
        />
      </Link>

      <div className="flex flex-col p-4">
        <Link className="hover:text-blue-600" href={`/product/${product.slug}`}>
          {product.title}
        </Link>
        <span className="font-bold">${product.price}</span>
      </div>
    </div>
  )
}
