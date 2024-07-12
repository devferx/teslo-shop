'use server'

export const paypalCheckPayment = async (paypalTransactionId: string) => {
  const authToken = await getPayPalBearerToken()
  console.log('🚀 ~ paypalCheckPayment ~ authToken:', authToken)

  if (!authToken) {
    return {
      ok: false,
      message: 'No se pudo obtener el token de autenticación',
    }
  }
}

const getPayPalBearerToken = async (): Promise<string | null> => {
  const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
  const PAYPAL_SECRET = process.env.PAYPAL_SECRET
  const oauth2Url = process.env.PAYPAL_OAUTH_URL as string

  console.log('PAYPAL_CLIENT_ID', PAYPAL_CLIENT_ID)
  console.log('PAYPAL_SECRET', PAYPAL_SECRET)
  console.log('oauth2Url', oauth2Url)

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
