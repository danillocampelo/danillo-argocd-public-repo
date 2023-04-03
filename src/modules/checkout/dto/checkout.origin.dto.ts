import {ApiProperty} from '@nestjs/swagger'

export class CheckoutOrigin {
  @ApiProperty()
  id: number

  @ApiProperty()
  name: string

  @ApiProperty()
  type: string

  @ApiProperty()
  iata: string
}

export class CheckoutOriginDTO {
  @ApiProperty({type: CheckoutOrigin})
  origins: CheckoutOrigin[]
}
