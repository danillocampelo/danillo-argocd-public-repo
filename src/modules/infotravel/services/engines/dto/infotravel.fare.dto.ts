export interface InfotravelFareDTO {
  type: 'FARE' | 'BOARDING_RATE'
  description?: string
  price: InfotravelPriceDTO
  priceNet?: InfotravelPriceDTO
}

export interface InfotravelPriceDTO {
  currency: string
  amount: number
  exchange: number
}
