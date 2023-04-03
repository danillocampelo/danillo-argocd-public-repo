import {Experience} from './package.interface'

interface itinerary {
  subtitle: string
  items: {
    title: string
    image: string
    description: string
  }[]
}

export interface IPackageItinerary {
  subtitle: string
  days: {
    sqDay: number
    name: string
    description: string
    images: string
    passeios?: any
  }[]
}

export interface IPackageOutput {
  id: number
  price: number
  installmentPrice: number
  numberOfInstallments?: number
  isConfigurable?: boolean
  experiences: Experience[]
  title: string
  subtitle: string
  description: string
  images: string[]
  trivia: {
    boldText: string
    text: string
  }[]
  catchphrase: string
  hotel: {
    id: number
    name: string
    description: string
    rating: number
    images: string[]
  }
  itinerary: itinerary
  informationItems: {
    title: string
    description: string
    icon: string
  }[]
}

export interface IPackageByIdOutput {
  id: number
  price: number
  installmentPrice: number
  numberOfInstallments?: number
  isConfigurable?: boolean
  experiences: Experience[]
  title: string
  subtitle: string
  description: string
  images: string[]
  trivia: {
    boldText: string
    text: string
  }[]
  catchphrase: string
  hotel: {
    id: number
    name: string
    description: string
    rating: number
    images: string[]
  }
  itinerary: IPackageItinerary
  informationItems: {
    title: string
    description: string
    icon: string
  }[]
}

export interface IPackagesOutPutList {
  id: number
  title?: string
  experience: {
    id: number
    name: string
  }
  destination?: {
    city: string
  }
  packageDefault?: IpackageDefault
  cover?: {
    url: string
  }
  highlight: boolean
}

interface IpackageDefault {
  days: number
  nights: number
  price: number
  miles: number
}

export interface IPackagesOutPutByIdDetails {
  id: number
  title?: string
  subtitle: string
  experience: {
    id: number
    name: string
  }
  destination?: {
    city: string
  }
  packageDefault?: IpackageDefault
  
  hotel?: {
    stars?: number[]
    name?: string
    description?: string
    facilities?: any[]
    adress?: string
    city?: string
    images?: {
      url: string
    }[],
  }
  metainfos?: {
    icon: string
    title: string
  }[]
  texts: {
    description: string
    type: number
  }[]
  cover?: {url: string}
  highlight: boolean
  images?: {
    url: string
    type: number
  }[]
  itinerary?: {
    day: number
    title: string
    description: string
  }[]
  details: {
    icon: string
    title: string
    description: string
  }[]
}
