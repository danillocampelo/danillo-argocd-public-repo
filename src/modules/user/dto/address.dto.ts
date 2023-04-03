import {IsString, MaxLength} from 'class-validator'

export class AddressDto {
  @IsString()
  @MaxLength(8)
  zipCode: string

  @IsString()
  address: string

  @IsString()
  number: string

  @IsString()
  complement: string

  @IsString()
  neighborhood: string

  @IsString()
  city: string

  @IsString()
  state: string

  @IsString()
  country: string
}
