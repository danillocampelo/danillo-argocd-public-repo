import {InfotravelNamesDTO} from './commons/InfotravelNamesDTO'
import {InfoteraFlightSegmentClass} from './commons/InfoteraFlightSegmentClass'
import {InfotravelFlightLocation} from './commons/InfotravelFlightLocation'
import {InfotravelFlightFareType} from './commons/InfotravelFlightFareType'
import {InfotravelPolicyType} from './commons/InfotravelPolicyType'

/**
 * Check complete API here: http://developers.infotravel.com.br/#tag/CheckRate/operation/checkRate
 */
export interface InfotravelCheckratesInputBodyDTO {
  booking: {
    clientId: number
    bookingPackages: Array<{
      package: {
        key: string
      }
      bookingHotels: Array<{
        hotel: {
          id: number
        }
        rooms: Array<{
          key: string
          names: Array<InfotravelNamesDTO>
        }>
      }>
      bookingFlights: Array<{
        flights: Array<{
          key: string
        }>
        names: Array<InfotravelNamesDTO>
      }>
      bookingInsurances?: Array<{
        insurance: {
          key: string
        }
        names: Array<InfotravelNamesDTO>
      }>
      bookingTransfers?: Array<{
        dateSelected: string
        transfer: {
          key: string
          name: string
          date: string
          description: string
          type: string
          unique: string
          code: string
          segments: Array<{
            type: string
            vehicle: {
              name: string
              description: string
              type: string
            }
            transportType: string
          }>
          names: Array<InfotravelNamesDTO>
        }
      }>
      bookingTours?: Array<{
        tour: {
          key: string
        }
        names: Array<InfotravelNamesDTO>
      }>
      bookingServicePackages?: Array<{
        servicePackage: {
          key: string
        }
        names: Array<InfotravelNamesDTO>
      }>
      bookingTickets?: Array<{
        ticket: {
          key: string
        }
        modalitie: {
          code: string
          name: string
          date: {
            start: string
            end: string
            description: string
            price: number
          }
        }
        names: Array<InfotravelNamesDTO>
      }>
      bookingServiceOthers?: Array<{
        other: {
          key: string
        }
        names: Array<InfotravelNamesDTO>
      }>
    }>
  }
}

export interface InfotravelCheckratesOutputBodyDTO {
  booking: Booking
}

export interface Booking {
  id: number
  status: string
  bookingPackages: BookingPackage[]
  payments: Payment[]
}

export interface BookingPackage {
  bookingHotels: BookingHotel[]
  bookingFlights: BookingFlight[]
  bookingInsurances: BookingInsurance[]
  bookingTours: BookingTour[]
  bookingServicePackages: BookingServicePackage[]
  bookingTickets: BookingTicket[]
  bookingTransfers: BookingTransfer[]
  bookingServiceOthers: BookingServiceOther[]
  package: Package
}

export interface BookingHotel {
  provider: string
  hotel: Hotel
  rooms: Room[]
}

export interface Hotel {
  keyDetail: string
  name: string
  address: Address
  images: Image[]
}

export interface Address {
  address: string
  city: City
  coordinates: Coordinates
}

export interface City {
  name: string
  country: Country
}

export interface Country {
  code: string
  name: string
}

export interface Coordinates {
  latitude: number
  longitude: number
}

export interface Image {
  large: string
  medium: string
  small: string
}

export interface Room {
  key: string
  roomType: RoomType
  fares: Fare[]
  boardType: BoardType
  cancellationPolicies: CancellationPolicies
  checkIn: string
  checkOut: string
  policies: Policy[]
  names: Name[]
}

export interface RoomType {
  code: string
  name: string
  description: string
}

export interface Fare {
  type: string
  price: Price
  priceNet?: PriceNet
}

export interface Price {
  currency: string
  amount: number
  exchange?: number
}

export interface PriceNet {
  currency: string
  amount: number
}

export interface BoardType {
  name: string
}

export interface CancellationPolicies {
  refundable: boolean
  penalties: Penalty[]
}

export interface Penalty {
  from: string
  description: string
  percent: number
}

export interface Policy {
  name: string
  description: string
  type: string
}

export interface Name {
  age: number
  roomNumber: number
  type: string
  isMain: boolean
}

export interface BookingFlight {
  flights: Flight[]
  names: Name2[]
  fares: Fare2[]
  policies: Policy2[]
}

export interface Flight {
  key: string
  airline: Airline
  origin: Origin
  destination: Destination
  departure: string
  arrival: string
  number: string
  duration: string
  stopsCount: number
  available: boolean
  segments: Segment[]
}

export interface Airline {
  code: string
  name: string
}

export interface Origin {
  code: string
  name: string
  city: City2
}

export interface City2 {
  name: string
  country: Country2
}

export interface Country2 {
  code: string
  name: string
}

export interface Destination {
  code: string
  name: string
  city: City3
}

export interface City3 {
  name: string
  country: Country3
}

export interface Country3 {
  code: string
  name: string
}

export interface Segment {
  airline: Airline2
  origin: Origin2
  destination: Destination2
  number: string
  departure: string
  arrival: string
  classCode: string
  baggage: Baggage
  class: string
}

export interface Airline2 {
  code: string
  name: string
}

