'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'

import { createUpdateProduct } from '@/actions'

import { useTags } from './hooks'

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
import { ProductFormSchema, type ProductFormInputs } from '@/schemas'

interface Props {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] }
  categories: Category[]
}

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL']

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter()
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<ProductFormInputs>({
    resolver: zodResolver(ProductFormSchema),
    mode: 'onChange',
    defaultValues: {
      ...product,
      tags: product.tags?.join(', '),
      sizes: product.sizes ?? [],
      images: undefined,
    },
  })

  const { control, formState, register, handleSubmit, setValue, watch } = form
  const { isValid } = formState

  const { tagDraft, setTagDraft, watchedTags, parsedTags, addTag, removeTag } =
    useTags({ setValue, watch })

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

  const onSubmit = async (data: ProductFormInputs) => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      const { images, ...productToSave } = data

      if (product.id) {
        formData.append('id', product.id)
      }
      formData.append('title', productToSave.title)
      formData.append('slug', productToSave.slug)
      formData.append('description', productToSave.description)
      formData.append('price', productToSave.price.toString())
      formData.append('inStock', productToSave.inStock.toString())
      formData.append('sizes', productToSave.sizes.toString())
      formData.append('tags', productToSave.tags)
      formData.append('categoryId', productToSave.categoryId)
      formData.append('gender', productToSave.gender)

      if (images) {
        for (let idx = 0; idx < images.length; idx++) {
          formData.append('images', images[idx])
        }
      }

      const { ok, product: updatedProduct } =
        await createUpdateProduct(formData)

      if (!ok) {
        alert('Producto no guardado')
        return
      }

      clearNewImages()
      router.replace(`/admin/product/${updatedProduct?.slug}`)
    } catch (error) {
      console.log(error)
      alert('Producto no guardado')
    } finally {
      setIsSubmitting(false)
    }
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

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={handleSubmit(onSubmit)}>
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
              tagDraft={tagDraft}
              setTagDraft={setTagDraft}
              parsedTags={parsedTags}
              watchedTags={watchedTags}
              addTag={addTag}
              removeTag={removeTag}
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
            onClick={() => router.back()}
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
