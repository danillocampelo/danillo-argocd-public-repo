import { HotelDto } from 'src/api/hotels/dtos/HotelDto'
import { FlightDto } from './FlightDto'
import { ServiceDTO } from './ServicesDTO'

export interface PackageAvailabilityDTO {
  checkoutMetadata: string
  hotels: HotelDto[]
  flights: {
    depart: FlightDto[]
    return: FlightDto[]
  }[]
  servicePackages: ServiceDTO[]
}
