import {Exclude} from 'class-transformer'
import {Column, CreateDateColumn, Entity, PrimaryColumn, Unique} from 'typeorm'

export enum StatusReserve {
  pending = 1,
  success = 2,
  error = 3,
}
@Entity('reserve')
@Unique(['memberCode', 'sessionId'])
export class Reserve {
  @Column('varchar', {
    length: 10,
    name: 'bookingId',
    nullable: false,
  })
  bookingId: string

  @PrimaryColumn({name: 'member_code', nullable: false})
  memberCode: string

  @PrimaryColumn({name: 'session_id', nullable: false})
  sessionId: string

  @Column('varchar', {
    length: 150,
    name: 'user_email',
    nullable: false,
  })
  userEmail: string

  @Exclude({toPlainOnly: true})
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date

  @Column({
    name: 'status',
    nullable: false,
    type: 'enum',
    enum: StatusReserve,
  })
  status: StatusReserve

  @Column('text', {
    name: 'observation',
    nullable: true,
  })
  observation?: string

  @Column('text', {
    name: 'reservationData',
    nullable: true,
  })
  reservationData?: string
}
