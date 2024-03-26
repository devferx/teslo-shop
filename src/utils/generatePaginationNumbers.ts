// [1,2,3,4,5, ..., 7]
export const generatePaginationNumbers = (
  currentPage: number,
  totalPages: number,
) => {
  // If total pages is less than 7, return an array of numbers from 1 to totalPages
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1)
  }

  // If the current page is between the first 3 pages
  // then show the first 3 pages, then ..., then the 2 last pages
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages]
  }

  // if the current page is between the last 3 pages
  // then show the first 2 pages, then ..., then the last 3 pages
  if (currentPage > totalPages - 3) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages]
  }

  // Otherwise, show the current page, the 2 pages before and after it, then ...
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ]
}
