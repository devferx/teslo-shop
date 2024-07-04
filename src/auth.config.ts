import bcrypt from 'bcryptjs'
import NextAuth, { type NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import z from 'zod'

import prisma from './lib/prisma'

const authenticatedRoutes = ['/checkout', '/profile']

export const authConfig: NextAuthConfig = {
  secret:
    process.env.AUTH_SECRET ?? '3tudkUIOv1KAeg942DYknlgPSunGhBNNh4XSmMUhTD0=',
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnAuthenticatedRoute = authenticatedRoutes.some((route) =>
        nextUrl.pathname.startsWith(route),
      )

      // Redirect unauthenticated users to login page
      if (isOnAuthenticatedRoute && !isLoggedIn) return false

      return true
    },

    jwt({ token, user }) {
      if (user) {
        token.data = user
      }

      return token
    },
    session({ session, token, user }) {
      session.user = token.data as any
      return session
    },
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
