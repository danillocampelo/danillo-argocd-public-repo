import { Country } from './Location'
import { Document } from './Document'

export type Genders = 'male' | 'female' | 'other'

export enum PersonType {
  ADULT = 'ADULT',
  CHILD = 'CHILD',
}

export interface Person {
  id: string
  name: string
  type: PersonType
  lastname: string
  livingCountry: Country
  document: Document
  birthday: string
  gender: Genders
}
