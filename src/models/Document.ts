export type DocumentTypes = 'rg' | 'cpf' | 'passport'

export interface Document {
  type: DocumentTypes
  value: string
}
