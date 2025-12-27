import clsx from 'clsx'

import { Size } from '@/interfaces'

interface Props {
  selectedSize?: Size
  availableSizes: Size[]
  showSizeError?: boolean
  onSizeChanged: (size: Size) => void
}

export const SizeSelector = ({
  availableSizes,
  selectedSize,
  showSizeError = false,
  onSizeChanged,
}: Props) => {
  return (
    <div className="my-5">
      <div className="mt-10">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold">Selecciona tu talla</p>
            {showSizeError && (
              <span className="mt-2 text-red-500">
                Debe de seleccionar una talla*
              </span>
            )}
          </div>
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
