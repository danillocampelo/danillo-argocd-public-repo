export interface FareDto {
  type: string
  price: {
    currency: string
    value: number
    amount: number
  }
}
