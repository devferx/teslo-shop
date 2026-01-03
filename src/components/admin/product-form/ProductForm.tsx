'use client'

import { useRouter } from 'next/navigation'

import { useProductForm, useProductImages } from './hooks'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  AttributesSection,
  GeneralInfoSection,
  PhotosSection,
  PricingInventorySection,
} from './components'

import type {
  Category,
  Product,
  ProductImage as ProductWithImage,
} from '@/interfaces'

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] }
  categories: Category[]
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter()

  const { form, buildSubmitHandler, isSubmitting, isValid } = useProductForm({
    product,
  })

  const { control, register, setValue, watch } = form

  const {
    imagePreviews,
    imagesField,
    imagesInputRef,
    triggerFileDialog,
    handleImageChange,
    removeImagePreview,
    clearNewImages,
  } = useProductImages({ register, setValue })

  const onSuccessfulSubmission = () => {
    clearNewImages()
  }

  const handleSubmit = buildSubmitHandler(onSuccessfulSubmission)

  const goBack = () => {
    router.back()
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <GeneralInfoSection control={control} />
            <PricingInventorySection control={control} />
          </div>

          <div className="space-y-6">
            <AttributesSection
              control={control}
              categories={categories}
              sizes={sizes}
              setValue={setValue}
              watch={watch}
            />

            <PhotosSection
              product={product}
              imagePreviews={imagePreviews}
              triggerFileDialog={triggerFileDialog}
              removeImagePreview={removeImagePreview}
              imagesField={imagesField}
              imagesInputRef={imagesInputRef}
              handleImageChange={handleImageChange}
            />
          </div>
        </div>

        <div className="border-border/50 flex justify-end gap-4 border-t pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={goBack}
            className="w-32"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="w-48"
            disabled={!isValid || isSubmitting}
          >
            Guardar producto
          </Button>
        </div>
      </form>
    </Form>
  )
}
