import {Fare3} from '~/modules/infotravel/services/availbility/entities/packageAvailbility.entity'

export class ServicePackage {
  id: string
  name: string
  description: string
  fares: Fare3[]
}