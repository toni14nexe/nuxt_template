import { defineEventHandler } from 'h3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const users = await prisma.user.findMany()
  const usersWithoutPassword = users.map(
    ({ password, ...userWithoutPassword }) => userWithoutPassword
  )
  return usersWithoutPassword
})
