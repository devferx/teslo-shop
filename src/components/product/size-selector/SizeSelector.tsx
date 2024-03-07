import { Size } from '@/interfaces'
import clsx from 'clsx'

interface Props {
  availableSizes: Size[]
  selectedSize: Size
}

export const SizeSelector = ({ availableSizes, selectedSize }: Props) => {
  return (
    <div className="my-5">
      <h3 className="mb-4 font-bold">Tallas disponibles</h3>

      <div className="flex">
        {availableSizes.map((size) => (
          <button
            className={clsx('mx-2 text-lg hover:underline', {
              underline: size === selectedSize,
            })}
            key={size}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
