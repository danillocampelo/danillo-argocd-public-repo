import {Injectable} from '@nestjs/common'
import {InjectRepository} from '@nestjs/typeorm'
import {Repository} from 'typeorm'
import {Reserve, StatusReserve} from '~/modules/database/entity/reserve.entity'
import {ReserveRepositoryDataSource} from '~/new/core/reserve/interfaces/reserve.repository'
import {ReserveInput} from '~/new/core/reserve/models/reserve.input'

@Injectable()
export class ReserveRepository implements ReserveRepositoryDataSource {
  constructor(
    @InjectRepository(Reserve)
    private readonly repository: Repository<Reserve>,
  ) {}

  async addReserve(input: ReserveInput) {
    const data: Reserve = {
      ...input,
      createdAt: new Date(),
      status: StatusReserve.pending,
      reservationData: input.reservationData,
    }

    return await this.repository.save(data)
  }

  async getReserveByStatusAndId(bookingId: string, status: StatusReserve) {
    return await this.repository.findOne({
      where: {
        bookingId,
        status: status,
      },
    })
  }

  async updateReserveInfos(
    bookingId: string,
    status: StatusReserve,
    observation: string,
  ) {
    const reserve = await this.repository.findOneBy({
      bookingId,
    })
    reserve.status = status
    reserve.observation = observation
    await this.repository.save(reserve)
  }
}
