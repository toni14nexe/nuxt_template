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

  await prisma.select.delete({
    where: {
      id: Number(params.id)
    }
  })

  return { message: 'Select deleted successfully' }
})
