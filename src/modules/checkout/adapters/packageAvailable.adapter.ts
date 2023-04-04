import {Injectable, Logger} from '@nestjs/common'
import {InfotravelService} from '~/modules/infotravel/infotravel.service'
import {
  Flight,
  FlightAvail,
  Hotel,
  HotelAvail,
  Package,
  PackageAvail,
  ServicePackageAvail,
} from '~/modules/infotravel/services/availbility/entities/packageAvailbility.entity'
import {AvailbilityDTO} from '../dto/availbility.dto'
import {FareType} from '../dto/fare.dto'
import {FlightDTO, FlightsDTO} from '../dto/flight.dto'
import {EtinararyAvail, HotelAvailDTO} from '../dto/hotelAvail.dto'

enum ROUTE_INDEX {
  depart = 0,
  return = 1,
}
@Injectable()
export class PackageAvailAdapter {
  constructor(private readonly infotravelService: InfotravelService) {}

  async packageAvailToCheckout({
    hotelAvails,
    flightAvails,
    package: packageAvailable,
    servicePackageAvails,
    serviceOtherAvails,
    ticketAvails,
    tourAvails,
    transferAvails,
    insuranceAvails,
  }: PackageAvail): Promise<AvailbilityDTO> {
    return {
      checkoutMetadata: packageAvailable.key,
      hotels: await this.hotelToHotelDTO(hotelAvails, packageAvailable),
      flights: PackageAvailAdapter.flightToFlightsDTO(flightAvails),
      itinerary: await this.itineraryToItineraryDTO(packageAvailable),
      servicePackages:
        this.servicePackageAvailsToServicePackage(servicePackageAvails),
      tickets: this.ticketsAvailsToTickets(ticketAvails),
      tours: this.toursAvailsToTours(tourAvails),
      serviceOthers: this.serviceOtherAvailsToServiceOther(serviceOtherAvails),
      transfers: this.transferAvailsToTranfers(transferAvails),
      insurances: this.insuranceAvailsToInsurance(insuranceAvails),
    }
  }

  ticketsAvailsToTickets(ticketAvails: any) {
    return ticketAvails?.map(({ticket, fares}) => {
      return {
        id: ticket.key,
        ...ticket,
        fares,
      }
    })
  }

  insuranceAvailsToInsurance(insuranceAvails: any) {
    return insuranceAvails?.map(({insurance, fares}) => {
      return {
        id: insurance.key,
        fares,
      }
    })
  }
  transferAvailsToTranfers(transferAvails: any) {
    return transferAvails?.map(({transfer, fares, type}) => {
      return {
        id: transfer.key,
        ...transfer,
        type,
        fares,
      }
    })
  }

  serviceOtherAvailsToServiceOther(serviceOtherAvails: any) {
    return serviceOtherAvails?.map(({other, fares}) => {
      return {
        id: other?.key,
        name: other?.name,
        description: other?.description,
        fares,
      }
    })
  }

  toursAvailsToTours(tourAvails: any) {
    return tourAvails?.map(({tour, fares}) => {
      return {
        id: tour?.key,
        name: tour?.name,
        description: tour?.description,
        fares,
      }
    })
  }

  async hotelAvailToHotelDTO(
    hotelsAvails: HotelAvail[],
  ): Promise<HotelAvailDTO[]> {
    const hasRoomGroups = hotelsAvails[0]?.roomGroups

    return await Promise.all(
      hotelsAvails.map(
        async ({checkIn, checkOut, hotel, roomGroups, provider}) => {
          const hotel_detail = await this.getHotel_Detail(hotel)
          const diffDays = Math.abs(
            (new Date(checkOut) as any) - (new Date(checkIn) as any),
          )
          const days = Math.ceil(diffDays / (1000 * 3600 * 24))
          return {
            id: hotel.id,
            available: true,
            provider: provider,
            name: hotel_detail?.hotel?.name || hotel.name,
            stars: hotel_detail?.hotel?.stars || hotel.stars,
            checkIn,
            checkOut,
            description: hotel_detail?.hotel?.description || '',
            images: this.hotelImagesDTO(hotel_detail ? hotel_detail : hotel),
            location: this.hotelAvailLocationDTO(
              hotel_detail ? hotel_detail : hotel,
            ),
            days: days,
            rooms: hasRoomGroups
              ? this.roomToDTO(
                  roomGroups,
                  this.getBestFare(hotelsAvails),
                  hotel_detail,
                )
              : [],
            facilities: hotel_detail
              ? this.facilitiesDTO(hotel_detail)
              : hotel?.facilityIds?.map((f) => {
                  return {id: f, title: ''}
                }),
          }
        },
      ),
    )
  }

