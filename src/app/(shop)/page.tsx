import { getPaginatedProductsWithImages } from '@/actions'
import { ProductGrid, Title } from '@/components'
import { redirect } from 'next/navigation'

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1
  const { products } = await getPaginatedProductsWithImages({ page })

  if (products.length == 0) {
    redirect('/')
  }

  return (
    <div>
      <Title className="mb-2" title="Tienda" subtitle="Todos los productos" />
      <ProductGrid products={products} />
    </div>
  )
}
