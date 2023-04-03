import {Type} from 'class-transformer'

export class FaresDTO {
  type: string

  @Type(() => PriceDTO)
  price: PriceDTO[]
}

export class TagsDTO {
  description: string
  type: number
}

export class MetadataDTO {
  icon: string
  title: string
}

export class PriceDTO {
  currency: string
  amount: number
}

export class RoomsDTO {
  id: string
  available: boolean
  recommended: boolean
  name: string
  refoundable: boolean

  @Type(() => InfosDTO)
  infos: InfosDTO[]

  @Type(() => FaresDTO)
  fares: FaresDTO[]
}

export class InfosDTO {
  icon: string
  title: string
}
