'use server'

import { AuthError } from 'next-auth'
import { signIn } from '@/auth.config'
import { sleep } from '@/utils'

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    // await sleep(3)
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirect: false,
    })

    return 'Success'
  } catch (error) {
    if (error instanceof AuthError && error.type === 'CredentialsSignin')
      return 'InvalidCredentials'

    return 'UnknownError'
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn('credentials', { email, password })
    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo iniciar sesión',
    }
  }
}
