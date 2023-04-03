import {URL} from 'url'

export interface ReturnParseUri {
  scheme: string
  user: string
  password: string
  host: string
  port: number
  database: string
}
export function parseUri(uri: string): ReturnParseUri {
  const {
    protocol,
    username: user,
    password,
    port,
    hostname: host,
    pathname,
  } = new URL(uri)
  return {
    scheme: protocol.replace(':', ''),
    user,
    password,
    host,
    port: parseInt(port),
    database: pathname.replace('/', ''),
  }
}
