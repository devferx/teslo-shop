'use server'

import prisma from '../../lib/prisma'

export const getCountries = async () => {
  try {
    const contries = await prisma.country.findMany({
      orderBy: {
        name: 'asc',
      },
    })

    return contries
  } catch (error) {
    console.log(error)
    return []
  }
}
