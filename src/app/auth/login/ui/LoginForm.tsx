'use client'

import { useFormState } from 'react-dom'
import Link from 'next/link'

import { authenticate } from '@/actions'

export const LoginForm = () => {
  const [state, dispatch] = useFormState(authenticate, undefined)
  console.log({ state })

  return (
    <form action={dispatch} className="flex flex-col">
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="mb-5 rounded border bg-gray-200 px-5 py-2"
        type="email"
        name="email"
      />

      <label htmlFor="email">Contraseña</label>
      <input
        className="mb-5 rounded border bg-gray-200 px-5 py-2"
        type="password"
        name="password"
      />

      <button className="btn-primary" type="submit">
        Ingresar
      </button>

      {/* divisor line */}
      <div className="my-5 flex items-center">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  )
}
