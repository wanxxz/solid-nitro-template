import { eq } from 'drizzle-orm'
import { Scrypt } from 'oslo/password'
import { z } from 'zod'
import { insertUserTable, userTable } from '../../db/schema'

const updatePasswordInput = insertUserTable.extend({ password: z.string().min(1) })

type UpdatePasswordInput = z.infer<typeof updatePasswordInput>

const handler = defineEventHandler(async event => {
  const body = await readBody<UpdatePasswordInput>(event)

  // TODO: read session_id
  const { user } = await event.context.lucia.validateSession('')

  if (!user?.id) throw new Error('user invalid')

  // TODO: password change security check
  // 1. send email
  // 2. ...

  const hashedPassword = await new Scrypt().hash(body.password)

  const res = await event.context.libsql
    .update(userTable)
    .set({ password: hashedPassword })
    .where(eq(userTable.id, user.id))

  return res
})

export default handler
