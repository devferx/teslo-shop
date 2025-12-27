'use client'

import { IoTrashOutline } from 'react-icons/io5'

import { deleteProductById } from '@/actions'

interface Props {
  productId: string
}

export const DeleteProductButton = ({ productId }: Props) => {
  const onDeleteProduct = async (productId: string) => {
    try {
      await deleteProductById(productId)
      if (typeof window !== 'undefined') {
        window.alert('Product deleted successfully.')
      }
    } catch (error) {
      console.error('Failed to delete product', error)
      if (typeof window !== 'undefined') {
        window.alert('Failed to delete product. Please try again.')
      }
    }
  }

  return (
    <button
      type="button"
      aria-label="Delete"
      onClick={() => onDeleteProduct(productId)}
    >
      <IoTrashOutline
        className="text-xl hover:text-red-600"
        aria-label="Delete"
      />
    </button>
  )
}
