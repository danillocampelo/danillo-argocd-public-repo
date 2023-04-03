import {UserType} from '~/modules/database/entity/user.entity'
import {IUserOutput} from '../interfaces/user.service.output.dto'
import {AddressEntity, DocumentsEntity} from './user.withRelations.entity'
import {ApiProperty} from '@nestjs/swagger'

export class UserOutputEntity implements IUserOutput {
  @ApiProperty()
  id: number
  @ApiProperty()
  email: string

  @ApiProperty()
  firstName: string

  @ApiProperty()
  lastName: string

  @ApiProperty()
  birthDate: Date

  @ApiProperty()
  phone: string

  @ApiProperty()
  phoneVerified: boolean

  @ApiProperty()
  password: string

  @ApiProperty()
  acceptedRegulation: boolean

  @ApiProperty()
  emailVerified: boolean

  @ApiProperty()
  userType: UserType

  @ApiProperty({type: [AddressEntity]})
  address: AddressEntity[]

  @ApiProperty({type: [DocumentsEntity]})
  documents: DocumentsEntity[]

  createdAt: Date
  updatedAt: Date
  deletedAt: Date
}
