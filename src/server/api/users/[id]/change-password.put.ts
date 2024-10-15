import { PrismaClient } from '@prisma/client'
import { defineEventHandler, readBody, createError } from 'h3'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  const user = event.context.user

  const { params } = event.context
  const userId = Number(params?.id)

  if (!userId) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User ID is required'
    })
  }

  // Ensure the authenticated user can only update their own password
  if (user.userId !== userId) {
    throw createError({
      statusCode: 403,
      statusMessage: 'You are not authorized to change this password'
    })
  }

  const body = await readBody(event)
  const { newPassword } = body
  // Password validation
  if (!newPassword || newPassword.length < 7) {
    throw createError({
      statusCode: 400,
      statusMessage: 'New password must be at least 8 characters long'
    })
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10)
  await prisma.user.update({
    where: { id: userId },
    data: { password: hashedPassword }
  })

  return { message: 'Password updated successfully' }
})
