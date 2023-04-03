import {Exclude, instanceToPlain} from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import {Experience} from './experience.entity'
import {ItemDetail} from './itemDetail.entity'
import {Trivia} from './trivia.entity'

export enum Status {
  ACTIVE = 'active',
  DISABLED = 'disabled',
}

@Entity('package')
export class Package {
  @PrimaryGeneratedColumn()
  id: number

  title?: string

  @Column('text', {
    name: 'subtitle',
    nullable: true,
  })
  subtitle: string

  @Column('text', {
    name: 'itinerary_subtitle',
    nullable: true,
  })
  itinerarySubtitle: string

  @Column('text', {
    name: 'description',
    nullable: true,
  })
  description: string

  @Column('text', {
    name: 'catchphrase',
    nullable: true,
  })
  catchphrase: string

  @Column('varchar', {
    length: 150,
    name: 'catchphrase_icon',
    nullable: true,
  })
  catchphraseIcon: string

  @Column('boolean', {
    name: 'highlight',
    default: false,
  })
  highlight: boolean

  @Column('text', {
    name: 'external_description',
    nullable: true,
  })
  externalDescription?: string

  @Column('varchar', {
    length: 150,
    name: 'external_id',
    nullable: true,
    unique: true,
  })
  externalId?: string

  @Column('text', {
    name: 'destination',
    nullable: true,
  })
  destination: string

  @Column('varchar', {
    length: 150,
    name: 'destination_type',
    nullable: true,
  })
  destinationType: string

  @Column('varchar', {
    length: 150,
    name: 'occupancy',
    nullable: true,
  })
  occupancy: string

  @Column('timestamp', {
    name: 'start_date',
    nullable: true,
  })
  startDate?: Date

  @Column('timestamp', {
    name: 'end_date',
    nullable: true,
  })
  endDate?: Date

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.ACTIVE,
  })
  status: Status

  @Exclude({toPlainOnly: true})
  @CreateDateColumn({
    name: 'created_at',
    default: () => 'NOW()',
  })
  createdAt: Date

  @Exclude({toPlainOnly: true})
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date

  @ManyToMany(() => Experience, (experience) => experience.packages)
  @JoinTable()
  experiences: Experience[]

  @OneToMany(() => ItemDetail, (ItemDetail) => ItemDetail.package, {
    cascade: true,
  })
  itemDetail: ItemDetail[]

  @OneToMany(() => Trivia, (Trivia) => Trivia.package, {cascade: true})
  trivia: Trivia[]

  toJSON() {
    return instanceToPlain(this)
  }
}
