import {ApiProperty} from '@nestjs/swagger'
import {Address} from '~/modules/database/entity/address.entity'
import {Document} from '~/modules/database/entity/document.entity'
import {User, UserType} from '~/modules/database/entity/user.entity'

export class UserEntity implements User {
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

  @ApiProperty({type: [Address]})
  address: Address[]

  @ApiProperty({type: [Document]})
  documents: Document[]

  createdAt: Date

  updatedAt: Date

  deletedAt: Date

  hashPassword(): Promise<void> {
    throw new Error('Method not implemented.')
  }

  toJSON() {
    return this
  }

  comparePassword(attempt: string): Promise<boolean> {
    throw new Error('Method not implemented.')
  }
}
