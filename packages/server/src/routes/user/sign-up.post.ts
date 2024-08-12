import { nanoid } from 'nanoid'
import { Scrypt } from 'oslo/password'
import { z } from 'zod'
import { insertUserTable, userTable } from '../../db/schema'

const signupInput = insertUserTable
  .pick({
    firstName: true,
    lastName: true,
    name: true,
    phone: true
  })
  .extend({
    password: z.string().min(1)
  })

type SignupInput = z.infer<typeof signupInput>

const handler = defineEventHandler(async event => {
  const body = await readBody<SignupInput>(event)
  const { name, phone, password, firstName = null, lastName = null } = body

  // TODO: gen id
  const id = nanoid()
  const createAt = Date.now().toString()

  const hashedPassword = await new Scrypt().hash(password)

  const res = await event.context.libsql
    .insert(userTable)
    .values({
      id,
      createAt,
      name,
      status: 'normal',
      roles: ['member'],
      phone,
      firstName: firstName,
      lastName: lastName,
      password: hashedPassword
    })
    .returning()
    .get()

  return res
})

export default handler
