import { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { titleFont } from '@/config/fonts'
import {
  ProductMobileSlideshow,
  ProductSlideshow,
  StockLabel,
} from '@/components'
import { getProductBySlug } from '@/actions'
import { AddToCart } from './ui/AddToCart'

export const revalidate = 604800 // 7 days

interface Props {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug
  const product = await getProductBySlug(slug)

  return {
    title: product?.title ?? 'Producto no encontrado',
    description: product?.description ?? '',
    openGraph: {
      title: product?.title ?? 'Producto no encontrado',
      description: product?.description ?? '',
      images: [`/products/${product?.images[1]}`],
      // images: []
    },
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="mb-20 mt-5 grid gap-3 md:grid-cols-3">
      {/* SlideShow */}
      <div className="col-span-1 md:col-span-2">
        {/* Mobile Slideshow */}
        <ProductMobileSlideshow
          className="block md:hidden"
          images={product.images}
          title={product.title}
        />

        {/* Desktop Slideshow */}
        <ProductSlideshow
          className="hidden md:block"
          title={product.title}
          images={product.images}
        />
      </div>

      {/* Content */}
      <div className="col-span-1 px-5">
        <StockLabel slug={product.slug} />

        <h1 className={`${titleFont.className} text-xl font-bold antialiased`}>
          {product.title}
        </h1>
        <p className="mb-5 text-lg">${product.price}</p>

        <AddToCart product={product} />

        {/* Description */}

        <h3 className="text-sm font-bold">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  )
}
