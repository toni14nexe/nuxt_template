import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const { params } = event.context
  if (!params || !params.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID parameter is required'
    })
  }

  const user = await prisma.user.findUnique({
    where: {
      id: Number(params.id)
    }
  })

  if (!user) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
})
