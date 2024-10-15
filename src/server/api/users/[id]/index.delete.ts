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

  await prisma.user.delete({
    where: {
      id: Number(params.id)
    }
  })

  return { message: 'User deleted successfully' }
})
