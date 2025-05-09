'use client'

import clsx from 'clsx'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'

import { createUpdateProduct, deleteProductImage } from '@/actions'
import { ProductFormSchema, type ProductFormInputs } from '@/schemas'
import { ProductImage } from '@/components'

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

  const { formState, register, handleSubmit, getValues, setValue, watch } =
    useForm<ProductFormInputs>({
      resolver: zodResolver(ProductFormSchema),
      defaultValues: {
        ...product,
        tags: product.tags?.join(', '),
        sizes: product.sizes ?? [],
        images: undefined,
      },
    })
  const { isValid } = formState

  watch('sizes')

  const onSubmit = async (data: ProductFormInputs) => {
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

    const { ok, product: updatedProduct } = await createUpdateProduct(formData)

    if (!ok) {
      alert('Producto no guardado')
      return
    }

    router.replace(`/admin/product/${updatedProduct?.slug}`)
  }

  const onSizeChanged = (size: string) => {
    const sizes = new Set(getValues('sizes'))
    sizes.has(size) ? sizes.delete(size) : sizes.add(size)
    setValue('sizes', Array.from(sizes))
  }

  return (
    <form
      className="mb-16 grid grid-cols-1 gap-3 px-5 sm:grid-cols-2 sm:px-0"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* Textos */}
      <div className="w-full">
        <div className="mb-2 flex flex-col">
          <span>Título</span>
          <input
            type="text"
            className="rounded-md border bg-gray-200 p-2"
            {...register('title', { required: true })}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Slug</span>
          <input
            type="text"
            className="rounded-md border bg-gray-200 p-2"
            {...register('slug', { required: true })}
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Descripción</span>
          <textarea
            rows={5}
            className="rounded-md border bg-gray-200 p-2"
            {...register('description', { required: true })}
          ></textarea>
        </div>

        <div className="mb-2 flex flex-col">
          <span>Price</span>
          <input
            className="rounded-md border bg-gray-200 p-2"
            {...register('price', { required: true, valueAsNumber: true })}
            type="number"
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Tags</span>
          <input
            className="rounded-md border bg-gray-200 p-2"
            {...register('tags', { required: true })}
            type="text"
          />
        </div>

        <div className="mb-2 flex flex-col">
          <span>Gender</span>
          <select
            className="rounded-md border bg-gray-200 p-2"
            {...register('gender', { required: true })}
          >
            <option value="">[Seleccione]</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kid</option>
            <option value="unisex">Unisex</option>
          </select>
        </div>

        <div className="mb-2 flex flex-col">
          <span>Categoria</span>
          <select
            className="rounded-md border bg-gray-200 p-2"
            {...register('categoryId', { required: true })}
          >
            <option value="">[Seleccione]</option>
            {categories.map((category) => (
              <option
                className="capitalize"
                key={category.id}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
        </div>

        <button className="btn-primary w-full">Guardar</button>
      </div>

      {/* Selector de tallas y fotos */}
      <div className="w-full">
        <div className="mb-2 flex flex-col">
          <span>Inventario</span>
          <input
            className="rounded-md border bg-gray-200 p-2"
            {...register('inStock', { required: true, valueAsNumber: true })}
            type="number"
          />
        </div>

        {/* As checkboxes */}
        <div className="flex flex-col">
          <span>Tallas</span>
          <div className="flex flex-wrap">
            {sizes.map((size) => (
              // bg-blue-500 text-white <--- si está seleccionado
              <div
                key={size}
                onClick={() => onSizeChanged(size)}
                className={clsx(
                  'mb-2 mr-2 flex h-10 w-14 cursor-pointer items-center justify-center rounded-md border p-2 transition-all',
                  {
                    'bg-blue-500 text-white': getValues('sizes').includes(size),
                  },
                )}
              >
                <span>{size}</span>
              </div>
            ))}
          </div>

          <div className="mb-2 flex flex-col">
            <span>Fotos</span>
            <input
              className="rounded-md border bg-gray-200 p-2"
              multiple
              type="file"
              accept="image/*"
              {...register('images')}
            />
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {product.ProductImage?.map((image) => (
              <div
                className="overflow-hidden rounded-xl shadow-md"
                key={image.id}
              >
                <ProductImage
                  src={image.url}
                  alt={product.title ?? ''}
                  width={300}
                  height={300}
                />

                <button
                  className="btn-danger w-full"
                  onClick={() => deleteProductImage(image.id, image.url)}
                  type="button"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </form>
  )
}
