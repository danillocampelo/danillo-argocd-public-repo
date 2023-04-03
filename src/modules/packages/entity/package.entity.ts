import {ApiProperty} from '@nestjs/swagger'
import {Experience} from '../../database/entity/experience.entity'
import {ItemDetail} from '../../database/entity/itemDetail.entity'
import {Package, Status} from '../../database/entity/package.entity'
import {Trivia} from '../../database/entity/trivia.entity'

export class PackageEntity implements Package {
  trivia: Trivia[]
  experiences: Experience[]
  itemDetail: ItemDetail[]
  @ApiProperty()
  id: number

  @ApiProperty()
  itinerarySubtitle: string

  @ApiProperty()
  title: string

  @ApiProperty()
  subtitle: string

  @ApiProperty()
  description: string

  @ApiProperty()
  catchphrase: string

  @ApiProperty()
  catchphraseIcon: string

  @ApiProperty({default: false})
  highlight: boolean

  @ApiProperty()
  externalDescription: string

  @ApiProperty()
  externalId: string

  @ApiProperty()
  destination: string

  @ApiProperty()
  destinationType: string

  @ApiProperty()
  occupancy: string

  @ApiProperty()
  startDate: Date

  @ApiProperty()
  endDate: Date

  @ApiProperty()
  status: Status

  createdAt: Date

  updatedAt: Date

  @ApiProperty()
  price: number

  toJSON() {
    return this
  }
}
