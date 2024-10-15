import { PrismaClient } from '@prisma/client'
import { createError, defineEventHandler, readBody } from 'h3'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const { params } = event.context

  if (!params || !params.id) {
    throw createError({
      statusCode: 400,
      statusMessage: 'ID parameter is required'
    })
  }

  const body = await readBody(event)

  try {
    const select = await prisma.select.update({
      where: {
        id: Number(params.id)
      },
      data: {
        type: body.type,
        value: body.value,
        hrLabel: body.hrLabel,
        enLabel: body.enLabel
      }
    })

    return {
      statusCode: 200,
      select
    }
  } catch (error) {
    console.error('Error updating select:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update select'
    })
  } finally {
    await prisma.$disconnect()
  }
})
