'use client'

import { useSession } from 'next-auth/react'
import Link from 'next/link'

export const BannerCard = () => {
  const session = useSession()

  if (session.status === 'authenticated') {
    return null
  }

  return (
    <div className="border-cgrey space-y-1 border p-4">
      <h2 className="text-orange text-3xl font-semibold">
        Envío gratuito para miembros.
      </h2>
      <p className="text-cgrey">
        Hazte miembro de Teslo para disfrutar de envíos rápidos y gratuitos.{' '}
        <Link className="font-semibold" href="/auth/new-account">
          Únete
        </Link>{' '}
        o{' '}
        <Link className="font-semibold" href="/auth/login">
          Iniciar sesión
        </Link>
      </p>
    </div>
  )
}
