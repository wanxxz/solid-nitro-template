import { createClient } from '@libsql/client'
import { drizzle, type LibSQLDatabase } from 'drizzle-orm/libsql'
import * as schema from '../db/schema'

export default defineEventHandler(event => {
  const client = createClient({ url: process.env.DB_URL as string })
  const libsql = drizzle(client, { schema })
  event.context.libsql = libsql
})

declare module 'h3' {
  interface H3EventContext {
    libsql: LibSQLDatabase<typeof schema>
  }
}
