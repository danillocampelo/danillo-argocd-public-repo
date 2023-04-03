import {ApiProperty} from '@nestjs/swagger'
import {Type} from 'class-transformer'
import {IsDate} from 'class-validator'
import {DocumentType, PersonAgeType} from './checkrate.input.dto'

export class PersonDTO {
  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty({enum: DocumentType})
  documentType: DocumentType

  @ApiProperty({
    description: 'Numeric value of the document according to documentType.',
  })
  documentValue: number

  @IsDate()
  @ApiProperty({
    type: Date,
    description: 'The date in the format YYYY-MM-DD, example: `1970-12-01`',
  })
  @Type(() => Date)
  birthDate: Date

  @ApiProperty({enum: PersonAgeType})
  ageType: PersonAgeType
}
