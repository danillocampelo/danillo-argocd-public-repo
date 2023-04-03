import {Exclude} from 'class-transformer'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('booking')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number

  @Column({unique: true})
  infotravelId: number

  @Column()
  status: string
}

export enum BookingStatus {
  CREATED_INFOTRAVEL = 'CREATED_INFOTRAVEL',
}
