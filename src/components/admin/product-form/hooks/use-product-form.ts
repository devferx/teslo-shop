import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { createUpdateProduct } from '@/actions'
import type { Product, ProductImage as ProductWithImage } from '@/interfaces'
import { ProductFormSchema, type ProductFormInputs } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'

interface UseProductFormProps {
  product: Partial<Product> & { ProductImage?: ProductWithImage[] }
}

export const useProductForm = ({ product }: UseProductFormProps) => {
  const router = useRouter()
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

  const buildSubmitHandler = useCallback(
    (onSuccess?: () => void) =>
      form.handleSubmit(async (data: ProductFormInputs) => {
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

          onSuccess?.()
          router.replace(`/admin/product/${updatedProduct?.slug}`)
        } catch (error) {
          console.log(error)
          alert('Producto no guardado')
        } finally {
          setIsSubmitting(false)
        }
      }),
    [form, product.id, router],
  )

  const goBack = () => router.back()

  return {
    form,
    buildSubmitHandler,
    isSubmitting,
    isValid: form.formState.isValid,
    goBack,
  }
}
