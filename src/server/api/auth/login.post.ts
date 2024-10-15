import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody, createError } from 'h3'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

export default defineEventHandler(async event => {
  const body = await readBody(event)

  const { email, password } = body

  if (!email || !password) {
    throw createError({
      statusCode: 400,
      message: 'Email and password are required'
    })
  }

  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw createError({ statusCode: 401, message: 'Invalid email or password' })
  }

  // Create a JWT token
  const token = jwt.sign(
    {
      userId: user.id,
      role: user.role
    },
    JWT_SECRET,
    { expiresIn: '4h' } // Token expiry time
  )

  return { token }
})
