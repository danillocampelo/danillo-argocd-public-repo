export interface Coordinates {
  latitude: number
  longitude: number
}

export interface Address {
  address: string
  city: City
  coordinates: Coordinates
}

export interface City {
  name: string
  state?: string
}

export interface Image {
  large: string
  medium: string
  small: string
}

export interface Hotel {
  id: number
  keyDetail: string
  name: string
  address: Address
  stars: number
  images: Image[]
  facilityIds: number[]
}

export interface RoomType {
  code: string
  name: string
  description: string
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

export interface Fare {
  type: string
  description: string
  price: Price
  priceNet: PriceNet
  code: string
  point?: Price
}

export interface BoardType {
  name: string
}

export interface Price2 {
  currency: string
  amount: number
}

export interface Penalty {
  from: Date
  description: string
  percent: number
  price: Price2
}

export interface CancellationPolicies {
  refundable: boolean
  penalties: Penalty[]
}

export interface Name {
  age: number
  roomNumber: number
  type: string
}

export interface Room {
  key: string
  roomType: RoomType
  fares: Fare[]
  boardType: BoardType
  cancellationPolicies: CancellationPolicies
  checkIn: string
  checkOut: string
  available: boolean
  names: Name[]
}

export interface RoomGroup {
  rooms: Room[]
}

export interface HotelAvail {
  provider: string
  checkIn: string
  checkOut: string
  hotel: Hotel
  roomGroups: RoomGroup[]
}

export interface Airline {
  code: string
  name: string
}

export interface Country {
  code: string
  name: string
}

export interface City {
  name: string
  state?: string
  country: Country
}

export interface Origin {
  code: string
  name: string
  city: City
}

export interface Country2 {
  code: string
  name: string
}

export interface City2 {
  name: string
  state?: string
  country: Country2
}

export interface Destination {
  code: string
  name: string
  city: City2
}

export interface Airline2 {
  code: string
  name: string
}

export interface Country3 {
  code: string
  name: string
}

export interface City3 {
  name: string
  country: Country3
}

export interface Origin2 {
  code: string
  name: string
  city: City3
}

export interface Country4 {
  code: string
  name: string
}

export interface City4 {
  name: string
  country: Country4
}

export interface Destination2 {
  code: string
  name: string
  city: City4
}

export interface Baggage {
  quantity: number
}

export interface Segment {
  airline: Airline2
  origin: Origin2
  destination: Destination2
  number: string
  departure: Date
  arrival: Date
  classCode: string
  baggage: Baggage
  class: string
}

export interface Price3 {
  currency: string
  amount: number
  exchange: number
}

export interface PriceNet2 {
  currency: string
  amount: number
}

export interface Fare2 {
  type: string
  price: Price3
  priceNet?: PriceNet2
  description?: string
  point?: Price
}

export interface Flight {
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
  fares: Fare2[]
}

export interface Route {
  numberRoute: number
  flights: Flight[]
}

export interface Name2 {
  age: number
  type: string
}

export interface FlightAvail {
  routes: Route[]
  names: Name2[]
}

export interface ServicePackage {
  key: string
  code: string
  name: string
  date: Date
  description: string
  unique: boolean
}

export interface Price4 {
  currency: string
  amount: number
  exchange: number
}

export interface PriceNet3 {
  currency: string
  amount: number
}

export interface Fare3 {
  type: string
  price: Price4
  priceNet: PriceNet3
}

export interface Name3 {
  age: number
  type: string
}

export interface ServicePackageAvail {
  servicePackage: ServicePackage
  fares: Fare3[]
  names: Name3[]
}

export interface Tour {
  key: string
  name: string
  code: string
  date: Date
  description: string
  unique: boolean
}

export interface Price5 {
  currency: string
  amount: number
  exchange: number
}

export interface PriceNet4 {
  currency: string
  amount: number
}

export interface Fare4 {
  type: string
  price: Price5
  priceNet: PriceNet4
}

export interface Name4 {
  age: number
  type: string
}

export interface TourAvail {
  tour: Tour
  fares: Fare4[]
  names: Name4[]
}

export interface Image2 {
  large: string
  medium: string
  small: string
}

export interface Package {
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
  images: Image2[]
}

export interface PackageAvail {
  hotelAvails: HotelAvail[]
  flightAvails: FlightAvail[]
  servicePackageAvails: ServicePackageAvail[]
  tourAvails: TourAvail[]
  transferAvails: any
  serviceOtherAvails: any
  ticketAvails: any
  insuranceAvails: any
  package: Package
}

export interface PackageAvailResponse {
  packageAvails: PackageAvail[]
  message: string
}

export interface PackageDetailsResponse {
  id: string
  name: string
  description: string
  observation: string
  roadMap: RoadMap[]
  images: ImagePackageDetail[]
  destinations: DestinationPackageDetail[]
}

export interface RoadMap {
  sqDay: number
  name: string
  description: string
}

export interface ImagePackageDetail {
  big: string
  average: string
  small: string
}

export interface DestinationPackageDetail {
  destination: {
    id: number
    name: string
    type: string
  }
  packageServices: PackageServiceDetail[]
  packageHotels: PackageHotelDetail[]
}

export interface PackageServiceDetail {
  name: string
  type: string
  includedType: string
  day: number
  code: string
  provider: string
}

export interface PackageHotelDetail {
  id: number
  name: string
}
