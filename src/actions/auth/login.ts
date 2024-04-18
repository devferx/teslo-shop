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
    await signIn('credentials', formData)
    // return 'Success'
  } catch (error) {
    // if (error instanceof AuthError) {
    //   switch (error.type) {
    //     case 'CredentialsSignin':
    //       return 'Invalid credentials.'
    //     default:
    //       return 'Something went wrong.'
    //   }
    // }

    return 'CredentialsSignin'

    throw error
  }
}
