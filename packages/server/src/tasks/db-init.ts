import { createClient } from '@libsql/client'
import { Chance } from 'chance'
import { drizzle } from 'drizzle-orm/libsql'
import { Scrypt } from 'oslo/password'
import * as schema from '../db/schema'

const client = createClient({ url: process.env.DB_URL as string })
const libsql = drizzle(client, { schema })

const chance = new Chance()

libsql.transaction(async tx => {
  await tx.insert(schema.userTable).values({
    id: chance.guid(),
    name: 'root',
    email: 'root@localhost.com',
    password: await new Scrypt().hash('passw0rd'),
    status: 'normal',
    roles: ['root']
  })
})
