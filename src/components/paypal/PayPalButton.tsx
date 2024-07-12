'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'

export const PayPalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer()

  if (isPending) {
    return (
      <div className="mb-16 animate-pulse text-center">
        <div className="h-11 rounded bg-gray-300"></div>
        <div className="mt-2 h-11 rounded bg-gray-300"></div>
      </div>
    )
  }

  return <PayPalButtons />
}
