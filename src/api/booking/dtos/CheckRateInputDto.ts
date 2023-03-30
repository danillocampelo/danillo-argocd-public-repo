interface Person {
  firstName: string
  lastName: string
  documentType: string
  documentValue: number
  birthDate: string
  ageType: string
}

export interface CheckRateInputDto {
  checkoutMetadata: string // Infotera packageKey received in PackageAvailability
  hotels: {
    id: string
    provider: string
    rooms: {
      id: string
      persons: Person[]
    }[]
  }[]
  flights: {
    ids: string[]
    persons: Person[]
  }[]
}
