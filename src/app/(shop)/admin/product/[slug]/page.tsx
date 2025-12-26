import { redirect } from 'next/navigation'

import { getCategories, getProductBySlug } from '@/actions'
import { Title } from '@/components'
import { ProductForm } from './ui/ProductForm'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage(props: Props) {
  const params = await props.params;
  const { slug } = params

  const [product, categories] = await Promise.all([
    getProductBySlug(slug),
    getCategories(),
  ])

  if (!product && slug !== 'new') {
    redirect('/admin/products')
  }

  const title = slug == 'new' ? 'Nuevo producto' : 'Editar producto'

  return (
    <div>
      <Title title={title} />
      <ProductForm product={product ?? {}} categories={categories} />
    </div>
  )
}
