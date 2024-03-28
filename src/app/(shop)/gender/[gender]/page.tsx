import { notFound, redirect } from 'next/navigation'

import type { Gender } from '@prisma/client'

import { Pagination, ProductGrid, Title } from '@/components'
import { getPaginatedProductsWithImages } from '@/actions'

export const revalidate = 60 // 60 seconds

interface Props {
  params: {
    gender: Gender
  }
  searchParams: {
    page?: string
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { gender } = params
  const { page } = searchParams
  const { products, totalPages } = await getPaginatedProductsWithImages({
    gender: gender,
    page: Number(page),
  })

  if (products.length === 0) redirect(`/gender/${gender}`)

  const labels: Record<Gender, string> = {
    men: 'hombres',
    women: 'mujeres',
    kid: 'niños',
    unisex: 'todos',
  }

  const lablesArray = Object.keys(labels)
  if (!lablesArray.includes(gender)) {
    notFound()
  }

  return (
    <div>
      <Title
        className="mb-2"
        title={`Articulos para ${labels[gender]}`}
        subtitle="Todos los productos"
      />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  )
}
