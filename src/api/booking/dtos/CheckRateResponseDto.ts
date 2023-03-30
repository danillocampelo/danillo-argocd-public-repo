export interface CheckRateResponseDto {
  bookingId: number
  persons: string[]
  flights: {
    fareTotal: number
    flights: {
      airline: {
        code: string
        name: string
      }
      origin: {
        code: string
        name: string
        city: {
          name: string
          country: {
            code: string
          }
        }
      }
      destination: {
        code: string
        name: string
        city: {
          name: string
          country: {
            code: string
          }
        }
      }
      departure: string
      arrival: string
      number: string
      id: string
      duration: string
      stopsCount: number
      segments: {
        classCode: string
        class: string
        baggage: {
          quantity: number
        }
      }[]
    }[]
    policies: [
      {
        name: string
        description: string
        type: string
      },
    ]
  }[]
  hotels: {
    hotelDetailId: string
    hotelName: string
    roomCount: number
    roomCategories: string[]
    travelerCount: number
    fareTotal: number
    rooms: {
      id: string
      quantity: number
      roomType: {
        code: string
        name: string
        description: string
      }
      code: string
      category: string
      description: string
      cancellationPolicies: {
        refundable: true
        penalties: {
          from: string
          description: string
          price: {
            currency: string
            amount: number
            coefficient: number
            discounts: {
              code: string
              type: string
              description: string
              amount: number
            }[]
          }
        }[]
      }
      policies: {
        name: string
        description: string
        type: string
      }[]
    }[]
  }[]
}
