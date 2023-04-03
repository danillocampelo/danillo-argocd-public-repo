import {ApiProperty} from '@nestjs/swagger'

export class AvailbilityQueryDTO {
  @ApiProperty({
    name: 'id',
    required: true,
    description: 'Package id in infotravel',
  })
  id: string

  @ApiProperty({required: true, example: '2022-02-10'})
  startDate: string

  @ApiProperty({required: true, example: '2022-02-20'})
  endDate: string

  @ApiProperty({required: true, description: 'Origin id'})
  origin: string

  @ApiProperty({required: true, description: 'Origin Iata'})
  originIata: string

  @ApiProperty({required: true, description: 'Origin type'})
  originType: string

  @ApiProperty({
    required: true,
    description: '',
    example: 2,
  })
  occupancy: any

  destination?: string
  destinationType?: string
  clientId?: string
}
