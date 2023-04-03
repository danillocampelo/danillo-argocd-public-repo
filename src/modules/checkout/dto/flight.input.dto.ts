import {ApiProperty} from '@nestjs/swagger'
import {IsNotEmpty} from 'class-validator'

//startDate, endDate, numero de adultos, numero de crianças
export class FlightInputDTO {
  @ApiProperty()
  @IsNotEmpty()
  startDate: string

  @ApiProperty()
  @IsNotEmpty()
  endDate: string

  @ApiProperty()
  @IsNotEmpty()
  origin: string

  @ApiProperty()
  @IsNotEmpty()
  destination: string

  @ApiProperty()
  @IsNotEmpty()
  adults: string

  @ApiProperty()
  childs?: number[]
}
