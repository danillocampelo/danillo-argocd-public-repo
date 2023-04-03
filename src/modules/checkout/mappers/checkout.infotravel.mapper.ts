import {Injectable} from '@nestjs/common'
import {
  CheckRatesInputDto,
  PersonAgeType,
} from '~/modules/checkout/dto/checkrate.input.dto'
import {InfotravelNamesDocumentType} from '../../infotravel/services/engines/dto/commons/InfotravelNamesDocumentType'
import {InfotravelNamesType} from '../../infotravel/services/engines/dto/commons/InfotravelNamesType'
import {
  InfotravelCheckratesInputBodyDTO,
  InfotravelCheckratesOutputBodyDTO,
  Room,
} from '../../infotravel/services/engines/dto/infotravel.checkrates.engine.dto'
import {DocumentType, HotelProvider} from '../dto/checkrate.input.dto'
import {PersonDTO} from '../dto/person.dto'
import {
  CheckRatesDTO,
  FlightRateDTO,
  HotelRateDTO,
  RoomRateDTO,
} from './../dto/checkrate.dto'

import {ReservationData} from '~/modules/booking/dto/booking.reservation.input.dto'
import {InfotravelCheckRatesRoomDTO} from '~/modules/infotravel/services/engines/dto/infotravel.booking.reservation.dto'

@Injectable()
export class CheckoutInfotravelMapper {
  mapCheckRatesInputToInfotravel(
    input: CheckRatesInputDto,
    infoteraClientId: number,
  ) {
    const mapped: InfotravelCheckratesInputBodyDTO = {
      booking: {
        clientId: infoteraClientId,
        bookingPackages: [
          {
            package: {
              key: input.checkoutMetadata,
            },
            bookingHotels: input.hotels
              .map((hotel) => {
                return [
                  {
                    hotel: {
                      id: hotel.id,
                    },
                    rooms: hotel.rooms.map((room, roomIndex) => ({
                      key: room.id,
                      names: room.persons.map((person) => ({
                        ...this.mapPerson(person),
                        roomNumber: roomIndex + 1,
                      })),
                    })),
                  },
                ]
              })
              .flat(),
            bookingFlights: input.flights.map((flight) => ({
              names: flight.persons.map((person) => this.mapPerson(person)),
              flights: flight.ids.map((id) => ({
                key: id,
              })),
            })),
            bookingTransfers: input.transfers?.map((transfer) => ({
              dateSelected: transfer.date.substring(0, 10),
              transfer: {
                key: transfer.id,
                name: transfer.name,
                date: transfer.date,
                description: transfer.description,
                type: transfer.type,
                unique: transfer.unique,
                code: transfer.code,
                segments: transfer.segments,
              },
              names: transfer.persons.map((person) => this.mapPerson(person)),
            })),
            bookingTickets: input.tickets?.map((ticket) => ({
              ticket: {
                key: ticket.id,
              },
              modalitie: {
                code: ticket.code,
                name: ticket.name,
                date: {
                  start: ticket.start,
                  end: ticket.end,
                  description: ticket.description,
                  price: ticket.fares.find((a) => a.type === 'FARE')?.price
                    ?.amount,
                },
              },
              names: ticket.persons.map((person) => this.mapPerson(person)),
            })),
            bookingInsurances: input.insurances?.map((insurance) => ({
              insurance: {
                key: insurance.id,
              },
              names: insurance.persons.map((person) => this.mapPerson(person)),
            })),
            bookingServiceOthers: input.serviceOthers?.map((serviceOther) => ({
              other: {
                key: serviceOther.id,
              },
              names: serviceOther.persons.map((person) =>
                this.mapPerson(person),
              ),
            })),
            bookingServicePackages: input.servicePackages?.map(
              (servicePackage) => ({
                servicePackage: {
                  key: servicePackage.id,
                },
                names: servicePackage.persons.map((person) =>
                  this.mapPerson(person),
                ),
              }),
            ),
            bookingTours: input.tours?.map((tour) => ({
              tour: {
                key: tour.id,
              },
              names: tour.persons.map((person) => this.mapPerson(person)),
            })),
          },
        ],
      },
    }

    return mapped
  }

