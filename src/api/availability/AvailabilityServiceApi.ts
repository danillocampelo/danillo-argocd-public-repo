import { get } from '@api/_common/api'
import { Flight, FlightType } from '@models/Flight'
import { Package } from '@models/Package'
import { mapHotel } from '../hotels/mappers/HotelMapper'
import { PackageAvailabilityDTO } from './dtos/PackageAvailabilityDTO'
import { mapFlights } from './mappers/FlightMapper'
import { mapServices, ServiceWithTotals } from './mappers/ServiceMapper'

const basePath = 'checkout/availability'

export type GetPackageAvailabilityInput = {
  id: string
  startDate: string
  origin?: string
  originIata?: string
  originType?: string
  adults: number
  children?: number
  endDate?: string
}

export type PackageAvailability = Pick<Package, 'hotels' | 'roadMap'> & {
  departureFlights: Flight[]
  returnFlights: Omit<Flight, 'keyPairs'>[]
  checkoutMetadata: string
  servicesWithTotals: ServiceWithTotals
}

export const getPackageAvailability = async (
  input: GetPackageAvailabilityInput,
): Promise<PackageAvailability> => {
  try {
    const { data } = await get<PackageAvailabilityDTO>({
      url: `${basePath}/package`,
      config: {
        params: {
          ...input,
        } as GetPackageAvailabilityInput,
      },
    })

    return {
      hotels: data.hotels.map(mapHotel),
      departureFlights: mapFlights(data.flights, FlightType.DEPART),
      returnFlights: mapFlights(data.flights, FlightType.RETURN),
      checkoutMetadata: data.checkoutMetadata,
      servicesWithTotals: mapServices(data.servicePackages),
    }
  } catch (err) {
    throw err
  }
}
