import {Exclude, instanceToPlain} from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {User} from './user.entity'

@Entity('address')
export class Address {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {
    length: 30,
    name: 'zipcode',
    nullable: false,
  })
  zipCode: string

  @Column('varchar', {
    length: 150,
    name: 'address',
    nullable: false,
  })
  address: string

  @Column('varchar', {
    length: 50,
    name: 'number',
    nullable: false,
  })
  number: string

  @Column('varchar', {
    length: 150,
    name: 'complement',
    nullable: true,
  })
  complement: string

  @Column('varchar', {
    length: 50,
    name: 'neighborhood',
    nullable: false,
  })
  neighborhood: string

  @Column('varchar', {
    length: 50,
    name: 'city',
    nullable: false,
  })
  city: string

  @Column('varchar', {
    length: 20,
    name: 'state',
    nullable: false,
  })
  state: string

  @Column('varchar', {
    length: 20,
    name: 'country',
  })
  country: string

  @Exclude({toPlainOnly: true})
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date

  @Exclude({toPlainOnly: true})
  @UpdateDateColumn({
    name: 'updated_at',
    nullable: false,
  })
  updatedAt: Date

  @Exclude({toPlainOnly: true})
  @Column('timestamp', {
    name: 'deleted_at',
    nullable: true,
  })
  deletedAt: string
  toJSON() {
    return instanceToPlain(this)
  }

  @ManyToOne(() => User, (user) => user.address, {
    onDelete: 'CASCADE',
  })
  user: User
}
