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

  // Check parameters
  if (typeof body.email !== 'string' || !body.email.includes('@')) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email format'
    })
  }

  try {
    const user = await prisma.user.update({
      where: {
        id: Number(params.id)
      },
      data: {
        email: body.email,
        firstname: body.firstname,
        lastname: body.lastname,
        mobile: body.mobile,
        country: body.country,
        MIBPG: body.MIBPG,
        businessName: body.businessName,
        organizationType: body.organizationType,
        county: body.county,
        place: body.place,
        address: body.address,
        activities: body.activities,
        oib: body.oib
      }
    })

    const { password, ...userWithoutPassword } = user
    return {
      statusCode: 200,
      user: userWithoutPassword
    }
  } catch (error) {
    console.error('Error updating user:', error)
    throw createError({
      statusCode: 500,
      statusMessage: 'Failed to update user'
    })
  } finally {
    await prisma.$disconnect()
  }
})
