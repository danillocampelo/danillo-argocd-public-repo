export interface InfotravelOriginDestinationDTO {
  id: number
  name: string
  type: string
  iata: string
  index: number
  iataCode: string
}

export interface InfotravelSearchEngineDTO {
  origins: InfotravelOriginDestinationDTO[]
  destinations: InfotravelOriginDestinationDTO[]
  periods: [
    {
      start: Date
      endDates: Date[]
    },
  ]
}

export interface InfotravelSearchEnginePeriodsDTO {
  periods: [
    {
      start: Date
      endDates: Date[]
    },
  ]
}
