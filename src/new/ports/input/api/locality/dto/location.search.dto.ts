import {ApiProperty} from '@nestjs/swagger'

export class LocationSearchOutput {
  @ApiProperty()
  public id: number

  @ApiProperty()
  public name: string
}
