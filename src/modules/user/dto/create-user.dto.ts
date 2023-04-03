import {Type} from 'class-transformer'
import {
  ArrayNotEmpty,
  IsDate,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  MaxLength,
  ValidateNested,
} from 'class-validator'
import {UserType} from '~/modules/database/entity/user.entity'
import {AddressDto} from './address.dto'
import {DocumentDto} from './document.dto'

export class UserDto {
  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string

  @IsNotEmpty()
  firstName: string

  @IsNotEmpty()
  lastName: string

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birthDate: Date

  @IsNotEmpty()
  @IsPhoneNumber('BR')
  phone: string

  @IsOptional()
  phoneVerified: boolean

  @IsNotEmpty()
  password: string

  @IsOptional()
  acceptedRegulation: boolean

  @IsOptional()
  emailVerified: boolean

  @IsNotEmpty()
  userType: UserType

  @ValidateNested({each: true})
  @Type(() => AddressDto)
  address: AddressDto[]

  @ValidateNested({each: true})
  @Type(() => DocumentDto)
  @ArrayNotEmpty()
  documents: DocumentDto[]
}
