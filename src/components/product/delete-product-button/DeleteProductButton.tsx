'use client'

import { IoTrashOutline } from 'react-icons/io5'

import { deleteProductById } from '@/actions'

interface Props {
  productId: string
}

export const DeleteProductButton = ({ productId }: Props) => {
  const onDeleteProduct = async (productId: string) => {
    await deleteProductById(productId)
  }

  return (
    <button type="button" onClick={() => onDeleteProduct(productId)}>
      <IoTrashOutline
        className="text-xl hover:text-red-600"
        aria-label="Delete"
      />
    </button>
  )
}
