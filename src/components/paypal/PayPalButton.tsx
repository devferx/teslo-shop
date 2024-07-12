'use client'

import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import type { CreateOrderData, CreateOrderActions } from '@paypal/paypal-js'

interface Props {
  orderId: string
  amount: number
}

export const PayPalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer()

  const roundedAmount = Math.round(amount * 100) / 100 // 100.00

  if (isPending) {
    return (
      <div className="mb-16 animate-pulse text-center">
        <div className="h-11 rounded bg-gray-300"></div>
        <div className="mt-2 h-11 rounded bg-gray-300"></div>
      </div>
    )
  }

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions,
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      purchase_units: [
        {
          // invoice_id: 'order_id',
          amount: {
            value: roundedAmount.toString(),
            currency_code: 'USD',
          },
        },
      ],
      intent: 'CAPTURE',
    })

    console.log({ transactionId })

    return transactionId
  }

  return <PayPalButtons createOrder={createOrder} />
}
