export class CustomPackageDTO {
  id: number
  destination: CustomPackageDestinationDTO
  packageDefault: CustomPackageDefaultDTO
  cover: {
    url: string
  }
}

export class CustomPackageListDTO {
  mostViews: CustomPackageDTO[]
  hightlights: CustomPackageDTO[]
}

export class CustomPackageDestinationDTO {
  id: number
  name: string
  iataCode: string
}

export class CustomPackageDefaultDTO {
  days: number
  nights: number
  price: number
  miles: number
}
