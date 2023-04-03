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

@Entity('document')
export class Document {
  @PrimaryGeneratedColumn()
  id: number

  @Column('varchar', {
    length: 150,
    name: 'document',
    nullable: false,
    unique: true,
  })
  document: string

  @Column('varchar', {
    length: 150,
    name: 'type',
    nullable: false,
  })
  type: string

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

  toJSON() {
    return instanceToPlain(this)
  }

  @ManyToOne(() => User, (user) => user.documents, {
    onDelete: 'CASCADE',
  })
  user: User
}
