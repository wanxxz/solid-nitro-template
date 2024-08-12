import { createClient } from '@libsql/client'
import { drizzle } from 'drizzle-orm/libsql'
import * as schema from './schema'

const client = createClient({ url: process.env.DB_URL as string })
const db = drizzle(client, { schema })

export { client, db }
