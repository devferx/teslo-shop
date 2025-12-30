'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import clsx from 'clsx'

import { login, registerUser } from '@/actions'
import { createUserSchema } from '@/schemas'

type FormInputs = {
  name: string
  email: string
  password: string
}

export const RegisterForm = () => {
  const { register, handleSubmit, formState } = useForm<FormInputs>({
    resolver: zodResolver(createUserSchema),
  })
  const { errors } = formState

  const [errorMessage, setErrorMessage] = useState('')

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    setErrorMessage('')
    const { name, email, password } = data
    const resp = await registerUser({ name, email, password })

    if (!resp.ok) {
      setErrorMessage(resp.message)
      return
    }

    await login(email.toLowerCase(), password)
    window.location.replace('/')
  }

  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Nombre completo</label>
        <input
          className={clsx('mb-5 rounded-sm border bg-gray-200 px-5 py-2', {
            'border-red-500': errors.name,
          })}
          type="text"
          autoFocus
          {...register('name')}
        />
        {errors.name?.message && (
          <p className="text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Correo electrónico</label>
        <input
          className={clsx('mb-5 rounded-sm border bg-gray-200 px-5 py-2', {
            'border-red-500': errors.email,
          })}
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />
        {errors.email?.message && (
          <p className="text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email">Contraseña</label>
        <input
          className={clsx('mb-5 rounded-sm border bg-gray-200 px-5 py-2', {
            'border-red-500': errors.password,
          })}
          type="password"
          {...register('password')}
        />
        {errors.password?.message && (
          <p className="text-sm text-red-600">{errors.password.message}</p>
        )}
      </div>

      {errorMessage && (
        <p className="mt-5 text-center text-red-600">{errorMessage}</p>
      )}

      <button className="btn-primary">Crear cuenta</button>

      {/* divisor l ine */}
      <div className="my-5 flex items-center">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/login" className="btn-secondary text-center">
        Ingresar
      </Link>
    </form>
  )
}
