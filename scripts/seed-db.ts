import { initialData } from './seed'
import prisma from '../src/lib/prisma'

async function main() {
  console.log('Erasing database...')
  await prisma.productImage.deleteMany()
  await prisma.product.deleteMany()
  await prisma.category.deleteMany()

  const { categories, products } = initialData

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
