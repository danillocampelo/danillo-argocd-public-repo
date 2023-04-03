export interface Country {
  id: number
  code: string
  name: string
}

export interface City {
  id: number
  name: string
  state: string
  country: Country
}

export interface Coordenates {
  latitude: number
  longitude: number
}

export interface Address {
  zipcode: string
  address: string
  number: string
}

export interface AddressMembers {
  streetName: string
  streetNumber: string
  zipCode: string
  city: string
  state: string
  country: string
}

export interface Telephone {
  number: string
  type: string
}

export interface Document {
  number: string
  type: string
}

export interface BankAccount {
  id: number
  bank: string
  branch: string
  account: string
  pix: string
  accountType: string
  currency: string
}

export interface Contact {
  name: string
  mail: string
  telephone: string
}

export interface User {
  id?: number
  externalCode?: string
  name: string
  type?: string
  password?: string
  lastName?: string
  address?: Address
  telephones: Telephone[]
  email: string
  documents?: Document[]
  birth?: Date
  version?: number
  loginType?: string
  bankAccounts?: BankAccount[]
  contacts?: Contact[]
  riskData?: string
  category: {id: number}
}

export interface UserRegister {
  isSuccess?: boolean
  user: User
}
