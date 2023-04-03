import {ApiProperty} from '@nestjs/swagger'
import {Package, Status} from '~/modules/packages/interfaces/package.interface'

export class CreatePackageDto implements Package {
  @ApiProperty()
  itinerarySubtitle: string

  @ApiProperty()
  id: number

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
