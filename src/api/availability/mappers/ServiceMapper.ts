import { Service } from '@models/Service'
import {
  calculateTotalFares,
  calculateTotalFees,
} from '@utils/calculateTotalPrice'
import { ServiceDTO } from '../dtos/ServicesDTO'

export type ServiceWithTotals = {
  services: Service[]
  totalFares: number
  totalFees: number
}

export const mapService = (serviceDto: ServiceDTO): Service => {
  return {
    id: serviceDto.id,
    name: serviceDto.name,
    description: serviceDto.description,
    fares: serviceDto.fares.map((fare) => {
      return {
        price: fare.price,
        type: fare.type,
      }
    }),
    totalFares: calculateTotalFares(serviceDto.fares),
    fees: calculateTotalFees(serviceDto.fares),
  }
}

export const mapServices = (servicesDto: ServiceDTO[]): ServiceWithTotals => {
  let totalFares = 0
  let totalFees = 0

  const services = servicesDto.map((serviceDto) => {
    const service = mapService(serviceDto)

    totalFares += service.totalFares
    totalFees += service.fees

    return service
  })

  return {
    services,
    totalFares,
    totalFees,
  }
}
