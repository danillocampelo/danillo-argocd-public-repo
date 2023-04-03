import {ApiProperty} from '@nestjs/swagger'
import {Experience} from '../interfaces/package.interface'
import {IPackageOutput} from '../interfaces/package.service.output'
import {itemDetailEntity, triviaEntity} from './package.withRelations.entity'

export class hotelEntity {
  @ApiProperty()
  id: number
  @ApiProperty()
  name: string
  @ApiProperty()
  description: string
  @ApiProperty()
  rating: number
  @ApiProperty()
  images: string[]
}

export class packageOutputEntity implements IPackageOutput {
  @ApiProperty()
  id: number
  @ApiProperty()
  name: string
  @ApiProperty()
  price: number
  @ApiProperty()
  installmentPrice: number
  @ApiProperty()
  numberOfInstallments: number
  @ApiProperty()
  isConfigurable: boolean
  @ApiProperty()
  experiences: Experience[]
  @ApiProperty()
  title: string
  @ApiProperty()
  subtitle: string
  @ApiProperty()
  description: string
  @ApiProperty()
  images: string[]

  @ApiProperty({type: triviaEntity})
  trivia: triviaEntity[]

  @ApiProperty()
  catchphrase: string
  @ApiProperty()
  hotel: hotelEntity
  @ApiProperty()
  itinerary: {
    subtitle: string
    items: {title: string; image: string; description: string}[]
  }

  @ApiProperty({type: itemDetailEntity})
  informationItems: itemDetailEntity[]

  createdAt: Date
  updatedAt: Date
}
