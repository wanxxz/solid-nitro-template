import { eq } from 'drizzle-orm'
import { userTable } from '../../db/schema'

const handler = defineEventHandler(async event => {
  const id = getRouterParam(event, 'id') as string
  const res = await event.context.libsql.select().from(userTable).where(eq(userTable.id, id)).limit(1)
  return res
})

export default handler
