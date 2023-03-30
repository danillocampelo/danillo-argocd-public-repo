export interface ServiceDTO {
  id: string
  name: string
  description: string
  fares: {
    type: string
    code?: string
    price: {
      amount: number
      currency?: string
    }
  }[]
}
