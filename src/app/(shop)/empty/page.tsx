import Link from 'next/link'
import { IoCartOutline } from 'react-icons/io5'

export default function EmptyPage() {
  return (
    <div className="flex h-[800px] items-center justify-center">
      <IoCartOutline className="mx-5" size={80} />
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Tu carrito está vacio</h1>
        <Link className="mt-2 text-4xl text-blue-500" href="/">
          Regresar
        </Link>
      </div>
    </div>
  )
}
