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
      <div className="mt-10">
        <div className="flex justify-between font-semibold">
          <p>Selecciona tu talla</p>
          {/* <p className="text-[#757575]">Guía de tallas</p> */}
        </div>
        <div className="mt-2 grid auto-rows-[48px] grid-cols-3 gap-2">
          {availableSizes.map((size) => (
            <button
              key={size}
              className={clsx(
                'rounded-[4px] border',
                size == selectedSize ? 'border-black' : 'border-soft-gray',
              )}
              onClick={() => onSizeChanged(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
