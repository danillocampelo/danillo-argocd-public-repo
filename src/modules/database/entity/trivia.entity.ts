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

@Entity('trivia')
export class Trivia {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {
    length: 150,
    name: 'text',
    nullable: false,
  })
  text: string

  @Column('varchar', {
    length: 150,
    name: 'bold_text',
    nullable: false,
  })
  boldText: string

  @ManyToOne(() => Package, (Package) => Package.trivia, {onDelete: 'CASCADE'})
  package: Package

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
