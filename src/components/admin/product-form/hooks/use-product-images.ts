import { useEffect, useRef, useState } from 'react'
import type { UseFormRegister, UseFormSetValue } from 'react-hook-form'

import type { ProductFormInputs } from '@/schemas'

interface UseProductImagesProps {
  register: UseFormRegister<ProductFormInputs>
  setValue: UseFormSetValue<ProductFormInputs>
}

export const useProductImages = ({
  register,
  setValue,
}: UseProductImagesProps) => {
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const imagesInputRef = useRef<HTMLInputElement | null>(null)
  const imagesField = register('images')

  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [imagePreviews])

  const clearNewImages = () => {
    imagePreviews.forEach((url) => URL.revokeObjectURL(url))
    setImagePreviews([])
    if (imagesInputRef.current) {
      imagesInputRef.current.value = ''
    }
    const emptyFiles = new DataTransfer().files
    setValue('images', emptyFiles as FileList)
  }

  const triggerFileDialog = () => imagesInputRef.current?.click()

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    imagePreviews.forEach((url) => URL.revokeObjectURL(url))

    const newPreviews = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    )
    setImagePreviews(newPreviews)
  }

  const removeImagePreview = (index: number) => {
    URL.revokeObjectURL(imagePreviews[index])

    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    setImagePreviews(newPreviews)

    if (imagesInputRef.current) {
      const dt = new DataTransfer()
      const files = imagesInputRef.current.files

      if (files) {
        Array.from(files).forEach((file, i) => {
          if (i !== index) {
            dt.items.add(file)
          }
        })
        imagesInputRef.current.files = dt.files
      }
    }
  }

  return {
    imagePreviews,
    imagesField,
    imagesInputRef,
    triggerFileDialog,
    handleImageChange,
    removeImagePreview,
    clearNewImages,
  }
}
