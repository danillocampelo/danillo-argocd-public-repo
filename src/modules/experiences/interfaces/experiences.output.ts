import {ApiProperty} from '@nestjs/swagger'
import {Experience} from '~/modules/database/entity/experience.entity'

export class ExperienceOutput implements Experience {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  description?: string

  @ApiProperty()
  createdAt?: Date

  @ApiProperty()
  updatedAt?: Date
}
