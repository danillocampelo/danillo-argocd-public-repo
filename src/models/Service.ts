import { Fare } from '@models/Fare'

export interface Service {
  id: string
  name: string
  description: string
  fares: Fare[]
  totalFares: number
  fees: number
}
