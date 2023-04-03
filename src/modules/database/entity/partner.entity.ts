/* id
idProvider
name
createdAt
updatedAt
parameters
parameters TABELA
key
value */

import {Exclude} from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {Parameters} from './parameters.entity'

@Entity('partner')
export class Partner {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {
    length: 150,
    name: 'name',
    nullable: true,
  })
  name: string

  @Column({nullable: false, name: 'id_provider'})
  idProvider: number

  @OneToMany(() => Parameters, (Parameters) => Parameters.partnerId, {
    cascade: true,
  })
  parameters: Parameters[]

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
}
