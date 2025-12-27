// https://tailwindcomponents.com/component/hoverable-table
import Link from 'next/link'
import { IoCreateOutline } from 'react-icons/io5'

import { deleteProductById, getPaginatedProductsWithImages } from '@/actions'
import {
  DeleteProductButton,
  Pagination,
  ProductImage,
  Title,
} from '@/components'
import { currencyFormat } from '@/utils'

export const revalidate = 0

interface Props {
  searchParams: Promise<{
    page?: string
  }>
}

export default async function ProductsPage(props: Props) {
  const searchParams = await props.searchParams
  const page = searchParams.page ? Number(searchParams.page) : 1
  const { products, totalPages } = await getPaginatedProductsWithImages({
    page,
  })

  const onDeleteProduct = async (productId: string) => {
    deleteProductById(productId)
  }

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
              <th
                scope="col"
                className="px-6 py-4 text-left text-sm font-medium text-gray-900"
              >
                Acciones
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
                    <ProductImage
                      className="h-20 w-20 rounded object-cover"
                      src={product.ProductImage[0]?.url}
                      width={80}
                      height={80}
                      alt={product.title}
                    />
                  </Link>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-light text-gray-900">
                  <Link
                    className="hover:underline"
                    href={`/admin/product/${product.slug}`}
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
                <td className="px-6 text-sm font-light text-gray-900">
                  <div className="flex justify-center gap-2">
                    <Link
                      href={`/admin/product/${product.slug}`}
                      className="text-xl hover:text-blue-600"
                      aria-label="Edit"
                    >
                      <IoCreateOutline />
                    </Link>
                    <DeleteProductButton productId={product.id} />
                  </div>
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
