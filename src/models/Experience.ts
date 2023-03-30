import { Package } from './Package'

export interface Experience {
  id: string
  name: string
  description?: string
  packages?: Package[]
}
