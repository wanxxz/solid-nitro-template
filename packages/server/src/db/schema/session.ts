import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { userTable } from './user'

const sessionTable = sqliteTable('session', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer('expires_at').notNull()
})

const insertSessionTable = createInsertSchema(sessionTable)
const selectSessionTable = createSelectSchema(sessionTable)

export { insertSessionTable, selectSessionTable, sessionTable }
