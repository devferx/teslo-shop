'use client'

import { useCartStore } from '@/store'
import { currencyFormat } from '@/utils'
import { useEffect, useState } from 'react'

export const OrderSummary = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const { itemsInCart, subTotal, tax, total } = useCartStore((state) =>
    state.getSummaryInformation(),
  )

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return <p>Cargando...</p>

  return (
    <div className="flex flex-col gap-[4px]">
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">
          {itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}
        </span>
      </div>
      <div className="grid grid-cols-2">
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
      </div>
      <div className="grid grid-cols-2">
        <span>Inpuestos (15%)</span>
        <span className="text-right">{currencyFormat(tax)}</span>
      </div>

      <div className="bg-soft-gray h-[1px] w-full"></div>

      <div className="grid grid-cols-2">
        <span className="mt-5 text-2xl">Total:</span>
        <span className="mt-5 text-right text-2xl">
          {currencyFormat(total)}
        </span>
      </div>
    </div>
  )
}
