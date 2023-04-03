import {InfotravelBookingFlightsDTO} from './infotravel.flight.dto'
import {InfotravelHotelDTO} from './infotravel.hotel.dto'

export enum BookingStatus {
  CONFIRMED = 'CONFIRMED',
  RESERVED = 'RESERVED',
  CANCELED = 'CANCELED',
  IN_PAYMENT_PROCESS = 'IN_PAYMENT_PROCESS',
}

export interface InfotravelSimplifiedBooking {
  id: number
  status: BookingStatus
}

export interface InfotravelBookingDetailDTO {
  id: number
  status: BookingStatus
  contact: {
    name: string
    telephone: string
  }
  createdAt: Date
  expirationDate: Date
  urlVoucher: string
  bookingPackages?: InfotravelBookingPackagesDTO[]
  bookingHotels?: InfotravelHotelDTO[]
}

export interface InfotravelSearchBooking {
  id: number
  status: string
  type: string
  contact: {
    name?: string
    email?: string
    telephone?: string
  }
}

export interface InfotravelBookingPackagesDTO {
  bookingHotels: InfotravelHotelDTO[]
  bookingFlights?: InfotravelBookingFlightsDTO[]
  package?: InfotravelPackageDTO
}

export class InfotravelPackageDTO {
  id: number
  name: string
  destination?: string
}