export interface Origin2 {
  code: string
  name: string
  city: City4
}

export interface City4 {
  name: string
  country: Country4
}

export interface Country4 {
  code: string
  name: string
}

export interface Destination2 {
  code: string
  name: string
  city: City5
}

export interface City5 {
  name: string
  country: Country5
}

export interface Country5 {
  code: string
  name: string
}

export interface Baggage {
  quantity: number
}

export interface Name2 {
  age: number
  type: string
  isMain: boolean
}

export interface Fare2 {
  type: string
  price: Price2
  priceNet?: PriceNet2
  description?: string
}

export interface Price2 {
  amount: number
  exchange?: number
}

export interface PriceNet2 {
  currency: string
  amount: number
}

export interface Policy2 {
  name: string
  description: string
  type: string
}

export interface BookingInsurance {
  insurance: Insurance
  names: Name3[]
  fares: Fare3[]
}

export interface Insurance {
  key: string
  code: string
  name: string
  startDate: string
  endDate: string
  description: string
  unique: boolean
  image: Image2
}

export interface Image2 {
  large: string
  medium: string
  small: string
}

export interface Name3 {
  age: number
  type: string
  isMain: boolean
}

export interface Fare3 {
  type: string
  price: Price3
  priceNet: PriceNet3
}

export interface Price3 {
  currency: string
  amount: number
  exchange: number
}

export interface PriceNet3 {
  currency: string
  amount: number
}

export interface BookingTour {
  tour: Tour
  names: Name4[]
  fares: Fare4[]
}

export interface Tour {
  key: string
  name: string
  code: string
  date: string
  description: string
  unique: boolean
  image: Image3
}

export interface Image3 {
  large: string
  medium: string
  small: string
}

export interface Name4 {
  age: number
  type: string
  isMain: boolean
}

export interface Fare4 {
  type: string
  price: Price4
  priceNet: PriceNet4
}

export interface Price4 {
  currency: string
  amount: number
  exchange: number
}

export interface PriceNet4 {
  currency: string
  amount: number
}

export interface BookingServicePackage {
  servicePackage: ServicePackage
  names: Name5[]
  fares: Fare5[]
}

export interface ServicePackage {
  key: string
  code: string
  name: string
  date: string
  description: string
  unique: boolean
  image: Image4
}

export interface Image4 {
  large: string
  medium: string
  small: string
}

export interface Name5 {
  age: number
  type: string
  isMain: boolean
}

export interface Fare5 {
  type: string
  price: Price5
  priceNet: PriceNet5
}

export interface Price5 {
  currency: string
  amount: number
  exchange: number
}

export interface PriceNet5 {
  currency: string
  amount: number
}

export interface BookingTicket {
  ticket: Ticket
  names: Name6[]
  fares: Fare6[]
}

export interface Ticket {
  key: string
  name: string
  code: string
  description: string
  start: string
  end: string
  unique: boolean
}

export interface Name6 {
  age: number
  type: string
  isMain: boolean
}

export interface Fare6 {
  type: string
  price: Price6
  priceNet: PriceNet6
}

export interface Price6 {
  currency: string
  amount: number
  exchange: number
}

export interface PriceNet6 {
  currency: string
  amount: number
}

export interface BookingTransfer {
  transfer: Transfer
  names: Name7[]
  fares: Fare7[]
}

export interface Transfer {
  key: string
  name: string
  date: string
  description: string
  type: string
  unique: boolean
  code: string
  segments: Segment2[]
}

export interface Segment2 {
  arrivalPlace: string
  transportDate: string
  transportNumber: string
  transportName: string
  origin: string
  destination: string
  type: string
  vehicle: Vehicle
  transportType: string
}

export interface Vehicle {
  name: string
  description: string
  type: string
}

export interface Name7 {
  age: number
  type: string
  isMain: boolean
}

export interface Fare7 {
  type: string
  price: Price7
  priceNet: PriceNet7
}

export interface Price7 {
  currency: string
  amount: number
  exchange: number
}

export interface PriceNet7 {
  currency: string
  amount: number
}

export interface BookingServiceOther {
  other: Other
  names: Name8[]
  fares: Fare8[]
}

export interface Other {
  key: string
  name: string
  code: string
  description: string
  date: string
  unique: boolean
  image: Image5
}

export interface Image5 {
  large: string
  medium: string
  small: string
}

export interface Name8 {
  age: number
  type: string
  isMain: boolean
}

export interface Fare8 {
  type: string
  price: Price8
  priceNet: PriceNet8
}

export interface Price8 {
  currency: string
  amount: number
  exchange: number
}

export interface PriceNet8 {
  currency: string
  amount: number
}

export interface Package {
  key: string
  id: number
  name: string
  origin: string
  destination: string
  days: number
  nights: number
}

export interface Payment {
  type: string
  options: Option[]
}

export interface Option {
  type: string
  paymentConfirmed: boolean
  brand: string
  installments: Installment[]
  provider: Provider
}

export interface Installment {
  value: number
  price: Price9
}

export interface Price9 {
  currency: string
  amount: number
  coefficient: number
}

export interface Provider {
  key: string
  id: number
  name: string
  token: string
  isAllowThreeDS: boolean
  isAllowThreeDSWithoutFraudManagment: boolean
  environment: string
}
