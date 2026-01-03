import Link from 'next/link'
import { redirect } from 'next/navigation'

import { getCategories, getProductBySlug } from '@/actions'

import { Button } from '@/components/ui/button'
import { ChevronLeft } from 'lucide-react'
import { ProductForm } from '@/components'

interface Props {
  params: Promise<{
    slug: string
  }>
}

export default async function ProductPage(props: Props) {
  const params = await props.params
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
    <div className="mx-auto max-w-5xl space-y-4 p-8">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </div>

      <ProductForm product={product ?? {}} categories={categories} />
    </div>
  )
}
