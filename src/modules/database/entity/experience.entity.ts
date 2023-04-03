import {Exclude} from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {Package} from './package.entity'

@Entity('experience')
export class Experience {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {
    length: 150,
    name: 'name',
    nullable: false,
  })
  name: string

  @Column('varchar', {
    length: 255,
    name: 'description',
    nullable: true,
  })
  description?: string

  @Exclude({toPlainOnly: true})
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt?: Date

  @Exclude({toPlainOnly: true})
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt?: Date

  @ManyToMany(() => Package, (pck) => pck.experiences, {cascade: true})
  packages?: Package[]
}
