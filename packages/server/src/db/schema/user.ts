import { sql } from 'drizzle-orm'
import { sqliteTable, text } from 'drizzle-orm/sqlite-core'
import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

const role = z.enum(['customer', 'member', 'staff', 'ownner', 'root'])
type Role = z.infer<typeof role>
type Roles = Role[]

const status = z.enum(['normal', 'suspend'])

const userTable = sqliteTable('user', {
  id: text('id').primaryKey(),

  createAt: text('create_at').default(sql`(strftime('%s', 'now'))`),
  updateAt: text('update_at'),
  deleteAt: text('delete_at'),

  name: text('name').notNull(),
  phone: text('phone'),
  email: text('email'),

  roles: text('roles', { mode: 'json' }).$type<Roles>(),
  status: text('status', { enum: status.options }).notNull(),

  firstName: text('first_name'),
  lastName: text('last_name'),

  password: text('password').notNull()
})

const insertUserTable = createInsertSchema(userTable).omit({ id: true })
const selectUserTable = createSelectSchema(userTable).omit({ id: true })

type InsertUserTable = z.infer<typeof insertUserTable>
type SelectUserTable = z.infer<typeof selectUserTable>

export { insertUserTable, selectUserTable, userTable, type InsertUserTable, type SelectUserTable }
