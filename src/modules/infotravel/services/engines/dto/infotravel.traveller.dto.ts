export interface InfotravelTravellerDTO {
  firstName: string
  lastName: string
  birth: string
  age: number
  type: 'ADT' | 'CHD' | 'INF'
  document: {
    number: number
    type: string
  }
}
