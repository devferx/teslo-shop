'use client'

import { useCallback, useEffect, useState } from 'react'

import { getStockBySlug } from '@/actions'
import { titleFont } from '@/config/fonts'

interface Props {
  slug: string
}

export const StockLabel = ({ slug }: Props) => {
  const [stock, setStock] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const getStock = useCallback(async () => {
    const stock = await getStockBySlug(slug)
    setStock(stock)
    setIsLoading(false)
  }, [slug])

  useEffect(() => {
    getStock()
  }, [getStock])

  if (isLoading) {
    return (
      <h1
        className={`${titleFont.className} animate-pulse bg-gray-300 text-lg font-bold antialiased`}
      >
        &nbsp;
      </h1>
    )
  }

  return (
    <>
      <h1 className={`${titleFont.className} text-lg font-bold antialiased`}>
        Stock: {stock}
      </h1>
    </>
  )
}
