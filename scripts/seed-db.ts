import prisma from '../src/lib/prisma'

import { initialData } from './seed'
import { countries } from './seed-countries'

async function main() {
  console.log('Erasing database...')
  await prisma.orderAddress.deleteMany()
  await prisma.orderItem.deleteMany()
  await prisma.order.deleteMany()

  await prisma.userAddress.deleteMany()
  await prisma.user.deleteMany()
  await prisma.country.deleteMany()

  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const { categories, products, users } = initialData

  await prisma.user.createMany({
    data: users,
  })

  await prisma.country.createMany({
    data: countries,
  })

  console.log('Creating categories...')
  const categoriesData = categories.map((name) => ({ name }))
  await prisma.category.createMany({
    data: categoriesData,
  })

  const categoriesDB = await prisma.category.findMany()
  const categoriesMap = categoriesDB.reduce(
    (map, category) => {
      map[category.name.toLocaleLowerCase()] = category.id
      return map
    },
    {} as Record<string, string>,
  )

  console.log('Creating products...')
  products.forEach(async (product) => {
    const { images, type, ...rest } = product

    const dbProduct = await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoriesMap[type.toLocaleLowerCase()],
      },
    })

    const imagesData = images.map((image) => ({
      url: image,
      productId: dbProduct.id,
    }))

    await prisma.productImage.createMany({
      data: imagesData,
    })
  })

  console.log('Seed executed successfully')
}

;(() => {
  if (process.env.NODE_ENV === 'production') return

  main()
})()
