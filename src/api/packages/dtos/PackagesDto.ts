export interface PackagesDto {
  id: string
  title: string
  experience: {
    id: string
    name: string
  }
  destination: {
    city: string
    state: string
  }
  packageDefault: {
    days: number
    price: number
    miles?: number
    installments?: {
      number: number
    }
  }
  cover: string
  highlight?: boolean
}
