import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import z from 'zod'

import prisma from './lib/prisma'

export const authConfig: NextAuthConfig = {
  secret:
    process.env.AUTH_SECRET ?? '3tudkUIOv1KAeg942DYknlgPSunGhBNNh4XSmMUhTD0=',
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials)

        if (!parsedCredentials.success) return null

        const { email, password } = parsedCredentials.data

        // Search email
        const user = await prisma.user.findUnique({
          where: { email: email.toLowerCase() },
        })

        if (!user) return null

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password)
        if (!passwordMatch) return null

        // Return user
        const { password: _, ...rest } = user

        return rest
      },
    }),
  ],
}

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig)
