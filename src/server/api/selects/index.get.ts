import { defineEventHandler, getQuery } from 'h3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const query = getQuery(event)

  const selectOptions = await prisma.select.findMany({
    where: {
      type: query.type ? String(query.type) : undefined
    }
  })

  return selectOptions
})
