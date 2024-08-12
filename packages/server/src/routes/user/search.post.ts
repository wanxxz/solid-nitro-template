import { like } from 'drizzle-orm'
import { z } from 'zod'
import { selectUserTable, userTable } from '../../db/schema'

const searchInput = selectUserTable.pick({ name: true })

type SearchInput = z.infer<typeof searchInput>

const handler = defineEventHandler(async event => {
  const body = await readBody<SearchInput>(event)

  const res = await event.context.libsql
    .select()
    .from(userTable)
    .where(like(userTable.name, `%${body.name.toLowerCase()}%`))
    .all()

  return res
})

export default handler
