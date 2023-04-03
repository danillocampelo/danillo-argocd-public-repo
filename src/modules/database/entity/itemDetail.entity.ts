import {Exclude} from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {Package} from './package.entity'

export enum DetailType {
  DETAIL_1 = 1,
  DETAIL_2 = 2,
  DETAIL_3 = 3,
  DETAIL_TRIP = 4,
  METAINFOS = 'metainfos',
  INFORMATION_ITENS = 'informationItens',
}

@Entity('item_detail')
export class ItemDetail {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {
    length: 150,
    name: 'icon',
    nullable: true,
  })
  icon: string

  @ManyToOne(() => Package, (Package) => Package.itemDetail, {
    onDelete: 'CASCADE',
  })
  package: Package

  @Column({
    name: 'type',
    nullable: true,
    type: 'enum',
    enum: DetailType,
  })
  type: DetailType

  @Column('text', {
    name: 'title',
    nullable: true,
  })
  title?: string

  @Column('text', {
    name: 'description',
    nullable: false,
  })
  description: string

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
