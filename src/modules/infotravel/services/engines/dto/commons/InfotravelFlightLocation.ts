export interface InfotravelFlightLocation {
  code: string
  name: string
  city: {
    name: string
    country: {
      code: string
      name: string
    }
  }
}
