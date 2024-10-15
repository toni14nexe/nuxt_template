import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody } from 'h3'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  if (event.req.method === 'POST') {
    const body = await readBody(event)

    const hashedPassword = await bcrypt.hash(body.password, 10)

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        role: body.role,
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
    return userWithoutPassword
  }
})
