import { FacilityDto } from '@api/hotels/dtos/FacilityDto'

export interface PackageDto {
  id: number
  title: string
  subtitle: string
  experience: {
    id: number
    name: string
    description?: string
  }
  destination: {
    city: string
  }
  packageDefault: {
    nights: number
    days: number
    price: number
    miles: number
  }
  hotel: {
    stars: number
    name: string
    description: string
    facilities: FacilityDto[]
    images: {
      id?: string
      url: string
    }[]
  }
  metainfos?: {
    icon: string
    title: string
  }[]
  texts: {
    description: string
    type: number // Usado para definir a posição do texto nas telas
  }[]
  cover: { url: string }
  highlight: boolean
  images: {
    //essas imagens deverao vir do nosso banco mesmo?
    id?: string
    url: string
    type: 1 | 2 | 3 | 4 // Usado para definir a posição da imagem nas telas
  }[]
  itinerary: {
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
