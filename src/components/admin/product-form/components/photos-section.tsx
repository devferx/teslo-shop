'use client'

import React from 'react'
import { Upload, X } from 'lucide-react'
import { UseFormRegisterReturn } from 'react-hook-form'

import { deleteProductImage } from '@/actions'

import { ProductImage as ProductImageComponent } from '@/components'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import type { Product, ProductImage as ProductWithImage } from '@/interfaces'

interface PhotosSectionProps {
  imagePreviews: string[]
  imagesField: UseFormRegisterReturn
  imagesInputRef: React.MutableRefObject<HTMLInputElement | null>
  product: Partial<Product> & { ProductImage?: ProductWithImage[] }
  handleImageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  removeImagePreview: (index: number) => void
  triggerFileDialog: () => void
}

export const PhotosSection = ({
  imagePreviews,
  imagesField,
  imagesInputRef,
  product,
  handleImageChange,
  removeImagePreview,
  triggerFileDialog,
}: PhotosSectionProps) => {
  const onImageInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    imagesField.onChange(event)
    handleImageChange(event)
  }

  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg">Fotos</CardTitle>
        <CardDescription>Sube las imágenes de tu producto.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {product.ProductImage?.map((image) => (
            <div
              className="group border-border/50 bg-muted/40 relative overflow-hidden rounded-lg border shadow-sm"
              key={image.id}
            >
              <ProductImageComponent
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
              {/* eslint-disable-next-line @next/next/no-img-element */}
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
          onChange={onImageInputChange}
        />
      </CardContent>
    </Card>
  )
}
