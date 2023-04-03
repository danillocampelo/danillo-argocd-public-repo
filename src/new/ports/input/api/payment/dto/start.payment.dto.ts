import {ApiProperty} from '@nestjs/swagger'

export enum Currency {
  BRL = 'BRL',
}
export class StartPaymentAmountDTO {
  @ApiProperty({
    required: true,
  })
  value: number

  @ApiProperty({
    enum: Currency,
    default: Currency.BRL,
    example: Currency.BRL,
  })
  currency: string
}

export class StartPaymentInputDTO {
  @ApiProperty({
    type: StartPaymentAmountDTO,
    required: true,
  })
  amount: StartPaymentAmountDTO

  @ApiProperty({
    required: true,
  })
  returnUrl: string

  @ApiProperty({
    required: true,
  })
  bookingId: string

  @ApiProperty({
    required: false,
  })
  reservationData: string
}

export class StartPaymentOutputDTO {
  @ApiProperty()
  returnUrl: string

  @ApiProperty()
  bookingId: string

  @ApiProperty()
  sessionId: string

  @ApiProperty()
  sessionData: string

  @ApiProperty({
    type: StartPaymentAmountDTO,
    required: true,
  })
  amount?: StartPaymentAmountDTO
}
