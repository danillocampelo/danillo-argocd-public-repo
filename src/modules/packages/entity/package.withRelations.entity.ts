import {ApiProperty} from '@nestjs/swagger'
import {Experience} from '~/modules/database/entity/experience.entity'
import {
  DetailType,
  ItemDetail,
} from '~/modules/database/entity/itemDetail.entity'
import {Package} from '~/modules/database/entity/package.entity'
import {Trivia} from '~/modules/database/entity/trivia.entity'
import {PackageEntity} from './package.entity'

export class experienceEntity implements Experience {
  createdAt: Date
  updatedAt: Date
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string
}

export class triviaEntity implements Trivia {
  @ApiProperty()
  package: Package
  createdAt: Date
  updatedAt: Date
  @ApiProperty()
  id: number

  @ApiProperty()
  text: string

  @ApiProperty()
  boldText: string
}

export class itemDetailEntity implements ItemDetail {
  @ApiProperty()
  package: Package

  createdAt: Date
  updatedAt: Date

  @ApiProperty()
  type: DetailType

  @ApiProperty()
  @ApiProperty()
  description: string

  @ApiProperty()
  id: number

  @ApiProperty()
  icon: string

  @ApiProperty()
  title: string
}

export class PackageWithRelationsEntity extends PackageEntity {
  @ApiProperty({type: experienceEntity})
  experiences: experienceEntity[]

  @ApiProperty({type: triviaEntity})
  trivia: triviaEntity[]

  @ApiProperty({type: itemDetailEntity})
  itemDetail: itemDetailEntity[]
}
