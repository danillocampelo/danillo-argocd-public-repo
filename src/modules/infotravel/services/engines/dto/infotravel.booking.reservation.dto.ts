import {InfoteraFlightSegmentClass} from './commons/InfoteraFlightSegmentClass'
import {InfotravelFlightFareType} from './commons/InfotravelFlightFareType'
import {InfotravelFlightLocation} from './commons/InfotravelFlightLocation'
import {InfotravelNamesDTO} from './commons/InfotravelNamesDTO'
import {InfotravelPolicyType} from './commons/InfotravelPolicyType'
import {InfotravelFaclitiesDTO} from './infotravel.hotel.dto'

/**
 * Check complete API here: http://developers.infotravel.com.br/#tag/CheckRate/operation/checkRate
 */
export interface InfotravelBookingReservationInputBodyDTO {
  booking: {
    id: number
    clientId: number
    payments: InfotravelBookingPaymentDTO[]
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
    }>
  }
}

export interface InfotravelBookingPaymentDTO {
  type: string
  brand: string
  installment: {
    value: number
  }
  holderName: string
  cardNumber: string
  securityCode: string
  expirationMonth: string
  expirationYear: string
  authorizationNumber: string
  status: string
  client: {
    clientId: number
  }
  value: {
    currency: string
    amount: number
  }
}

export interface InfotravelBookingReservationOutputBodyDTO {
  booking: {
    id: number
    status: 'CREATION'
    bookingPackages: [
      {
        bookingHotels: Array<{
          provider: string
          hotel: {
            keyDetail: string
            name: string
            address: {
              zipcode: string
              address: string
              city: {
                name: string
                country: {
                  name: string
                }
              }
              coordinates: {
                latitude: number
                longitude: number
              }
            }
            stars: number
            images: Array<{
              large: string
              medium: string
              small: string
            }>
            facilities: InfotravelFaclitiesDTO[]
          }
          rooms: InfotravelCheckRatesRoomDTO[]
        }>
        bookingFlights: [
          {
            flights: Array<{
              key: string
              airline: {
                code: string
                name: string
              }
              origin: InfotravelFlightLocation
              destination: InfotravelFlightLocation
              departure: string
              arrival: string
              number: string
              duration: string
              stopsCount: number
              available: boolean
              segments: Array<{
                airline: {
                  code: string
                  name: string
                }
                origin: InfotravelFlightLocation
                destination: InfotravelFlightLocation
                number: string
                departure: string
                arrival: string
                classCode: string
                baggage: {
                  quantity: number
                }
                class: InfoteraFlightSegmentClass
              }>
            }>
            names: Array<InfotravelNamesDTO>
            fares: Array<{
              type: InfotravelFlightFareType
              price: {
                amount: number
                exchange: number
              }
              priceNet?: {
                currency: string
                amount: number
              }
            }>
            policies: Array<{
              name: string
              description: string
              type: InfotravelPolicyType
            }>
          },
        ]
        package: {
          key: string
          id: number
          name: string
          origin: string
          destination: string
          days: number
          nights: number
        }
      },
    ]
  }
}

export interface InfotravelCheckRatesRoomDTO {
  key: string
  quantity: number
  code: string
  category: string
  description: string
  roomType: {
    code: string
    name: string
    description: string
  }
  fares: Array<{
    type: string
    description: string
    price: {
      currency: string
      amount: number
      exchange: number
    }
    priceNet?: {
      currency: string
      amount: number
    }
  }>
  boardType: {
    name: string
  }
  cancellationPolicies: {
    refundable: boolean
    penalties: Array<{
      from: string
      description: string
      price: {
        currency: string
        amount: number
      }
      percent: number
    }>
  }
  checkIn: string
  checkOut: string
  policies: Array<{
    name: string
    description: string
    type: InfotravelPolicyType
  }>
  names: Array<InfotravelNamesDTO>
}
