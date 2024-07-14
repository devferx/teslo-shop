// https://tailwindcomponents.com/component/hoverable-table
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { IoCardOutline } from 'react-icons/io5'

import { Pagination, Title } from '@/components'
import { getPaginatedProductsWithImages } from '@/actions'
import Image from 'next/image'
import { currencyFormat } from '@/utils'

export const revalidate = 0

interface Props {
  searchParams: {
    page?: string
  }
}

export default async function ProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? Number(searchParams.page) : 1
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  })

  return (
    <>
      <Title title="Gestión de productos" />

      <div className="mb-5 flex justify-end">
        <Link className="btn-primary" href="/admin/product/new">
          Nuevo producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="border-b bg-gray-200">
            <tr>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Precio
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Género
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                className="border-b bg-white transition duration-300 ease-in-out hover:bg-gray-100"
                key={product.id}
              >
                <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <Image
                      className="h-20 w-20 rounded object-cover"
                      src={`/products/${product.ProductImage[0].url}`}
                      width={80}
                      height={80}
                      alt={product.title}
                    />
                  </Link>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                  <Link
                    className="hover:underline"
                    href={`/product/${product.slug}`}
                  >
                    {product.title}
                  </Link>
                </td>

                <td className="px-6 text-sm font-bold text-gray-900">
                  {currencyFormat(product.price)}
                </td>
                <td className="px-6 text-sm font-light text-gray-900">
                  {product.gender}
                </td>
                <td className="px-6 text-sm font-bold text-gray-900">
                  {product.inStock}
                </td>
                <td className="px-6 text-sm font-light text-gray-900">
                  {product.sizes.join(', ')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  )
}
