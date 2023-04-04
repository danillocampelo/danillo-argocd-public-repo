export interface IResponseAuthInfotravel {
  accessToken: string
  type: string
  expire_seconds: number
}

export interface IGetToken {
  accessToken: string
  type: string
  expire_seconds: number
}

export interface InfoTravelPackageSearch {
  origins: []
  destination: []
  periods: []
}

export interface InfoTravelPackageAvailbilitySearchParams {
  origin: number
  originIata: string
  originType: string
  start: string
  occupancy: number
  destination: number
  destinationType: string
  packageType: string
  client?: number | string
  packageId?: number
}

export declare namespace Availbility {
  export type PackageAvailbility = InfoTravelPackageAvailbility
}

export interface InfoTravelPackageAvailbility {
  message?: string | 'No availability'
  packageAvails?: IPackageAvail[]
}
export interface ITransferAvail {
  type: string
  dates: []
  transfer: []
  fares: []
}
export interface IHotelAvails {
  provider: string
  checkIn: Date
  checkOut: Date
  hotel: IHotel
  roomGroups: IroomGroup[]
}

export interface IroomGroup {
  rooms: IRooms[]
}

export interface IRooms {
  key: string
  roomType: {
    code: string
    name: string
    description: string
  }
  fares: IroomGroupFare[]
  boardType: {
    name: string
  }
  cancellationPolicies: ICancellationPolicies
  checkIn: Date
  checkOut: Date
  available: boolean
  names: IName[]
}

export interface IroomGroupFare extends IFare {
  type: 'FARE' | 'SERVICE_CHARGE' | 'PROMOTION_DISCOUNT'
  code?: string
  description: 'Operadora' | 'Taxas' | 'Last Minute'
}

export interface IFare {
  type: string
  price: Price
  priceNet?: PriceNet
  description?: string
  point?: {amount: number}
}

export interface IHotel {
  id: number
  keyDetail: string
  name: string
  description?: string
  address: object
  stars: number
  highlight?: string
  images: Iimage[]
  attributes?: []
}

export interface ITourAvails {
  tour: ITour
  dates?: Iimage[]
  fares: IFare[]
  names: {
    age: number
    type: string
  }[]
}
export interface ITour {
  key: string
  name: string
  code: string
  date: Date
  description: string
  unique: boolean
  image?: Iimage
}

export interface IPackage {
  key: string
  id: number
  name: string
  description: string
  observation: string
  origin: string
  destination: string
  days: number
  nights: number
  start: string
  end: string
  images: Iimage[]
  roadMap?: any
}

export interface IServicePackage {
  key: string
  code: string
  name: string
  date: Date
  description: string
  unique: boolean
}

export interface IName {
  age: number
  type: string
}

export interface IServicePackageAvail {
  servicePackage: IServicePackage
  fares: IFare[]
  names: IName[]
}

export interface IPackageAvail {
  hotelAvails: IHotelAvails[]
  flightAvails: IFlightAvails[]
  servicePackageAvails: IServicePackageAvail[]
  tourAvails: ITourAvails[]
  package: IPackage
  busAvails?: any[]
  ticketAvails?: any[]
  insuranceAvails?: IinsuranceAvails[]
  transferAvails?: ItransferAvails[]
  serviceOtherAvails?: IserviceOtherAvails[]
}

export interface IserviceOtherAvails {
  other: any
  fares: IFare
  names: IName[]
}

export interface ItransferAvails {
  type: string
  transfer: any
  fares: IFare
  names: IName[]
}

export interface IinsuranceAvails {
  insurance: any
  fares: IFare
  names: IName[]
}

// @TODO: namespace avail
export interface ITicketAvails {
  ticket: any
  fares: {point: {amount: number}}[]
}

export interface IFlightAvails {
  routes: IFlightAvailsRoute[]
  names: IIFlightAvailsNames[]
}

export interface IFlightAvailsRoute {
  numberRoute: 1 | 2 | number
  flights: IFlightAvailsRoutesFlights[]
}

export interface Airline {
  code: string
  name: string
}

export interface Origin {
  code: string
  name: string
  city: City
}

