import { CheckRateResponseDto } from '../dtos/CheckRateResponseDto'

const CHECKRATE_SUCCESS_RESPONSE_MOCK: CheckRateResponseDto = {
  bookingId: 0,
  persons: ['string'],
  flights: [
    {
      fareTotal: 0,
      flights: [
        {
          airline: {
            code: 'G3',
            name: 'Gol',
          },
          origin: {
            code: 'GRU',
            name: 'GUARULHOS - GOVERNADOR ANDRÉ FRANCO MONTORO INTERNATIONAL AIRPORT',
            city: {
              name: 'string',
              country: {
                code: 'BR',
              },
            },
          },
          destination: {
            code: 'GRU',
            name: 'GUARULHOS - GOVERNADOR ANDRÉ FRANCO MONTORO INTERNATIONAL AIRPORT',
            city: {
              name: 'string',
              country: {
                code: 'BR',
              },
            },
          },
          departure: '2023-02-10T10:20:00.000-03:00',
          arrival: '2023-02-10T10:20:00.000-03:00',
          number: '1170',
          id: 'string',
          duration: '01:45',
          stopsCount: 1,
          segments: [
            {
              classCode: 'J',
              class: 'ECONOMIC',
              baggage: {
                quantity: 0,
              },
            },
          ],
        },
      ],
      policies: [
        {
          name: 'string',
          description: 'string',
          type: 'CANCELLATION',
        },
      ],
    },
  ],
  hotels: [
    {
      hotelDetailId: 'ID for fetching hotel details',
      hotelName: 'Wish Foz do Iguaçu',
      roomCount: 0,
      roomCategories: [],
      travelerCount: 0,
      fareTotal: 0,
      rooms: [
        {
          id: 'string',
          quantity: 0,
          roomType: {
            code: 'string',
            name: 'string',
            description: 'string',
          },
          code: 'string',
          category: 'string',
          description: 'string',
          cancellationPolicies: {
            refundable: true,
            penalties: [
              {
                from: 'string',
                description: 'string',
                price: {
                  currency: 'string',
                  amount: 0,
                  coefficient: 0,
                  discounts: [
                    {
                      code: 'string',
                      type: 'AGE',
                      description: 'string',
                      amount: 0,
                    },
                  ],
                },
              },
            ],
          },
          policies: [
            {
              name: 'string',
              description: 'string',
              type: 'CANCELLATION',
            },
          ],
        },
      ],
    },
  ],
}

export default { CHECKRATE_SUCCESS_RESPONSE_MOCK }
