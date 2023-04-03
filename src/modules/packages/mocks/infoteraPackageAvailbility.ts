export const packageInfoTera = {
  packageAvails: [
    {
      hotelAvails: [
        {
          provider: 'INFOTRAVEL',
          hotel: {
            id: 1,
            keyDetail: 'LTEzNQ==',
            description:
              'Se hospedar na Casa Caiman é aproveitar cada segundo de um refúgio ecológico cercado de verde, que une aventura, conforto e hospitalidade de luxo sustentável.',
            stars: 4.5,
            name: 'Casa Caiman',
            address: {
              zipcode: '59010020',
              address: 'Rua Feliciano Coelho',
              number: '121',
              complement: '',
              city: {
                name: 'NATAL',
                state: 'RN',
                country: {
                  code: 'BR',
                  name: 'BRASIL',
                },
              },
              neighborhood: 'Praia do Meio',
              coordinates: {
                latitude: -5.7784389,
                longitude: -35.1946108,
              },
            },
            images: [
              {
                large: '/assets/images/bird.png',
                medium: '/assets/images/bird.png',
                small: '/assets/images/bird.png',
              },
            ],
          },
          roomGroups: [
            {
              rooms: [
                {
                  key: 'N5QNP1DXR%OFHHJOLAG',
                  roomType: {
                    code: '1',
                    name: 'STANDARD',
                    description: 'descrição de teste do quarto',
                  },
                  fares: [
                    {
                      type: 'FARE',
                      price: {
                        currency: 'BRL',
                        amount: 960.0,
                      },
                      priceNet: {
                        currency: 'BRL',
                        amount: 720.0,
                      },
                    },
                  ],
                  boardType: {
                    code: '2',
                    name: 'CAFÉ DA MANHÃ',
                  },
                  cancellationPolicies: {
                    refundable: true,
                    penalties: [
                      {
                        from: '2022-11-23T00:00:00.000-03:00',
                        description:
                          'Para cancelamentos a partir de 1 dia antes do checkin será cobrada multa de 10%.',
                        price: {
                          currency: 'BRL',
                          amount: 72.0,
                        },
                      },
                    ],
                  },
                  checkIn: '2022-11-24',
                  checkOut: '2022-12-03',
                  available: true,
                  names: [
                    {
                      age: 30,
                      type: 'ADT',
                    },
                  ],
                },
                {
                  key: 'N5QNP1DXR%T9TTIWAOO',
                  roomType: {
                    code: '1',
                    name: 'STANDARD',
                    description: 'descrição de teste do quarto',
                  },
                  fares: [
                    {
                      type: 'FARE',
                      price: {
                        currency: 'BRL',
                        amount: 1200.0,
                      },
                      priceNet: {
                        currency: 'BRL',
                        amount: 900.0,
                      },
                    },
                  ],
                  boardType: {
                    code: '1',
                    name: 'ALL INCLUSIVE',
                  },
                  cancellationPolicies: {
                    refundable: true,
                    penalties: [
                      {
                        from: '2022-11-23T00:00:00.000-03:00',
                        description:
                          'Para cancelamentos a partir de 1 dia antes do checkin será cobrada multa de 10%.',
                        price: {
                          currency: 'BRL',
                          amount: 90.0,
                        },
                      },
                    ],
                  },
                  checkIn: '2022-11-24',
                  checkOut: '2022-12-03',
                  available: true,
                  names: [
                    {
                      age: 30,
                      type: 'ADT',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      flightAvails: [
        {
          routes: [
            {
              numberRoute: 1,
              flights: [
                {
                  key: 'GDZHHFLVU%JZAWTGDKY',
                  airline: {
                    code: 'G3',
                    name: 'GOL',
                  },
                  origin: {
                    code: 'GRU',
                    name: 'GUARULHOS - GOVERNADOR ANDRÉ FRANCO MONTORO INTERNATIONAL AIRPORT',
                    city: {
                      name: 'São Paulo',
                      country: {
                        code: 'BR',
                        name: '',
                      },
                    },
                  },
                  destination: {
                    code: 'NAT',
                    name: 'GOVERNADOR ALUÍZIO ALVES INTERNATIONAL AIRPORT',
                    city: {
                      name: 'Natal',
                      country: {
                        code: 'BR',
                        name: '',
                      },
                    },
                  },
                  departure: '2022-11-24T08:00:00.000-03:00',
                  arrival: '2022-11-24T11:30:00.000-03:00',
                  number: '123',
                  duration: '03:30',
                  stopsCount: 0,
                  available: true,
                  segments: [
                    {
                      airline: {
                        code: 'G3',
                        name: 'GOL',
                      },
                      origin: {
                        code: 'GRU',
                        name: 'GUARULHOS - GOVERNADOR ANDRÉ FRANCO MONTORO INTERNATIONAL AIRPORT',
                        city: {
                          name: 'São Paulo',
                          country: {
                            code: 'BR',
                            name: '',
                          },
                        },
                      },
                      destination: {
                        code: 'NAT',
                        name: 'GOVERNADOR ALUÍZIO ALVES INTERNATIONAL AIRPORT',
                        city: {
                          name: 'Natal',
                          country: {
                            code: 'BR',
                            name: '',
                          },
                        },
                      },
                      number: '123',
                      departure: '2022-11-24T08:00:00.000-03:00',
                      arrival: '2022-11-24T11:30:00.000-03:00',
                      classCode: '',
                      baggage: {
                        quantity: 1,
                        weight: 23,
                      },
                      class: 'ECONOMIC',
                    },
                  ],
                  fares: [
                    {
                      type: 'FARE',
                      price: {
                        currency: 'BRL',
                        amount: 133.33,
                      },
                      priceNet: {
                        currency: 'BRL',
                        amount: 100.0,
                      },
                    },
                    {
                      type: 'BOARDING_RATE',
                      description: 'Taxa de embarque',
                      price: {
                        currency: 'BRL',
                        amount: 49.9,
                      },
                    },
                  ],
                },
              ],
            },
            {
              numberRoute: 2,
              flights: [
                {
                  key: 'GDZHHFLVU%7JP2QBH0G',
                  airline: {
                    code: 'G3',
                    name: 'GOL',
                  },
                  origin: {
                    code: 'NAT',
                    name: 'GOVERNADOR ALUÍZIO ALVES INTERNATIONAL AIRPORT',
                    city: {
                      name: 'Natal',
                      country: {
                        code: 'BR',
                        name: '',
                      },
                    },
                  },
                  destination: {
                    code: 'GRU',
                    name: 'GUARULHOS - GOVERNADOR ANDRÉ FRANCO MONTORO INTERNATIONAL AIRPORT',
                    city: {
                      name: 'São Paulo',
                      country: {
                        code: 'BR',
                        name: '',
                      },
                    },
                  },
                  departure: '2022-12-03T16:00:00.000-03:00',
                  arrival: '2022-12-03T19:45:00.000-03:00',
                  number: '124',
                  duration: '03:45',
                  stopsCount: 0,
                  available: true,
                  segments: [
                    {
                      airline: {
                        code: 'G3',
                        name: 'GOL',
                      },
                      origin: {
                        code: 'NAT',
                        name: 'GOVERNADOR ALUÍZIO ALVES INTERNATIONAL AIRPORT',
                        city: {
                          name: 'Natal',
                          country: {
                            code: 'BR',
                            name: '',
                          },
                        },
                      },
                      destination: {
                        code: 'GRU',
                        name: 'GUARULHOS - GOVERNADOR ANDRÉ FRANCO MONTORO INTERNATIONAL AIRPORT',
                        city: {
                          name: 'São Paulo',
                          country: {
                            code: 'BR',
                            name: '',
                          },
                        },
                      },
                      number: '124',
                      departure: '2022-12-03T16:00:00.000-03:00',
                      arrival: '2022-12-03T19:45:00.000-03:00',
                      classCode: '',
                      baggage: {
                        quantity: 1,
                        weight: 23,
                      },
                      class: 'ECONOMIC',
                    },
                  ],
                  fares: [
                    {
                      type: 'FARE',
                      price: {
                        currency: 'BRL',
                        amount: 133.33,
                      },
                      priceNet: {
                        currency: 'BRL',
                        amount: 100.0,
                      },
                    },
                    {
                      type: 'BOARDING_RATE',
                      description: 'Taxa de embarque',
                      price: {
                        currency: 'BRL',
                        amount: 49.9,
                      },
                    },
                  ],
                },
              ],
            },
          ],
          names: [
            {
              age: 30,
              type: 'ADT',
            },
          ],
        },
      ],
      servicePackageAvails: [
        {
          servicePackage: {
            key: '7NOOPHULS%BZRJ9NV7H',
            code: 'Transfer teste',
            name: '3',
            date: '2022-11-24T00:00:00.000-03:00',
            description: 'teste',
            unique: false,
            image: {
              large:
                '//media.infotravel.com.br/image/upload/c_crop,h_480,w_800/4A88FEA88D61FB419898E29C9A2B0484.png',
              medium:
                '//media.infotravel.com.br/image/upload/c_thumb,h_225,w_375/4A88FEA88D61FB419898E29C9A2B0484.png',
              small:
                '//media.infotravel.com.br/image/upload/c_thumb,h_115,w_185/4A88FEA88D61FB419898E29C9A2B0484.png',
            },
          },
          fares: [
            {
              type: 'FARE',
              price: {
                currency: 'BRL',
                amount: 240.0,
              },
              priceNet: {
                currency: 'BRL',
                amount: 180.0,
              },
            },
          ],
          names: [
            {
              age: 30,
              type: 'ADT',
            },
          ],
        },
      ],
      tourAvails: [
        {
          tour: {
            key: '7NOOPHULS%FXLOXOGAU',
            name: 'Safári',
            code: '1',
            date: '2022-11-24T00:00:00.000-03:00',
            description: 'expedição em carro aberto em meio à vida selvagem',
            unique: false,
            image: {
              large:
                '//media.infotravel.com.br/image/upload/c_crop,h_480,w_800/0C4735F0F66E9C3EFCFD14C6EF48F3C6.png',
              medium: '/assets/images/bird.png',
              small:
                '//media.infotravel.com.br/image/upload/c_thumb,h_115,w_185/0C4735F0F66E9C3EFCFD14C6EF48F3C6.png',
            },
          },
          fares: [
            {
              type: 'FARE',
              price: {
                currency: 'BRL',
                amount: 66.67,
              },
              priceNet: {
                currency: 'BRL',
                amount: 50.0,
              },
            },
          ],
          names: [
            {
              age: 30,
              type: 'ADT',
            },
          ],
        },
        {
          tour: {
            key: '7NOOPHULS%FXLOXOGAU',
            name: 'Caiman Tour',
            code: '1',
            date: '2022-11-24T00:00:00.000-03:00',
            description: 'um mergulho na cultura pantaneira',
            unique: false,
            image: {
              large:
                '//media.infotravel.com.br/image/upload/c_crop,h_480,w_800/0C4735F0F66E9C3EFCFD14C6EF48F3C6.png',
              medium: '/assets/images/bird.png',
              small:
                '//media.infotravel.com.br/image/upload/c_thumb,h_115,w_185/0C4735F0F66E9C3EFCFD14C6EF48F3C6.png',
            },
          },
          fares: [
            {
              type: 'FARE',
              price: {
                currency: 'BRL',
                amount: 66.67,
              },
              priceNet: {
                currency: 'BRL',
                amount: 50.0,
              },
            },
          ],
          names: [
            {
              age: 30,
              type: 'ADT',
            },
          ],
        },
        {
          tour: {
            key: '7NOOPHULS%FXLOXOGAU',
            name: 'Focagem noturna',
            code: '1',
            date: '2022-11-24T00:00:00.000-03:00',
            description: 'contemplando o silêncio e as espécies da noite',
            unique: false,
            image: {
              large:
                '//media.infotravel.com.br/image/upload/c_crop,h_480,w_800/0C4735F0F66E9C3EFCFD14C6EF48F3C6.png',
              medium: '/assets/images/bird.png',
              small:
                '//media.infotravel.com.br/image/upload/c_thumb,h_115,w_185/0C4735F0F66E9C3EFCFD14C6EF48F3C6.png',
            },
          },
          fares: [
            {
              type: 'FARE',
              price: {
                currency: 'BRL',
                amount: 66.67,
              },
              priceNet: {
                currency: 'BRL',
                amount: 50.0,
              },
            },
          ],
          names: [
            {
              age: 30,
              type: 'ADT',
            },
          ],
        },
        {
          tour: {
            key: '7NOOPHULS%FXLOXOGAU',
            name: 'Expedição fotográfica',
            code: '1',
            date: '2022-11-24T00:00:00.000-03:00',
            description: 'com um fotógrafo profissional',
            unique: false,
            image: {
              large:
                '//media.infotravel.com.br/image/upload/c_crop,h_480,w_800/0C4735F0F66E9C3EFCFD14C6EF48F3C6.png',
              medium: '/assets/images/bird.png',
              small:
                '//media.infotravel.com.br/image/upload/c_thumb,h_115,w_185/0C4735F0F66E9C3EFCFD14C6EF48F3C6.png',
            },
          },
          fares: [
            {
              type: 'FARE',
              price: {
                currency: 'BRL',
                amount: 66.67,
              },
              priceNet: {
                currency: 'BRL',
                amount: 50.0,
              },
            },
          ],
          names: [
            {
              age: 30,
              type: 'ADT',
            },
          ],
        },
      ],
      package: {
        key: 'FIPLDBWSB%VNFLZX5UK',
        id: 1,
        name: 'PACOTE TESTE',
        description: 'Descrição de teste do pacote',
        observation: '',
        origin: 'São Paulo, Região Sudeste, Brasil',
        destination: 'Natal, Região Nordeste, Brasil',
        days: 10,
        nights: 9,
        start: '2022-11-24',
        end: '2022-12-03',
        images: [
          {
            large: '/assets/images/bird.png',
            medium: '/assets/images/bird.png',
            small: '/assets/images/bird.png',
          },
        ],
        roadMap: [
          {
            sqDay: 1,
            name: 'PRIMEIRO DIA',
            description: 'PRIMEIRO DIA',
          },
          {
            sqDay: 2,
            name: 'SEGUNDO DIA',
            description: 'SEGUNDO DIA',
          },
          {
            sqDay: 3,
            name: 'TERCEIRO DIA',
            description: 'TERCEIRO DIA',
          },
        ],
      },
    },
  ],
}
