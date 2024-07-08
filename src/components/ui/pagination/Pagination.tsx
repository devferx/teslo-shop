'use client'

import { redirect, usePathname, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import clsx from 'clsx'

import { generatePaginationNumbers } from '@/utils'
import { IoChevronBackOutline, IoChevronForwardOutline } from 'react-icons/io5'

interface Props {
  totalPages: number
}

export const Pagination = ({ totalPages }: Props) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const pageString = searchParams.get('page') ?? 1
  const currentPage = isNaN(+pageString) ? 1 : +pageString

  if (currentPage < 1 || isNaN(+pageString)) redirect(`${pathname}`)

  const allPages = generatePaginationNumbers(currentPage, totalPages)

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams)

    if (pageNumber === '...') return `${pathname}?${params.toString()}`

    if (Number(pageNumber) <= 0) return `${pathname}`

    if (Number(pageNumber) > totalPages)
      return `${pathname}?${params.toString()}`

    params.set('page', pageNumber.toString())
    return `${pathname}?${params.toString()}`
  }

  return (
    <div className="mb-32 mt-10 flex justify-center text-center">
      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex">
          <li className="page-item">
            <Link
              className="page-link relative block rounded border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {allPages.map((page) => (
            <li key={`page-${page}`} className="page-item">
              <Link
                className={clsx(
                  'page-link relative block rounded border-0 px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:text-gray-800 focus:shadow-none',
                  page === currentPage
                    ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:text-white focus:shadow-md'
                    : 'bg-transparent hover:bg-gray-300',
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <a
              className="page-link relative block rounded border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
