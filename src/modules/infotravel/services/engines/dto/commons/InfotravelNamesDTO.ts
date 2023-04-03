import {InfotravelNamesDocumentType} from './InfotravelNamesDocumentType'
import {InfotravelNamesType} from './InfotravelNamesType'

export interface InfotravelNamesDTO {
  firstName: string
  lastName: string
  birth: string
  age: number
  roomNumber?: number
  type: InfotravelNamesType
  document: {
    type: InfotravelNamesDocumentType
    number: number
  }
}
