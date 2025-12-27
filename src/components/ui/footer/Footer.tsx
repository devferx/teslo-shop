import { titleFont } from '@/config/fonts'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="bg-black-1 flex w-full justify-center py-16 text-xs text-white">
      <Link href="/">
        <span className={`${titleFont.className} font-bold antialiased`}>
          Teslo
        </span>
        <span> | shop </span>
        <span>&copy; {new Date().getFullYear()}</span>
      </Link>

      <Link className="mx-3" href="/">
        Privacidad & Legal
      </Link>

      <Link className="mx-3" href="/">
        Ubicaciones
      </Link>
    </footer>
  )
}
