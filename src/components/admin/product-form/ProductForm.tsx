'use client'

import { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Plus, Upload, X } from 'lucide-react'

import { createUpdateProduct, deleteProductImage } from '@/actions'
import { ProductFormSchema, type ProductFormInputs } from '@/schemas'
import { ProductImage } from '@/components'
import { useTags } from './use-tags'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'

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

    // Limpiar URLs previas
    imagePreviews.forEach((url) => URL.revokeObjectURL(url))

    // Crear nuevas URLs de preview
    const newPreviews = Array.from(files).map((file) =>
      URL.createObjectURL(file),
    )
    setImagePreviews(newPreviews)
  }

  const removeImagePreview = (index: number) => {
    // Revocar la URL del preview
    URL.revokeObjectURL(imagePreviews[index])

    // Actualizar el estado
    const newPreviews = imagePreviews.filter((_, i) => i !== index)
    setImagePreviews(newPreviews)

    // Actualizar el input de archivos
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
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Información General</CardTitle>
                <CardDescription>
                  Detalles básicos del producto.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Título</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Nombre del producto"
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="nombre-del-producto"
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descripción</FormLabel>
                      <FormControl>
                        <Textarea
                          className="min-h-30"
                          placeholder="Describe tu producto..."
                          {...field}
                          value={field.value ?? ''}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Precios e inventario</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4 sm:grid-cols-2">
                <FormField
                  control={control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Precio ($)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          step="0.01"
                          inputMode="decimal"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(event) => {
                            const { value, valueAsNumber } = event.target
                            field.onChange(
                              value === '' ? undefined : valueAsNumber,
                            )
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="inStock"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Inventario</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          inputMode="numeric"
                          {...field}
                          value={field.value ?? ''}
                          onChange={(event) => {
                            const { value, valueAsNumber } = event.target
                            field.onChange(
                              value === '' ? undefined : valueAsNumber,
                            )
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Atributos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Género</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? undefined}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="men">Hombres</SelectItem>
                            <SelectItem value="women">Mujeres</SelectItem>
                            <SelectItem value="kid">Niños</SelectItem>
                            <SelectItem value="unisex">Unisex</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Categoría</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value ?? undefined}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Seleccione" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.id}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={control}
                  name="sizes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tallas disponibles</FormLabel>
                      <FormControl>
                        <ToggleGroup
                          type="multiple"
                          value={field.value ?? []}
                          onValueChange={field.onChange}
                          className="justify-start gap-2"
                        >
                          {sizes.map((size) => (
                            <ToggleGroupItem
                              key={size}
                              value={size}
                              className="border-border/50 data-[state=on]:bg-primary data-[state=on]:text-primary-foreground h-10 w-12 border"
                            >
                              {size}
                            </ToggleGroupItem>
                          ))}
                        </ToggleGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Etiquetas</FormLabel>
                      <div className="mb-2 flex flex-wrap gap-2">
                        {parsedTags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="gap-1 px-2 py-1"
                          >
                            {tag}
                            <button
                              type="button"
                              onClick={() => removeTag(tag)}
                            >
                              <X className="hover:text-destructive h-3 w-3 cursor-pointer" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <Input
                          placeholder="Añadir tag"
                          value={tagDraft}
                          onChange={(event) => setTagDraft(event.target.value)}
                          onKeyDown={(event) => {
                            if (event.key === 'Enter') {
                              event.preventDefault()
                              addTag()
                            }
                          }}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={addTag}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <input
                        type="hidden"
                        {...field}
                        value={watchedTags}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg">Fotos</CardTitle>
                <CardDescription>
                  Sube las imágenes de tu producto.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  {product.ProductImage?.map((image) => (
                    <div
                      className="group border-border/50 bg-muted/40 relative overflow-hidden rounded-lg border shadow-sm"
                      key={image.id}
                    >
                      <ProductImage
                        src={image.url}
                        alt={product.title ?? ''}
                        width={400}
                        height={400}
                      />
                      <Button
                        className="absolute top-2 right-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => deleteProductImage(image.id, image.url)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  {imagePreviews.map((preview, index) => (
                    <div
                      className="group border-border/50 bg-muted/40 relative overflow-hidden rounded-lg border shadow-sm"
                      key={`preview-${index}`}
                    >
                      <img
                        src={preview}
                        alt={`Preview ${index + 1}`}
                        className="h-full w-full object-cover"
                        width={400}
                        height={400}
                      />
                      <Button
                        className="absolute top-2 right-2 h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeImagePreview(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <div className="bg-primary/80 text-primary-foreground absolute bottom-2 left-2 rounded px-2 py-1 text-xs">
                        Nueva
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={triggerFileDialog}
                    className="border-border/50 bg-background/40 text-muted-foreground hover:bg-background flex aspect-square flex-col items-center justify-center rounded-lg border-2 border-dashed text-center text-sm transition"
                  >
                    <Upload className="mb-2 h-6 w-6" />
                    <span className="px-3">Añadir nuevas fotos</span>
                  </button>
                </div>

                <input
                  {...imagesField}
                  ref={(element) => {
                    imagesInputRef.current = element
                    imagesField.ref(element)
                  }}
                  className="hidden"
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(event) => {
                    imagesField.onChange(event)
                    handleImageChange(event)
                  }}
                />
              </CardContent>
            </Card>
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
