import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'locality'})
export class LocalityEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text', {
    name: 'external_id',
  })
  externalId: string

  @Column('text')
  name: string

  @Column('text', {
    name: 'normalized_name',
  })
  @Index()
  normalizedName: string
}
