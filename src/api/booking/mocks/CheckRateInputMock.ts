import { CheckRateInputDto } from '../dtos/CheckRateInputDto'

export const CHECKRATE_INPUT_MOCK: CheckRateInputDto = {
  checkoutMetadata: 'FBYSBELFI%JXCPVTKC5',
  hotels: [
    {
      id: 827306,
      provider: 'OMNIBEES',
      rooms: [
        {
          id: 'FPGS4EOWC%Z2PJLOBFZ',
          persons: [
            {
              firstName: 'Luke',
              lastName: 'Skywalker',
              documentType: 'CPF',
              documentValue: 37281706073,
              birthDate: '1990-01-01',
              ageType: 'adult',
            },
            {
              firstName: 'Leia',
              lastName: 'Skywalker',
              documentType: 'CPF',
              documentValue: 68276367046,
              birthDate: '1990-01-01',
              ageType: 'adult',
            },
          ],
        },
      ],
    },
  ],
  flights: [
    {
      ids: ['BCTTIAT9S%KOKFDDJLF', 'BCTTIAT9S%L7ASZT5N6'],
      persons: [
        {
          firstName: 'Luke',
          lastName: 'Skywalker',
          documentType: 'CPF',
          documentValue: 37281706073,
          birthDate: '1990-01-01',
          ageType: 'adult',
        },
        {
          firstName: 'Leia',
          lastName: 'Skywalker',
          documentType: 'CPF',
          documentValue: 68276367046,
          birthDate: '1990-01-01',
          ageType: 'adult',
        },
      ],
    },
  ],
}
