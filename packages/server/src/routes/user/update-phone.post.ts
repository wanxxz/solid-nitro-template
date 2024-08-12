import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { insertUserTable, userTable } from '../../db/schema'

const updatePhoneInput = insertUserTable.pick({ phone: true })

type UpdatePhoneInput = z.infer<typeof updatePhoneInput>

const handler = defineEventHandler(async event => {
  const body = await readBody<UpdatePhoneInput>(event)

  // TODO: read session_id
  const { user } = await event.context.lucia.validateSession('')

  if (!user?.id) throw new Error('user invalid')

  const updateAt = Date.now().toString()

  const res = await event.context.libsql
    .update(userTable)
    .set({ updateAt, phone: body.phone })
    .where(eq(userTable.id, user.id))

  return res
})

export default handler
