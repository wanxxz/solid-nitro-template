import { eq } from 'drizzle-orm'
import { Scrypt } from 'oslo/password'
import { z } from 'zod'
import { userTable } from '../../db/schema'

const signinInput = z.object({ email: z.string().email(), password: z.string().min(1) })

export type SigninInput = z.infer<typeof signinInput>

const handler = defineEventHandler(async event => {
  const body = await readBody<SigninInput>(event)

  const inputParseResult = signinInput.safeParse(body)

  if (inputParseResult.error) throw new Error(inputParseResult.error.message)

  const user = await event.context.libsql.select().from(userTable).where(eq(userTable.email, body.email)).get()
  if (!user) throw new Error('invalid email')

  const validPassword = await new Scrypt().verify(user.password, body.password)
  if (!validPassword) {
    throw new Error('invalid password')
  }

  const session = await event.context.lucia.createSession(user.id, {})

  return session
})

export default handler
