import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle'
import { Lucia, TimeSpan } from 'lucia'
import { sessionTable, userTable } from '../db/schema'

export default defineEventHandler(event => {
  const adapter = new DrizzleSQLiteAdapter(event.context.libsql as never, sessionTable as never, userTable as never)

  const lucia = new Lucia(adapter, {
    sessionCookie: {
      attributes: {
        sameSite: 'none' as never
      }
    },
    sessionExpiresIn: new TimeSpan(30, 'd')
  })

  event.context.lucia = lucia
})

declare module 'h3' {
  interface H3EventContext {
    lucia: Lucia
  }
}
