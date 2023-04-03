import {Inject, Injectable} from '@nestjs/common'
import {UserAuthentication} from '~/common/auth/models/UserAuthentication'
import {StatusReserve} from '~/modules/database/entity/reserve.entity'
import {StartPaymentInputDTO} from '~/new/ports/input/api/payment/dto/start.payment.dto'
import {ReserveRepositoryDataSource} from './interfaces/reserve.repository'
import {ReserveInput} from './models/reserve.input'

@Injectable()
export class ReserveService {
  constructor(
    @Inject('ReserveRepositoryDataSource')
    private readonly reserveRepository: ReserveRepositoryDataSource,
  ) {}

  async addReserve(
    input: StartPaymentInputDTO,
    session: any,
    user: UserAuthentication,
  ) {
    const reserveInput: ReserveInput = {
      bookingId: input.bookingId,
      memberCode: user?.memberNumber,
      sessionId: session.id,
      userEmail: '',
      reservationData: input.reservationData,
    }
    return await this.reserveRepository.addReserve(reserveInput)
  }

  async getPendingReservation(bookingId: string) {
    return await this.reserveRepository.getReserveByStatusAndId(
      bookingId,
      StatusReserve.pending,
    )
  }

  async updateReservation(
    bookingId: string,
    status: StatusReserve,
    obs?: string,
  ) {
    return await this.reserveRepository.updateReserveInfos(
      bookingId,
      status,
      obs,
    )
  }
}
