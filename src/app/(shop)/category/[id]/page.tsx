import { notFound } from 'next/navigation'

import { ProductGrid, Title } from '@/components'
import { Categories } from '@/interfaces'
import { initialData } from '@/seed/seed'

const seedProducts = initialData.products

interface Props {
  params: {
    id: Categories
  }
}

export default function CategoryPage({ params }: Props) {
  const { id } = params
  const products = seedProducts.filter((product) => product.gender === id)

  const labels: Record<Categories, string> = {
    men: 'hombres',
    women: 'mujeres',
    kid: 'niños',
    unisex: 'todos',
  }

  const lablesArray = Object.keys(labels)
  if (!lablesArray.includes(id)) {
    notFound()
  }

  return (
    <div>
      <Title
        className="mb-2"
        title={`Articulos para ${labels[id]}`}
        subtitle="Todos los productos"
      />
      <ProductGrid products={products} />
    </div>
  )
}
