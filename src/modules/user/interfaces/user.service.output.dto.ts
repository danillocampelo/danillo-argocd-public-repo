import {UserType} from '~/modules/database/entity/user.entity'

interface address {
  zipCode: string
  address: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  country: string
}
;[]

interface documents {
  document: string
  type: string
}
;[]

export interface IUserOutput {
  id: number
  email: string
  firstName: string
  lastName: string
  birthDate: Date
  phone: string
  phoneVerified: boolean
  password: string
  acceptedRegulation: boolean
  emailVerified: boolean
  userType: UserType
  address: address[]
  documents: documents[]
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
