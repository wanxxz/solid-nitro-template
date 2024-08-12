import { ofetch } from 'ofetch'
import { vars } from '../vars'

const request = ofetch.create({ baseURL: vars.serverURL })

export { request }
