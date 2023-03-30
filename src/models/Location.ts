export interface Country {
  name: string
}

export interface Location {
  zipCode?: string
  address?: string
  number?: number
  complement?: string
  district?: {
    name: string
  }
  city: {
    name: string
  }
  state: {
    name: string
    uf: string
  }
  country?: Country
  iata?: {
    name: string
  }
}
