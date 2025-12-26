import { redirect } from 'next/navigation'

import { getPaginatedProductsWithImages } from '@/actions'
import { Pagination, ProductGrid, Title } from '@/components'

export const revalidate = 60 // 60 seconds

interface Props {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? Number(searchParams.page) : 1
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  })

  if (products.length == 0) {
    redirect('/')
  }

  return (
    <div>
      <Title className="mb-2" title="Tienda" subtitle="Todos los productos" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} />
    </div>
  )
}
