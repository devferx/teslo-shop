'use server'

import { auth } from '@/auth.config'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export const changeUserRole = async (
  userId: string,
  role: 'admin' | 'user',
) => {
  const session = await auth()

  if (session?.user.role !== 'admin') {
    return { ok: false, message: 'Debe de estar autenticado como admin' }
  }

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role: role },
    })

    revalidatePath('/admin/users')
    return { ok: true }
  } catch (error) {
    return {
      ok: false,
      message: 'No se pudo actualizar el rol, revisar logs',
    }
  }
}
