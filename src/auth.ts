
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import axios from 'axios'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(data: any) {
  // ... your Prisma Client queries will go here
  
  const result = await prisma.user.create({
    data: {
      name: data.user.name,
      email: data.user.email
    }
  })
  return result
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub as any],
  callbacks: {
    jwt({ token, user }) {
      if (user) { // User is available during sign-in
        token.id = user.id
      }
      return token
    },
    session({ session, token }) {
      session.user.id = token.id as any
      main(session).catch(error => {
        console.error(error)
      }).finally(() => {
        prisma.$disconnect()
      })
      return session
    },
  }
})