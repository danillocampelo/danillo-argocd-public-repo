import { useMutation } from 'react-query'
import { checkRate } from '../BookingServiceApi'
import {
  PeopleFormData,
  PersonFormData,
} from '@contexts/CheckoutContext/CheckoutContext'
import { CheckRateInputDto } from '../dtos/CheckRateInputDto'
import dayjs from 'dayjs'
import { CheckRateResponseDto } from '../dtos/CheckRateResponseDto'

const formatPerson = (person: PersonFormData, type: string) => {
  return {
    firstName: person.name,
    lastName: person['last-name'],
    documentType: person.document.type.toUpperCase(),
    documentValue: Number(person.document.value.replace(/[^\d]+/g, '')),
    birthDate: dayjs(person['birth-date']).format('YYYY-MM-DD'),
    ageType: type,
  }
}

export function useCheckRate({
  onSuccess,
  onError,
}: {
  onSuccess?: (res: CheckRateResponseDto) => void
  onError?: () => void
}) {
  return useMutation(
    (input: {
      checkoutMetadata: string
      persons: PeopleFormData
      hotelId: string
      roomIds: string[]
      flightIds: string[]
      hotelProvider: string
    }) => {
      const data: CheckRateInputDto = {
        checkoutMetadata: input.checkoutMetadata,
        hotels: [
          {
            id: input.hotelId,
            provider: input.hotelProvider,
            rooms: input.roomIds.map((roomId, index) => ({
              id: roomId,
              persons: Object.entries(input.persons)
                .map(([peopleType, peopleArray]) =>
                  peopleArray.map((person) => {
                    if (person['person-room'] === index)
                      return formatPerson(person, peopleType)
                  }),
                )[0]
                .filter((obj) => obj),
            })),
          },
        ],
        flights: [
          {
            ids: input.flightIds,
            persons: Object.entries(input.persons).map(
              ([peopleType, peopleArray]) =>
                peopleArray.map((person) => formatPerson(person, peopleType)),
            )[0],
          },
        ],
      }

      return checkRate(data)
    },
    { onSuccess, onError },
  )
}
