import { notFound } from 'next/navigation'

interface Props {
  params: {
    id: string
  }
}

export default function CategoryPage({ params }: Props) {
  const { id } = params

  if (id === 'man') {
    notFound()
  }

  return (
    <div>
      <h1>Category {id} Page</h1>
    </div>
  )
}
