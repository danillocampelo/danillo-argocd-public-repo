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

export class UpdateUserDto {
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

  @IsOptional()
  acceptedRegulation: boolean

  @IsOptional()
  emailVerified: boolean

  @IsOptional()
  userType: UserType

  @ValidateNested({each: true})
  @Type(() => AddressDto)
  address: AddressDto[]

  @ValidateNested({each: true})
  @Type(() => DocumentDto)
  @ArrayNotEmpty()
  documents: DocumentDto[]
}