  getAge(birthDate: Date) {
    const today = new Date()
    let age = today.getFullYear() - birthDate.getFullYear()
    const m = today.getMonth() - birthDate.getMonth()
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  mapPersonAgeType(personAgeType: PersonAgeType) {
    switch (personAgeType) {
      case PersonAgeType.Adult:
        return InfotravelNamesType.ADT
      case PersonAgeType.Child:
        return InfotravelNamesType.CHD
      case PersonAgeType.Infant:
        return InfotravelNamesType.INF
      default:
        throw new Error(`'Person age type ${personAgeType} not valid'`)
    }
  }

  mapDocumentType(documentType: DocumentType) {
    switch (documentType) {
      case DocumentType.CPF:
        return InfotravelNamesDocumentType.CPF
      case DocumentType.RG:
        return InfotravelNamesDocumentType.RG
      default:
        throw new Error(`'Document type type ${documentType} not valid'`)
    }
  }

  mapPerson(person: PersonDTO) {
    const birthtoDate = new Date(person.birthDate)
    return {
      firstName: person.firstName,
      lastName: person.lastName,
      birth: birthtoDate.toISOString().split('T')[0],
      age: this.getAge(birthtoDate),
      type: this.mapPersonAgeType(person.ageType),
      document: {
        type: this.mapDocumentType(person.documentType),
        number: person.documentValue,
      },
    }
  }

  mapRooms(rooms: Room[]) {
    return rooms.map((room) => {
      const {key, ...roomRest} = room
      return {
        id: key,
        ...roomRest,
      }
    })
  }

  mapInfotravelCheckrateToEntity(
    input: CheckRatesInputDto,
    infotravelOutput: InfotravelCheckratesOutputBodyDTO,
  ) {
    const dto = new CheckRatesDTO()
    dto.bookingId = infotravelOutput.booking.id
    dto.persons = Object.values(
      [
        ...input.flights.map((f) => f.persons).flat(),
        ...input.hotels.map((h) => h.rooms.map((r) => r.persons).flat()).flat(),
      ].reduce(
        (acc, curr) => ({
          ...acc,
          [curr.documentValue]: curr,
        }),
        {},
      ),
    )
    let flightRates: FlightRateDTO[] = []
    let hotelRates: HotelRateDTO[] = []
    infotravelOutput.booking.bookingPackages.forEach((bPackage) => {
      flightRates = bPackage.bookingFlights.map((bookingFlight) => {
        const flightRate = new FlightRateDTO()
        flightRate.fareTotal = bookingFlight.fares.reduce((acc, curr) => {
          return acc + (curr.price.amount || 0)
        }, 0)
        flightRate.policies = bookingFlight.policies
        flightRate.flights = bookingFlight.flights.map((infotravelFlight) => {
          const flight: any = {
            id: infotravelFlight.key,
            ...infotravelFlight,
          }
          return flight
        })
        return flightRate
      })

      hotelRates = bPackage.bookingHotels.map((bookingHotel) => {
        const hotelRate = new HotelRateDTO()
        hotelRate.fareTotal = bookingHotel.rooms.reduce(
          (accFareTotal, curr) => {
            return (
              accFareTotal +
              curr.fares.reduce((accRoomFare, currRoomFare) => {
                return accRoomFare + (currRoomFare.price.amount || 0)
              }, 0)
            )
          },
          0,
        )
        hotelRate.roomCount = bookingHotel.rooms.length
        hotelRate.hotelName = bookingHotel.hotel.name
        hotelRate.hotelDetailId = bookingHotel.hotel.keyDetail
        hotelRate.adress = bookingHotel.hotel.address.address
        hotelRate.city = bookingHotel.hotel.address.city.name
        hotelRate.rooms = this.mapRooms(bookingHotel.rooms)
        hotelRate.roomCategories = bookingHotel.rooms.map(
          (room) => room.roomType.code,
        )
        hotelRate.travelerCount = dto.persons.length
        return hotelRate
      })
    })

    dto.flights = flightRates
    dto.hotels = hotelRates

    const reservationData: ReservationData = {
      bookingId: infotravelOutput.booking.id,
      packageKey: infotravelOutput.booking.bookingPackages[0].package.key,
      bookingHotels:
        infotravelOutput.booking.bookingPackages[0].bookingHotels.map((a) => {
          return {
            id: input.hotels[0].id,
            rooms: a.rooms.map((a) => {
              return {
                key: a.key,
                names: a.names,
              }
            }),
          }
        }),
      bookingFlights: [
        {
          flights:
            infotravelOutput.booking.bookingPackages[0].bookingFlights[0].flights.map(
              (a) => {
                return {
                  key: a.key,
                }
              },
            ),
          names:
            infotravelOutput.booking.bookingPackages[0].bookingFlights[0].names,
        },
      ],
      bookingTransfers:
        infotravelOutput.booking.bookingPackages[0].bookingTransfers?.map(
          (a) => {
            return {
              transfer: a.transfer,
              names: a.names,
            }
          },
        ),
      bookingTours:
        infotravelOutput.booking.bookingPackages[0].bookingTours?.map((a) => {
          return {
            tour: {
              key: a.tour.key,
            },
            names: a.names,
          }
        }),
      bookingInsurances:
        infotravelOutput.booking.bookingPackages[0].bookingInsurances?.map(
          (a) => {
            return {
              insurance: {
                key: a.insurance.key,
              },
              names: a.names,
            }
          },
        ),
      bookingServicePackages:
        infotravelOutput.booking.bookingPackages[0].bookingServicePackages?.map(
          (a) => {
            return {
              servicePackage: {
                key: a.servicePackage.key,
              },
              names: a.names,
            }
          },
        ),
      bookingTickets:
        infotravelOutput.booking.bookingPackages[0].bookingTickets?.map((a) => {
          return {
            ticket: a.ticket,
            names: a.names,
          }
        }),
      bookingServiceOthers:
        infotravelOutput.booking.bookingPackages[0].bookingServiceOthers?.map(
          (a) => {
            return {
              other: {
                key: a.other.key,
              },
              names: a.names,
            }
          },
        ),
    }

    dto.reservationData = JSON.stringify(reservationData)
    return dto
  }
}
