import {ApiProperty} from '@nestjs/swagger'

export enum FareType {
  FARE = 'FARE',
  SERVICE_CHARGE = 'SERVICE_CHARGE',
  BOARDING_RATE = 'BOARDING_RATE',
}

export class Price {
  @ApiProperty()
  currency: string

  @ApiProperty()
  amount: number
}

export class Fare {
  @ApiProperty({
    enum: FareType,
    examples: [FareType.FARE, FareType.SERVICE_CHARGE, FareType.BOARDING_RATE],
  })
  type: FareType

  @ApiProperty({type: Price})
  price: Price

  point: {amount: number}
}
