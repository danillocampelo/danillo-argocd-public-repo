import {DetailType} from '~/modules/database/entity/itemDetail.entity'

export type ItemDetail = {
  id: number
  icon: string
  type: DetailType
  title?: string
  description: string
  createdAt?: Date
  updatedAt?: Date
}

export type Trivia = {
  id: number
  text: string
  boldText: string
}

export type Experience = {
  id: number
  name: string
  description?: string
}

export enum Status {
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

export type Package = {
  itinerarySubtitle: string
  id: number
  title?: string
  subtitle: string
  description: string
  catchphrase: string
  catchphraseIcon: string
  highlight: boolean
  externalDescription?: string | null
  externalId?: string | null
  destination: string
  destinationType: string
  occupancy: string
  startDate?: Date | null
  endDate?: Date | null
  status: Status
  createdAt?: Date
  updatedAt?: Date
  price?: number
}

export interface IPackageWithRelations extends Package {
  experiences: Experience[]
  trivia: Trivia[]
  itemDetail: ItemDetail[]
}
