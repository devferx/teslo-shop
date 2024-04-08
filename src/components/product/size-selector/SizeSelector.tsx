import clsx from 'clsx'

import { Size } from '@/interfaces'

interface Props {
  selectedSize?: Size
  availableSizes: Size[]

  onSizeChanged: (size: Size) => void
}

export const SizeSelector = ({
  availableSizes,
  selectedSize,
  onSizeChanged,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="mb-4 font-bold">Tallas disponibles</h3>

      <div className="flex">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx('mx-2 text-lg hover:underline', {
              underline: size === selectedSize,
            })}
            onClick={() => onSizeChanged(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  )
}
