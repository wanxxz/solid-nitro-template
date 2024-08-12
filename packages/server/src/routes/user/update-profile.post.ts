import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { insertUserTable, userTable } from '../../db/schema'

const updateProfileInput = insertUserTable.pick({ firstName: true, lastName: true })

export type UpdateProfileInput = z.infer<typeof updateProfileInput>

const handler = defineEventHandler(async event => {
  const body = await readBody<UpdateProfileInput>(event)

  // TODO: read session_id
  const session = await event.context.lucia.validateSession('')

  if (!session.user?.id) throw new Error('user invalid')

  const updateAt = Date.now().toString()

  const res = await event.context.libsql
    .update(userTable)
    .set({ updateAt, firstName: body.firstName, lastName: body.lastName })
    .where(eq(userTable.id, session.user.id))

  return res
})

export default handler
