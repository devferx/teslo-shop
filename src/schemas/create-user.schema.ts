import { z } from 'zod'

export const createUserSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'El nombre debe tener al menos 3 caracteres' })
    .max(200, { message: 'El nombre debe tener menos de 200 caracteres' }),
  email: z.string().email({ message: 'El correo electrónico no es válido' }),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres' }),
})

type CreateUserSchema = z.infer<typeof createUserSchema>
