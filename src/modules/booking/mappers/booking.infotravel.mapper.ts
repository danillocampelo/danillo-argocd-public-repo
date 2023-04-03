import {Injectable} from '@nestjs/common'

@Injectable()
export class BookingInfotravelMapper {
  mapBookingReservationInputToInfotravel(
    input: any,
    clientId: number,
    paymentId: string,
  ) {
    const result = {
      booking: {
        id: input.bookingId,
        clientId,
        payments: [
          {
            type: 'CREDIT_CARD',
            brand: 'VISA',
            installment: {
              value: 1,
            },
            holderName: '***',
            cardNumber: '****************',
            securityCode: '***',
            expirationMonth: '**',
            expirationYear: '****',
            authorizationNumber: paymentId,
            status: 'CAPTURED',
            client: {
              clientId: clientId,
            },
            value: {
              currency: 'BRL',
              amount: 1,
            },
          },
        ],
        bookingPackages: [
          {
            package: {
              key: input.packageKey,
            },
            bookingHotels: input.bookingHotels.map((a) => {
              return {
                hotel: {
                  id: a.id,
                },
                rooms: a.rooms,
              }
            }),
            bookingFlights: input.bookingFlights,
            bookingTransfers: input.bookingTransfers,
            bookingTours: input.bookingTours,
            bookingInsurances: input.bookingInsurances,
            bookingServicePackages: input.bookingServicePackages,
            bookingTickets: input.bookingTickets,
            bookingServiceOthers: input.bookingServiceOthers,
          },
        ],
      },
    }
    return result
  }
}
