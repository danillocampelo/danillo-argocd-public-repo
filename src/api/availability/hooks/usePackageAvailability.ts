import useBaseQuery from '@hooks/_common/useBaseQuery'
import { UseQueryOptions } from 'react-query'
import { QueryKeys } from 'src/utils/constants/queryKeys'
import { Origin } from 'src/models/Origin'
import {
  PackageAvailability,
  getPackageAvailability,
} from '../AvailabilityServiceApi'
import dayjs from 'dayjs'
import { RoomQuantity } from '@views/booking/components/RoomQuantitySelection'

export type UsePackageAvailabilityInput = {
  input: {
    packageId: string
    origin?: Origin
    roomQuantities: RoomQuantity[]
    departureDate?: dayjs.Dayjs
    returnDate?: dayjs.Dayjs
  }
  queryOptions?: UseQueryOptions<PackageAvailability>
}

const sumAdultsRooms = (rooms: RoomQuantity[]) =>
  rooms.reduce((quantity: number, room: any) => (quantity += room.adults), 0) ||
  0

const sumChildrenRooms = (rooms: RoomQuantity[]) =>
  rooms.reduce(
    (quantity: number, room: any) => (quantity += room.children + room.babies),
    0,
  ) || 0

const usePackageAvailability = (
  { input, queryOptions }: UsePackageAvailabilityInput,
  deps: any[] = [],
) => {
  const serviceData = {
    id: input.packageId,
    origin: input.origin?.id?.toString(),
    originIata: input.origin?.iata,
    originType: input.origin?.type,
    startDate: input.departureDate?.format('YYYY-MM-DD') || '',
    adults: sumAdultsRooms(input.roomQuantities),
    children: sumChildrenRooms(input.roomQuantities),
  }
  return useBaseQuery<PackageAvailability>(
    [QueryKeys.packageAvailability, input],
    () => getPackageAvailability(serviceData),
    queryOptions,
  )
}

export default usePackageAvailability
