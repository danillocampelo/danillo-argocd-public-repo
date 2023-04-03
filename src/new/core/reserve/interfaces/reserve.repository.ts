import {StatusReserve} from '~/modules/database/entity/reserve.entity'

export interface ReserveRepositoryDataSource {
  addReserve(input: any)
  getReserveByStatusAndId(bookingId: string, status: StatusReserve)
  updateReserveInfos(
    bookingId: string,
    status: StatusReserve,
    observation: string,
  )
}
export const ReserveRepositoryDataSource = Symbol('ReserveRepositoryDataSource')
