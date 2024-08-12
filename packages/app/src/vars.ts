import { hasWindow } from 'std-env'

const { SERVER_URL, PUBLIC_SERVER_URL } = process.env

const serverURL = hasWindow ? import.meta.env.VITE_PUBLIC_SERVER_URL : import.meta.env.VITE_SERVER_URL

const vars = {
  serverURL
}

export { vars }
