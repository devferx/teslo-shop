'use client'

import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5'

interface Props {
  quantity: number
  onQuantityChange: (quantity: number) => void
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {
  const onValueChange = (value: number) => {
    if (quantity + value < 1) return

    onQuantityChange(quantity + value)
  }

  return (
    <div className="flex items-center">
      <button onClick={() => onValueChange(-1)}>
        <IoRemoveCircleOutline size={30} />
      </button>

      <span className="mx-3 w-20 rounded-sm bg-gray-100 px-5 text-center">
        {quantity}
      </span>

      <button onClick={() => onValueChange(+1)}>
        <IoAddCircleOutline size={30} />
      </button>
    </div>
  )
}
