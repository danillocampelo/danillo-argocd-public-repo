import {InfotravelBookingFlightsDTO} from './infotravel.flight.dto'
import {InfotravelHotelDTO} from './infotravel.hotel.dto'
import {InfotravelToursDto} from '~/modules/infotravel/engines/dto/infotravel.tours.dto'
import {InfotravelServicePackagesDto} from '~/modules/infotravel/engines/dto/infotravel.service.packages.dto'
import {InfotravelTicketsDto} from '~/modules/infotravel/engines/dto/infotravel.tickets.dto'
import {InfotravelTransfersDto} from '~/modules/infotravel/engines/dto/infotravel.transfers.dto'
import {InfotravelInsurancesDto} from '~/modules/infotravel/engines/dto/infotravel.insurance.dto'
import {InfotravelServiceOthersDto} from '~/modules/infotravel/engines/dto/infotravel.services.others.dto'

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
  bookingHotels: InfotravelHotelDTO[]
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
  bookingInsurances?: InfotravelInsurancesDto[]
  bookingTours?: InfotravelToursDto[]
  bookingServicePackages?: InfotravelServicePackagesDto[]
  bookingTickets?: InfotravelTicketsDto[]
  bookingTransfers?: InfotravelTransfersDto[]
  bookingServiceOthers?: InfotravelServiceOthersDto[]
  package?: InfotravelPackageDTO
}

export class InfotravelPackageDTO {
  id: number
  name: string
  destination?: string
}