  private async getHotel_Detail(hotel: Hotel) {
    try {
      return await this.infotravelService._get(
        `/utility/hotelDetail/${hotel.keyDetail}`,
      )
    } catch (error) {
      Logger.error('getHotel_Detail', error)
      return false
    }
  }

  private hotelImagesDTO(hotel_detail: any): any {
    const images = hotel_detail?.hotel?.images || hotel_detail?.images
    return images?.map(({large, ...img}) => ({
      big: large,
      ...img,
    }))
  }

  private hotelAvailLocationDTO(hotel_detail: any): {adress: any; city: any} {
    return {
      adress:
        hotel_detail?.hotel?.address?.address || hotel_detail?.address.address,
      city:
        hotel_detail?.hotel?.address?.city?.name ||
        hotel_detail?.address?.city.name,
    }
  }

  roomToDTO(roomGroups, best_fare, hotel_detail) {
    return roomGroups
      .map(({rooms}) => {
        return rooms.map(
          ({available, key, roomType, cancellationPolicies, fares}) => {
            return {
              id: key,
              available,
              recommended: this.isRecommended(best_fare, fares),
              name: roomType.name,
              refoundable: cancellationPolicies.refundable,
              cancellationPolicies:
                this.cancellationPoliciesDTO(cancellationPolicies),
              fares: this.roomfaresToDTO(fares),
              facilities: this.roomToDTOFacilities(hotel_detail, roomType),
            }
          },
        )
      })
      .flat()
  }

  roomToDTOFacilities(hotel_detail, roomType) {
    if (!hotel_detail?.hotel?.rooms.find(({code}) => code === roomType.code)) {
      return {}
    }
    return hotel_detail?.hotel?.rooms
      .find(({code}) => code === roomType.code)
      .facilities[0].items.map(({name, id}) => {
        return {
          id: id,
          title: name,
        }
      })
  }

  roomfaresToDTO(fares) {
    return fares.map(({type, price, point}) => {
      return {
        type: type,
        price: {
          currency: price.currency,
          amount: price.amount,
        },
        point,
      }
    })
  }

  cancellationPoliciesDTO(cancellationPolicies) {
    return {
      penalties: cancellationPolicies.penalties.map((penalty) => {
        const {description, percent, price} = penalty
        return {
          description,
          ...(percent && {percent}),
          ...(price && {price}),
        }
      }),
    }
  }

  facilitiesDTO(hotel_detail) {
    return hotel_detail?.hotel?.facilities?.[0]?.items?.map(({name, id}) => {
      return {
        id: id,
        title: name,
      }
    })
  }

  async hotelToHotelDTO(
    hotelsAvails: HotelAvail[],
    packageAvailable: Package,
  ): Promise<HotelAvailDTO[]> {
    const best_fare = this.getBestFare(hotelsAvails)

    return await Promise.all(
      hotelsAvails.map(
        async ({checkIn, checkOut, hotel, roomGroups, provider}) => {
          const hotel_detail = await this.infotravelService._get(
            `/utility/hotelDetail/${hotel.keyDetail}`,
          )
          return {
            id: hotel.id,
            available: true,
            provider: provider,
            name: hotel_detail?.hotel?.name || hotel.name,
            stars: hotel_detail?.hotel?.stars || hotel.stars,
            checkIn,
            checkOut,
            description: hotel_detail?.hotel?.description,
            images: this.hotelImagesDTO(hotel_detail),
            location: this.hotelAvailLocationDTO(hotel_detail),
            days: packageAvailable?.nights,
            rooms: this.roomToDTO(roomGroups, best_fare, hotel_detail),
            facilities: this.facilitiesDTO(hotel_detail),
          }
        },
      ),
    )
  }

