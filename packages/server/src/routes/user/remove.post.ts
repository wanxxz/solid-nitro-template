import { eq } from 'drizzle-orm'
import { userTable } from '../../db/schema'

const handler = defineEventHandler(async event => {
  const authorizationHeader = event.headers.get('Authorization')

  const sessionId = event.context.lucia.readBearerToken(authorizationHeader ?? '')

  if (!sessionId) {
    return new Response(null, { status: 401 })
  }

  const { user } = await event.context.lucia.validateSession(sessionId)

  if (!user?.id) throw new Error('user invalid')

  const res = await event.context.libsql.delete(userTable).where(eq(userTable.id, user.id))

  return res
})

export default handler
