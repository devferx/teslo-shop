import { getPaginatedProductsWithImages } from '@/actions'
import { ProductGrid, Title } from '@/components'

export default async function Home() {
  const { products } = await getPaginatedProductsWithImages()

  return (
    <div>
      <Title className="mb-2" title="Tienda" subtitle="Todos los productos" />
      <ProductGrid products={products} />
    </div>
  )
}
