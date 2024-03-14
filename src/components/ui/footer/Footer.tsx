import { titleFont } from '@/config/fonts'
import Link from 'next/link'

export const Footer = () => {
  return (
    <footer className="mb-10 flex w-full justify-center text-xs">
      <Link href="/">
        <span className={`${titleFont.className} font-bold antialiased`}>
          Teslo
        </span>
        <span>| shop </span>
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