export interface City {
  name: string
  country: Country
}

export interface Country {
  code: string
  name: string
}

export interface Destination {
  code: string
  name: string
  city: City
}

export interface Baggage {
  quantity: number
}

export interface Segment {
  airline: Airline
  origin: Origin
  destination: Destination
  number: string
  departure: Date
  arrival: Date
  classCode: string
  baggage: Baggage
  class: string
}

export interface IFlightAvailsRoutesFlights {
  key: string
  airline: Airline
  origin: Origin
  destination: Destination
  departure: Date
  arrival: Date
  number: string
  duration: string
  stopsCount: number
  available: boolean
  segments: Segment[]
  fares: Fare[]
}

export interface Fare {
  type: string
  description: string
  price: Price
  priceNet: PriceNet
  code?: string
}

export interface Price {
  currency: string
  amount: number
  exchange: number
}

export interface PriceNet {
  currency: string
  amount: number
}

export interface IFlightsFare extends IFare {
  type: 'FARE' | 'BOARDING_RATE'
}

export interface IIFlightAvailsNames {
  age: number
  type: string
}

export interface Iimage {
  large: string
  medium: string
  small: string
}

export interface IinfoteraPackageByIdImage {
  big: string
  average: string
  small: string
}

export interface IinfoteraPackageById {
  id: any
  title: string
  description: string
  observation: string
  roadMap: {
    sqDay: number
    name: string
    description: string
    images: IinfoteraPackageByIdImage[]
  }[]
  images?: IinfoteraPackageByIdImage[]
  destinations: {
    destination: {
      id: number
      name: string
      type: string
      iata: string
    }
    packageServices: {
      name: string
      type: string
      includedType: string
      day: number
      code: string
      integrator: string
      provider: string
    }[]
    packageHotels: {
      id: number
      name: string
      keyDetail: string
    }[]
    days: number
    nights: number
  }[]
}

export declare namespace Utility {
  export type IHotelDetail = IUtilityHotelDetail
}

export interface IHotelDetailImage {
  large: string
  medium: string
  small: string
}

export interface IUtilityHotelDetail {
  hotel?: {
    id?: number
    keyDetail?: string
    name: string
    description: string
    address: {
      zipcode: string
      address: string
      number?: string
      complement?: string
      city: {
        name: string
        state?: string
        country: {
          code?: string
          name: string
        }
      }
      neighborhood?: string
      coordinates: {
        latitude: number
        longitude: number
      }
    }
    stars: number
    highlight: string
    images: IHotelDetailImage[]
    facilityIds?: [number]
    facilities: [
      {
        id: number
        name: string
        items: {
          id: number
          name: string
          description: string
        }[]
      },
    ]
    rooms: {
      key?: string
      quantity?: number
      roomType?: {
        code: string
        name: string
        description: string
      }
      fares?: {
        type: string
        code: string
        description: string
        price: {
          currency: string
          amount: number
          coefficient: number
          discounts: [
            {
              code: string
              type: string
              description: string
              amount: number
            },
          ]
        }
        priceNet: {
          currency: string
          amount: number
          coefficient: number
          discounts: [
            {
              code: string
              type: string
              description: string
              amount: number
            },
          ]
        }
        isFareRate: true
      }[]

      boardType?: {
        code: string
        name: string
        externalCode: string
      }
      code: string
      category: string
      description?: string
      cancellationPolicies?: ICancellationPolicies
      checkIn?: Date
      checkOut?: Date
      remarks?: string
      available?: true
      policies?: {
        name: string
        description: string
        type: string
      }[]
      facilities: [
        {
          id?: number
          name?: string
          items: {
            id: number
            name: string
            description?: string
          }[]
        },
      ]
      names?: [
        {
          firstName: string
          lastName: string
          birth: Date
          age: number
          roomNumber: number
          type: string
          document: {
            number: string
            type: string
          }
        },
      ]
    }[]
  }
}

export interface ICancellationPolicies {
  refundable: boolean
  penalties: IPenalty[]
}

export interface IPenalty {
  from: Date
  description: string
  price: Price
}
