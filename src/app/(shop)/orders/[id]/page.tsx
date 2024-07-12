import clsx from 'clsx'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { IoCardOutline } from 'react-icons/io5'

import { getOrderById } from '@/actions'

import { PayPalButton, Title } from '@/components'
import { currencyFormat } from '@/utils'

interface Props {
  params: {
    id: string
  }
}

export default async function SingleOrderPage({ params }: Props) {
  const { id } = params

  const { ok, order } = await getOrderById(id)

  if (!ok) {
    redirect('/')
  }

  if (!order) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-2xl">No se encontró la orden</p>
      </div>
    )
  }

  const { OrderAddress: address, OrderItem: orderItems } = order

  return (
    <div className="mb-72 flex items-center justify-center px-10 sm:px-0">
      <div className="flex w-[1000px] flex-col">
        <Title title={`Orden #${id.split('-').at(-1)}`} />

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          {/* Cart */}
          <div className="mt-5 flex flex-col">
            <div
              className={clsx(
                'mb-5 flex items-center rounded-lg px-3.5 py-2 text-xs font-bold text-white',
                {
                  'bg-red-500': !order.isPaid,
                  'bg-green-700': order!.isPaid,
                },
              )}
            >
              <IoCardOutline size={30} />
              <span className="mx-2">
                {order.isPaid ? 'Pagada' : 'Pendiente de pago'}
              </span>
            </div>

            {orderItems.map(({ product, quantity, price, size }) => (
              <div className="mb-5 flex" key={product.slug + '-' + size}>
                <Image
                  className="mr-5 rounded"
                  src={`/products/${product.ProductImage[0].url}`}
                  alt={product.title}
                  width={100}
                  height={100}
                  style={{
                    width: '100px',
                    height: '100px',
                  }}
                />

                <div>
                  <p>
                    {product.title} - {size}
                  </p>
                  <p>
                    ${price} x {quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(price * quantity)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="h-fit rounded-xl bg-white p-7 shadow-xl">
            <h2 className="mb-2 text-2xl">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address!.firstName} {address!.lastName}
              </p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.postalCode}</p>
              <p>
                {address!.city}, {address!.country.name}
              </p>
              <p>{address!.phone}</p>
            </div>

            {/*  */}
            <div className="mb-10 h-0.5 w-full rounded bg-gray-200" />
            <h2 className="mb-2 text-2xl">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order.itemsInOrder === 1
                  ? '1 artículo'
                  : `${order.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order.subTotal)}
              </span>

              <span>Inpuestos (15%)</span>
              <span className="text-right">{currencyFormat(order.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-right text-2xl">
                {currencyFormat(order.total)}
              </span>
            </div>

            <div className="mb-2 mt-5 w-full">
              <PayPalButton />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
