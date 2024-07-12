'use server'

import type { PayPalOrderStatusResponse } from '@/interfaces'

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken()

  if (!authToken) {
    return {
      ok: false,
      message: 'No se pudo obtener el token de autenticación',
    }
  }

  const resp = await verifyPayPalPayment(paypalTransactionId, authToken)

  if (!resp) {
    return {
      ok: false,
      message: 'No se pudo verificar el pago',
    }
  }

  const { status, purchase_units } = resp

  if (status !== 'COMPLETED') {
    return {
      ok: false,
      message: 'Aun no se ha completado el pago',
    }
  }

  // TODO Realiza la acutliazación de la orden en la base de datos
  // const {  } = purse_units[0] // TODO: invoce ID

  console.log({ status, purchase_units })
}

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET
  const oauth2Url = process.env.PAYPAL_OAUTH_URL as string

  const base64Token = Buffer.from(
    `${PAYPAL_CLIENT_ID}:${PAYPAL_SECRET}`,
    'utf-8',
  ).toString('base64')

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  myHeaders.append('Authorization', `Basic ${base64Token}`)

  const urlencoded = new URLSearchParams()
  urlencoded.append('grant_type', 'client_credentials')

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
  }

  try {
    const result: any = await fetch(oauth2Url, requestOptions).then((r) =>
      r.json(),
    )
    return result.access_token as string
  } catch (error) {
    console.log(error)
    return null
  }
}

const verifyPayPalPayment = async (
  paypalTransactionId: string,
  bearerToken: string,
): Promise<PayPalOrderStatusResponse | null> => {
  const paypalOrderUrl = `${process.env.PAYPAL_ORDERS_URL}/${paypalTransactionId}`

  const myHeaders = new Headers()
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded')
  myHeaders.append('Authorization', `Bearer ${bearerToken}`)

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
  }

  try {
    const resp: PayPalOrderStatusResponse = await fetch(
      paypalOrderUrl,
      requestOptions,
    ).then((r) => r.json())
    return resp
  } catch (error) {
    console.log(error)
    return null
  }
}
