export interface getOriginsDTO {
  statusCode: number
  entity: {
    origins: {
      id: number
      name: string
      type: string
      iata: string
      index: number
      iataCode: string
    }[]
  }
}
