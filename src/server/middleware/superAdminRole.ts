import { defineEventHandler, createError } from 'h3'

export default defineEventHandler(async event => {
  const user = event.context.user

  // Routes to check with middleware
  if (event.req.url?.includes('/api/selects') && event.req.method !== 'GET') {
    if (!user || user.role !== 'superAdmin') {
      throw createError({
        statusCode: 403,
        message: 'Forbidden: Insufficient privileges'
      })
    }
  }

  return
})
