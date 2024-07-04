'use server'
import prisma from '@/lib/prisma'
import bcrypt from 'bcryptjs'

import type { CreateUserSchema } from '@/schemas'

export const registerUser = async ({
  name,
  email,
  password,
}: CreateUserSchema) => {
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: bcrypt.hashSync(password),
      },
      select: {
        id: true,
        name: true,
        email: true,
      },
    })

    return {
      ok: true,
      user,
      message: 'Usuario creado',
    }
  } catch (error) {
    console.log(error)

    return {
      ok: false,
      message: 'Error al registrar el usuario',
    }
  }
}
