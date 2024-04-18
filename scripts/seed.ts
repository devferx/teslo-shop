import bcrypt from 'bcryptjs'
import { productsData } from './products'

interface SeedProduct {
  description: string
  images: string[]
  inStock: number
  price: number
  sizes: ValidSizes[]
  slug: string
  tags: string[]
  title: string
  type: ValidTypes
  gender: 'men' | 'women' | 'kid' | 'unisex'
}

interface SeedUser {
  email: string
  password: string
  name: string
  role: 'admin' | 'user'
}

type ValidSizes = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'
type ValidTypes = 'shirts' | 'pants' | 'hoodies' | 'hats'

interface SeedData {
  users: SeedUser[]
  categories: string[]
  products: SeedProduct[]
}

export const initialData: SeedData = {
  users: [
    {
      email: 'test1@gmail.com',
      name: 'Test user 1',
      password: bcrypt.hashSync('123456'),
      role: 'user',
    },
    {
      email: 'admin@gmail.com',
      name: 'Admin user',
      password: bcrypt.hashSync('123456'),
      role: 'admin',
    },
  ],
  categories: ['Shirts', 'Pants', 'Hoodies', 'Hats'],
  products: productsData as SeedProduct[],
}
