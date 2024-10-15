import { defineEventHandler, readBody } from 'h3'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  if (event.req.method === 'POST') {
    const body = await readBody(event)

    const selectOption = await prisma.select.create({
      data: {
        type: body.type,
        value: body.value,
        hrLabel: body.hrLabel,
        enLabel: body.enLabel
      }
    })

    return selectOption
  }
})
