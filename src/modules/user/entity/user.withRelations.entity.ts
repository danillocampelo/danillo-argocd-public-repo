import {Address} from '~/modules/database/entity/address.entity'
import {User} from '~/modules/database/entity/user.entity'
import {Document} from '~/modules/database/entity/document.entity'
import {ApiProperty} from '@nestjs/swagger'
import {UserEntity} from './user.entity'

export class AddressEntity implements Address {
  @ApiProperty()
  id: number
  @ApiProperty()
  zipCode: string
  @ApiProperty()
  address: string
  @ApiProperty()
  number: string
  @ApiProperty()
  complement: string
  @ApiProperty()
  neighborhood: string
  @ApiProperty()
  city: string
  @ApiProperty()
  state: string
  @ApiProperty()
  country: string
  createdAt: Date
  updatedAt: Date
  deletedAt: string
  toJSON(): Record<string, any> {
    return this
  }
  user: User
}

export class DocumentsEntity implements Document {
  @ApiProperty()
  id: number
  @ApiProperty()
  document: string
  @ApiProperty()
  type: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date
  toJSON(): Record<string, any> {
    return this
  }
  user: User
}

export class UserWithRelationsEntity extends UserEntity {
  @ApiProperty({type: [AddressEntity]})
  address: AddressEntity[]

  @ApiProperty({type: [DocumentsEntity]})
  documents: DocumentsEntity[]
}
