import { Room } from '@models/Room'
import { Order } from '@models/Order'
import { Person } from '@models/Person'
import { Metainfo } from '@models/Metainfo'
import { CardBrands, PaymentMethod, PaymentStatuses } from '@models/Payment'
import { getFacilityIcon } from '@utils/getFacilityIcon'
import { OrderDto } from '../dtos/OrderDto'

export const OrderMapper = (orderDto: OrderDto): Order => {
  const mappedRooms: Room[] = orderDto.rooms.map((room, index) => ({
    id: `room-${index}`,
    title: room.title,
    startDate: new Date(orderDto.firstCheckIn),
    duration: orderDto.duration,
    price: {
      amount: 0,
    },
    images: [
      {
        src: orderDto.hotels[0].image,
      },
    ],
    guests: room.travellers.map(
      (traveller): Partial<Person> => ({
        name: traveller.name,
        type: traveller.type,
      }),
    ),
    metainfos: room.facilities.map(
      (facility): Metainfo => ({
        title: facility.name,
        description: facility.description,
        icon: {
          id: String(facility.id),
          src: getFacilityIcon(facility.id),
        },
      }),
    ),
  }))

  return {
    id: orderDto.id,
    startDate: new Date(orderDto.firstCheckIn),
    duration: orderDto.duration,
    package: {
      id: orderDto.package.id,
      title: orderDto.package.name,
      destination: {
        city: { name: orderDto.destination },
        state: {
          uf: '',
          name: '',
        },
      },
      cover: {
        id: '',
        /**
         * @todo: add baseUrl
         */
        src: `${orderDto.package.image}`,
      },
    },
    flights: orderDto.flights.map((flight) => ({
      type: flight.type,
      departureDate: new Date(flight.date),
      route: {
        from: {
          iata: {
            name: flight.origin,
          },
          city: {
            name: '',
          },
          state: {
            uf: '',
            name: '',
          },
        },
        to: {
          iata: {
            name: flight.destination,
          },
          city: {
            name: '',
          },
          state: {
            uf: '',
            name: '',
          },
        },
      },
    })),
    /**
     * @todo: check back-end return when available and map
     */
    payment: [
      {
        id: 'payment-id-1',
        date: new Date(),
        cardBrand: CardBrands.MASTERCARD,
        method: PaymentMethod.CREDIT_CARD,
        status: PaymentStatuses.AUTHORIZED,
        cardLastDigits: '1234',
        installments: 3,
        price: {
          amount: 10500,
          currency: 'BRL',
        },
      },
    ],
    hotels: orderDto.hotels.map((hotel) => ({
      id: '',
      name: hotel.title,
      description: hotel.description,
      stars: hotel.stars || 0,
      location: {
        city: { name: '' },
        state: { name: '', uf: '' },
      },
      images: [
        {
          id: 'hotel-img-1',
          src: '',
          url: hotel.image,
        },
      ],
      metainfos: hotel.facilities.map(
        (facility): Metainfo => ({
          title: facility.name,
          description: facility.description,
          icon: {
            id: String(facility.id),
            src: getFacilityIcon(facility.id),
          },
        }),
      ),
      rooms: mappedRooms,
    })),
    rooms: mappedRooms,
    people: orderDto.travellers.map((traveller) => ({
      type: traveller.type,
      name: traveller.name,
    })),
  }
}
