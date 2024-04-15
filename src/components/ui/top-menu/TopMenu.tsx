'use client'

import Link from 'next/link'
import { IoCartOutline, IoSearchOutline } from 'react-icons/io5'

import { titleFont } from '@/config/fonts'
import { useCartStore, useUIStore } from '@/store'
import { useEffect, useState } from 'react'

export const TopMenu = () => {
  const openSideMenu = useUIStore((state) => state.openSideMenu)
  const totalItemsInCart = useCartStore((state) => state.getTotalItems())

  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <nav className="flex w-full items-center justify-between px-5">
      {/* Logo */}
      <div>
        <Link href="/">
          <span className={`${titleFont.className} font-bold antialiased`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block">
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/men"
        >
          Hombres
        </Link>
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/women"
        >
          Mujeres
        </Link>
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href="/gender/kid"
        >
          Niños
        </Link>
      </div>

      {/* Search, Cart, Menu */}
      <div className="flex items-center">
        <Link className="mx-2" href="/search">
          <IoSearchOutline className="h-5 w-5" />
        </Link>
        <Link
          className="mx-2"
          href={totalItemsInCart === 0 && isLoaded ? '/empty' : '/cart'}
        >
          <div className="relative">
            {isLoaded && totalItemsInCart > 0 && (
              <span className="fade-in absolute -right-2 -top-2 rounded-full bg-blue-700 px-1 text-xs font-bold text-white ">
                {totalItemsInCart}
              </span>
            )}
            <IoCartOutline className="h-5 w-5" />
          </div>
        </Link>

        <button
          className="m-2 p-2 transition-all hover:bg-gray-100"
          onClick={() => openSideMenu()}
        >
          Menú
        </button>
      </div>
    </nav>
  )
}