  static flightToFlightsDTO(flights: FlightAvail[]): FlightsDTO[] {
    const recommended = this.flightRecommended(flights)
    return flights.map<FlightsDTO>((flight) => {
      return {
        depart: this.flightsFormat(
          flight.routes[ROUTE_INDEX.depart].flights,
          recommended.flightRecommendDepart,
        ),
        return: this.flightsFormat(
          flight.routes[ROUTE_INDEX.return].flights,
          recommended.flightRecommendReturn,
        ),
      }
    })
  }

  servicePackageAvailsToServicePackage(
    servicePackageAvail: ServicePackageAvail[],
  ) {
    return servicePackageAvail?.map(({servicePackage, fares}) => {
      return {
        id: servicePackage?.key,
        name: servicePackage?.name,
        description: servicePackage?.description,
        fares,
      }
    })
  }

  static flightsFormat(
    flights: Flight[],
    recommended: {key: string; durationMinutes: number},
  ): FlightDTO[] {
    return flights.map<FlightDTO>((flight) => {
      return {
        key: flight.key,
        airline: {
          code: flight.airline.code,
          name: flight.airline.name,
        },
        origin: {
          location: {
            iata: flight.origin.code,
            city: flight.origin.city.name,
          },
        },
        destination: {
          location: {
            iata: flight.destination.code,
            city: flight.destination.city.name,
          },
        },
        stops: flight.stopsCount,
        duration: this.convertHourToMinutes(flight.duration),
        departure: flight.departure,
        arrival: flight.arrival,
        number: flight.airline.code.trim() + flight.number.trim(),
        recommended: flight.key === recommended.key ? true : false,
        fares: flight.fares.map(({type, price, point}) => {
          return {
            type: FareType[type],
            price: {
              currency: price.currency,
              amount: price.amount,
            },
            point,
          }
        }),
        info: [],
      }
    })
  }

  async itineraryToItineraryDTO(
    packageAvail: Package,
  ): Promise<EtinararyAvail[]> {
    const {roadMap} = await this.infotravelService.infoTravelSearchPackageById(
      packageAvail.id,
    )
    const result = roadMap.map(({name, description}) => {
      return {
        title: name,
        description,
      }
    })

    return result
  }

  static convertHourToMinutes(timeInHour): number {
    const [hours, minutes] = timeInHour.split(':').map(Number)
    const durationMinutes = hours * 60 + minutes
    return durationMinutes
  }

  static flightRecommended(flights: FlightAvail[]) {
    const durationDepartAcc = []
    const durationReturnAcc = []
    flights.forEach((flight) => {
      const durationdepart = this.mapDurationKeyMinutes(
        flight.routes[ROUTE_INDEX.depart].flights,
      )
      durationDepartAcc.push(durationdepart)

      const durationreturn = this.mapDurationKeyMinutes(
        flight.routes[ROUTE_INDEX.return].flights,
      )
      durationReturnAcc.push(durationreturn)
    })

    return {
      flightRecommendDepart: this.fightMinDuration(durationDepartAcc.flat()),
      flightRecommendReturn: this.fightMinDuration(durationReturnAcc.flat()),
    }
  }

  static mapDurationKeyMinutes(flights: Flight[]) {
    return flights.map((a) => {
      const durationMinutes = this.convertHourToMinutes(a.duration)
      return {
        key: a.key,
        durationMinutes: durationMinutes,
      }
    })
  }

  static fightMinDuration(
    flightsDuration: {key: string; durationMinutes: number}[],
  ) {
    const durations = flightsDuration.map((a) => a.durationMinutes)
    const minDuration = Math.min(...durations)
    const flightRecommended = flightsDuration.find(
      (a) => a.durationMinutes === minDuration,
    )
    return flightRecommended
  }

  getBestFare(hotelsAvails: HotelAvail[]) {
    return Math.min(
      ...hotelsAvails
        .map(({roomGroups}) => {
          return roomGroups
            .map(({rooms}) => {
              return rooms
                .map(({fares}) => {
                  return fares.find(({type}) => type === 'FARE').price.amount
                })
                .flat()
            })
            .flat()
        })
        .flat(),
    )
  }

  isRecommended(best_fare: number, fares: any): boolean {
    if (fares.find(({type}) => type === 'FARE').price.amount <= best_fare)
      return true

    return false
  }
}
