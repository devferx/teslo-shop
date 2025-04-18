'use client'

import { useState, useEffect } from 'react'

import { useAddressStore, useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import clsx from 'clsx'
import { placeOrder } from '@/actions'
import { useRouter } from 'next/navigation'

export const PlaceOrder = () => {
  const router = useRouter()

  const [loaded, setLoaded] = useState(false)
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const address = useAddressStore((state) => state.address)
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation(),
  )

  const cart = useCartStore((state) => state.cart)
  const clearCart = useCartStore((state) => state.clearCart)

  useEffect(() => {
    setLoaded(true)
  }, [])

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true)
    const productsToOrder = cart.map((product) => ({
      productId: product.id,
      quantity: product.quantity,
      size: product.size,
    }))

    const resp = await placeOrder(productsToOrder, address)

    if (!resp.ok) {
      setIsPlacingOrder(false)
      setErrorMessage(resp.message)
      return
    }

    clearCart()
    router.replace(`/orders/${resp.order?.id}`)
  }

  if (!loaded) {
    return <p>Cargando...</p>
  }

  return (
    <div className="h-fit rounded-xl bg-white p-7 shadow-xl">
      <h2 className="mb-2 text-2xl">Dirección de entrega</h2>
      <div className="mb-10">
        <p className="text-xl">
          {address.firstName} {address.lastName}
        </p>
        <p>{address.address}</p>
        <p>{address.address2}</p>
        <p>{address.postalCode}</p>
        <p>
          {address.city}, {address.country}
        </p>
        <p>{address.phone}</p>
      </div>

      {/*  */}
      <div className="mb-10 h-0.5 w-full rounded bg-gray-200" />
      <h2 className="mb-2 text-2xl">Resumen de orden</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
        </span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span>Inpuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>

        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-right text-2xl">
          {currencyFormat(total)}
        </span>
      </div>

      <div className="mb-2 mt-5 w-full">
        <p className="mb-5">
          <span className="text-xs">
            Al hacer click en &quot;Colocar orden&quot;, aceptas nuestros{' '}
            <a className="underline" href="#">
              términos y condiciones
            </a>{' '}
            y{' '}
            <a className="underline" href="#">
              política de privacidad
            </a>
          </span>
        </p>

        <p className="text-red-500">{errorMessage}</p>

        <button
          className={clsx({
            'btn-primary': !isPlacingOrder,
            'btn-disabled': isPlacingOrder,
          })}
          onClick={onPlaceOrder}
          // href="/orders/123"
        >
          Colocar Orden
        </button>
      </div>
    </div>
  )
}
