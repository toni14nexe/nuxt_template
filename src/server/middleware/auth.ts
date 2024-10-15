import { createError, H3Event } from 'h3'
import jwt from 'jsonwebtoken'

const secretKey = process.env.JWT_SECRET || ''

export default async function authMiddleware(event: H3Event) {
  const token = event.req.headers['authorization']?.split(' ')[1]

  // Routes to check with middleware
  if (event.req.url?.includes('/api/users')) {
    if (!token) {
      throw createError({
        statusCode: 401,
        statusMessage: 'No token provided'
      })
    }

    try {
      const decoded = jwt.verify(token, secretKey)
      event.context.user = decoded
    } catch (error) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Unauthorized: Invalid token'
      })
    }
  }

  return
}
