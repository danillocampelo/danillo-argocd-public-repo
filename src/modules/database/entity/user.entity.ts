import * as bcrypt from 'bcrypt'
import {Exclude, instanceToPlain} from 'class-transformer'
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {Address} from './address.entity'
import {Document} from './document.entity'

export enum UserType {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {
    length: 150,
    name: 'email',
    nullable: false,
    unique: true,
  })
  email: string

  @Column('varchar', {
    length: 150,
    name: 'first_name',
    nullable: false,
  })
  firstName: string

  @Column('varchar', {
    length: 150,
    name: 'last_name',
    nullable: false,
  })
  lastName: string

  @Column('timestamp', {
    name: 'birthdate',
    nullable: true,
  })
  birthDate: Date

  @Column('varchar', {
    length: 20,
    name: 'phone',
    nullable: true,
  })
  phone: string

  @Column('boolean', {
    default: 0,
    name: 'phone_verified',
  })
  phoneVerified: boolean

  @Exclude({toPlainOnly: true})
  @Column('varchar', {
    length: 150,
    name: 'password',
    nullable: true,
  })
  password: string

  @Column('boolean', {
    default: 0,
    name: 'accepted_regulation',
  })
  acceptedRegulation: boolean

  @Column('boolean', {
    default: 0,
    name: 'email_verified',
  })
  emailVerified: boolean

  @Column({
    type: 'enum',
    name: 'user_type',
    enum: UserType,
    default: UserType.USER,
  })
  userType: UserType

  @Exclude({toPlainOnly: true})
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date

  @Exclude({toPlainOnly: true})
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date

  @Exclude({toPlainOnly: true})
  @Column('timestamp', {
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: Date

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10)
    }
  }

  toJSON() {
    return instanceToPlain(this)
  }
  async comparePassword(attempt: string): Promise<boolean> {
    return await bcrypt.compare(attempt, this.password)
  }

  @OneToMany(() => Address, (address) => address.user, {
    cascade: true,
  })
  address: Address[]

  @OneToMany(() => Document, (document) => document.user, {
    cascade: true,
  })
  documents: Document[]
}
