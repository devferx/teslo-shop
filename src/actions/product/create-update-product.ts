'use server'

import { revalidatePath } from 'next/cache'
import { v2 as cloudinary } from 'cloudinary'
import type { Product, Size } from '@prisma/client'

import prisma from '@/lib/prisma'
import { productSchema } from '@/schemas'

cloudinary.config(process.env.CLOUDINARY_URL ?? '')

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData)
  const productParsed = productSchema.safeParse(data)

  if (!productParsed.success)
    return { ok: false, message: 'Error al parsear el producto' }

  const product = productParsed.data
  product.slug = product.slug.toLowerCase().replace(/ /g, '-').trim()

  const { id, ...rest } = product

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product
      const tagsArray = rest.tags.split(',').map((tag) => tag.trim())

      // If id is present, update the product
      if (id) {
        product = await tx.product.update({
          where: { id },
          data: {
            ...rest,
            sizes: { set: rest.sizes as Size[] },
            tags: { set: tagsArray },
          },
        })
      } else {
        product = await tx.product.create({
          data: {
            ...rest,
            sizes: { set: rest.sizes as Size[] },
            tags: { set: tagsArray },
          },
        })
      }

      // Proceso de carga y guardado de images
      // Recorrer las iamgenes y guardarlas
      if (formData.getAll('images')) {
        const images = await uploadImages(formData.getAll('images') as File[])
        if (!images) {
          throw new Error('No se pudo cargar las imágenes')
        }

        await tx.productImage.createMany({
          data: images.map((image) => ({
            url: image!,
            productId: product.id,
          })),
        })
      }

      return { product }
    })

    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${product.slug}`)
    revalidatePath(`/products/${product.slug}`)

    return {
      ok: true,
      product: prismaTx.product,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      message: 'Error al guardar el producto',
    }
  }
}

const uploadImages = async (images: File[]) => {
  try {
    const uploadPromises = images.map(async (image) => {
      try {
        const buffer = await image.arrayBuffer()
        const base64Image = Buffer.from(buffer).toString('base64')

        return cloudinary.uploader
          .upload(`data:image/png;base64,${base64Image}`, {
            folder: 'teslo-shop',
          })
          .then((r) => r.secure_url)
      } catch (error) {
        console.log(error)
        return null
      }
    })

    const uploadedImages = await Promise.all(uploadPromises)
    return uploadedImages
  } catch (error) {
    console.log(error)
    return null
  }
}
