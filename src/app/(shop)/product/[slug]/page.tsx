import { notFound } from 'next/navigation'

import { titleFont } from '@/config/fonts'
import { QuantitySelector, SizeSelector } from '@/components'
import { initialData } from '@/seed/seed'

interface Props {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: Props) {
  const { slug } = params
  const product = initialData.products.find((product) => product.slug === slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="mb-20 mt-5 grid gap-3 md:grid-cols-3">
      {/* SlideShow */}
      <div className="col-span-1 md:col-span-2">SlideShow</div>

      {/* Content */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} text-xl font-bold antialiased`}>
          {product.title}
        </h1>
        <p className="mb-5 text-lg">${product.price}</p>

        {/* Size Select */}
        <SizeSelector
          availableSizes={product.sizes}
          selectedSize={product.sizes[0]}
        />

        {/* Quantity Select */}
        <QuantitySelector quantity={2} />

        {/* Button */}
        <button className="btn-primary my-5">Agregar al carrito</button>

        {/* Description */}

        <h3 className="text-sm font-bold">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  )
}
