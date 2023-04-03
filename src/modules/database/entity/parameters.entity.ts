import {Exclude} from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {Partner} from './partner.entity'

@Entity('parameters')
export class Parameters {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {
    length: 150,
    name: 'key',
    nullable: false,
  })
  key: string

  @Column('varchar', {
    length: 150,
    name: 'value',
    nullable: false,
  })
  value: string

  @ManyToOne(() => Partner, (Partner) => Partner.parameters, {
    onDelete: 'CASCADE',
  })
  partnerId: Partner

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
