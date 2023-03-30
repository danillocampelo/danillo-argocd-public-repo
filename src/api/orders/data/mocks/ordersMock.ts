import { OrderDto, TravelerDto } from '@api/orders/dtos/OrderDto'
import { FlightType } from '@models/Flight'
import { PersonType } from '@models/Person'

const mockedTravelers: TravelerDto[] = [
  {
    name: 'GROSELIA MARIA',
    type: PersonType.ADULT,
  },
  {
    name: 'PAULO PAGAN',
    type: PersonType.ADULT,
  },
  {
    name: 'ANA PAGAN',
    type: PersonType.CHILD,
  },
]

type Props = {
  previous: OrderDto[]
  next: OrderDto[]
}

export const ordersMock: Props = {
  previous: [
    {
      id: '1307',
      package: {
        id: '31',
        name: 'PACOTE GRAMADO E CANELA - TESTE',
        image:
          '//media.infotravel.com.br/image/upload/D085805B426AF37CDF2874AE458E8E57.jpg',
      },
      firstCheckIn: new Date('2023-11-26T00:00:00.000Z'),
      duration: 7,
      destination: 'Canela, Região Sul, Brasil',
      travellers: mockedTravelers,
      hotels: [
        {
          image:
            'https://i.travelapi.com/lodging/13000000/12340000/12334000/12333930/24222666_z.jpg',
          title: 'Hilton Garden Inn Miami Dolphin Mall',
          description:
            "Não perca as atividades de recreação, como um centro de bem-estar 24 horas e uma piscina externa. Este hotel oferece comodidades adicionais, como Wi-Fi de cortesia e salão de baile.<br/><br/>Saboreie uma deliciosa refeição no Flamingo Grille ou hospede-se no local e aproveite o serviço de quarto (horário limitado) deste hotel. Mate sua sede com sua bebida favorita em um bar/lounge. Um café da manhã feito na hora é servido durante a semana, entre 6h e 10h30, e nos fins de semana, entre 6h30 e 11h, mediante uma taxa.<br/><br/>As comodidades presentes incluem um business center 24 horas, check-out expresso e serviço de lavanderia e lavagem a seco. Este hotel possui instalações para eventos com 511 metros quadrados, incluindo espaço para conferência, e é o local ideal para quem está planejando eventos em Miami. Estacionamento grátis sem manobrista está disponível no local.<br/><br/>Sinta-se em casa em um de nossos 140 quartos com geladeiras e micro-ondas. As TVs LCD 50 polegadas com programas via satélite garantem sua diversão e o Wi-Fi de cortesia mantém você conectado. Banheiros possuem chuveiros e produtos de toalete de cortesia. As comodidades incluem cofres para notebook e escrivaninhas, além de telefones com chamadas locais grátis.<br/><br/>As distâncias são apresentadas em números inteiros. <br /> <p>Dolphin Mall - 0,5 km <br /> Miami International Mall - 1,2 km <br /> Florida International University - 4,6 km <br /> Frost Art Museum - 5,2 km <br /> Ocean Bank Convocation Center - 5,4 km <br /> Fair Expo Center - 6 km <br /> CityPlace Doral - 6,4 km <br /> Campo de golfe Blue Monster - 6,8 km <br /> Kendall Regional Medical Center - 7,9 km <br /> Área de compras de Coral Way - 8,2 km <br /> Miami Airport Convention Center - 8,6 km <br /> Sky zone -Miami - 9,4 km <br /> Waterford at Blue Lagoon - 9,6 km <br /> Nicklaus Children's Hospital Foundation - 11,2 km <br /> Tropical Park - 11,6 km <br /> </p><p>Os aeroportos mais próximos são:<br />Aeroporto Internacional de Miami (MIA) – 16 km<br /> Aeroporto Internacional de Fort Lauderdale - Hollywood (FLL) – 53,8 km<br /> Aeroporto Opa Locka Executive (OPF) – 28,4 km<br /> Miami, FL (MPB-Public Seaplane Base) – 22,8 km<br /> </p><p></p><br/><br/>No centro financeiro em Miami, Hilton Garden Inn Miami Dolphin Mall fica a apenas 15 minutos de caminhada de Dolphin Mall e de Miami International Mall.  Este hotel fica a 17,4 km de Universidade de Miami e a 17,6 km de Dadeland Mall.<br/><br/>Próximo a Dolphin Mall",
          facilities: [],
          rooms: [
            {
              title: 'Quarto, 2 camas Queen',
              description: 'Quarto, 2 camas Queen - 2 camas Queen',
              facilities: [
                {
                  id: 6176,
                  name: 'Para não fumantes',
                },
                {
                  id: 1073744691,
                  name: 'Kit de acessibilidade para telefone',
                },
                {
                  id: 26,
                  name: 'TV',
                },
              ],
              travellers: [mockedTravelers[0]],
            },
            {
              title: 'Quarto, 2 camas Queen',
              description: 'Quarto, 2 camas Queen - 2 camas Queen',
              facilities: [
                {
                  id: 6176,
                  name: 'Para não fumantes',
                },
                {
                  id: 1073744691,
                  name: 'Kit de acessibilidade para telefone',
                },
                {
                  id: 26,
                  name: 'TV',
                },
              ],
              travellers: [mockedTravelers[1]],
            },
            {
              title: 'Quarto, 2 camas Queen',
              description: 'Quarto, 2 camas Queen - 2 camas Queen',
              facilities: [
                {
                  id: 6176,
                  name: 'Para não fumantes',
                },
                {
                  id: 1073744691,
                  name: 'Kit de acessibilidade para telefone',
                },
                {
                  id: 26,
                  name: 'TV',
                },
              ],
              travellers: [mockedTravelers[2]],
            },
          ],
        },
      ],
      rooms: [
        {
          title: 'Quarto, 2 camas Queen',
          description: 'Quarto, 2 camas Queen - 2 camas Queen',
          facilities: [
            {
              id: 6176,
              name: 'Para não fumantes',
            },
            {
              id: 1073744691,
              name: 'Kit de acessibilidade para telefone',
            },
            {
              id: 26,
              name: 'TV',
            },
          ],
          travellers: [mockedTravelers[0]],
        },
        {
          title: 'Quarto, 2 camas Queen',
          description: 'Quarto, 2 camas Queen - 2 camas Queen',
          facilities: [
            {
              id: 6176,
              name: 'Para não fumantes',
            },
            {
              id: 1073744691,
              name: 'Kit de acessibilidade para telefone',
            },
            {
              id: 26,
              name: 'TV',
            },
          ],
          travellers: [mockedTravelers[1]],
        },
        {
          title: 'Quarto, 2 camas Queen',
          description: 'Quarto, 2 camas Queen - 2 camas Queen',
          facilities: [
            {
              id: 6176,
              name: 'Para não fumantes',
            },
            {
              id: 1073744691,
              name: 'Kit de acessibilidade para telefone',
            },
            {
              id: 26,
              name: 'TV',
            },
          ],
          travellers: [mockedTravelers[2]],
        },
      ],
      flights: [
        {
          origin: 'GRU',
          destination: 'FOR',
          date: new Date('2023-01-14T10:00:00.000Z'),
          type: FlightType.DEPART,
        },
        {
          origin: 'FOR',
          destination: 'GRU',
          date: new Date('2023-01-21T11:00:00.000Z'),
          type: FlightType.RETURN,
        },
      ],
    },
  ],
  next: [
    {
      id: '1307',
      package: {
        id: '31',
        name: 'PACOTE GRAMADO E CANELA - TESTE',
        image:
          '//media.infotravel.com.br/image/upload/D085805B426AF37CDF2874AE458E8E57.jpg',
      },
      firstCheckIn: new Date('2023-11-26T00:00:00.000Z'),
      duration: 7,
      destination: 'Canela, Região Sul, Brasil',
      travellers: mockedTravelers,
      hotels: [
        {
          image:
            'https://i.travelapi.com/lodging/13000000/12340000/12334000/12333930/24222666_z.jpg',
          title: 'Hilton Garden Inn Miami Dolphin Mall',
          description:
            "Não perca as atividades de recreação, como um centro de bem-estar 24 horas e uma piscina externa. Este hotel oferece comodidades adicionais, como Wi-Fi de cortesia e salão de baile.<br/><br/>Saboreie uma deliciosa refeição no Flamingo Grille ou hospede-se no local e aproveite o serviço de quarto (horário limitado) deste hotel. Mate sua sede com sua bebida favorita em um bar/lounge. Um café da manhã feito na hora é servido durante a semana, entre 6h e 10h30, e nos fins de semana, entre 6h30 e 11h, mediante uma taxa.<br/><br/>As comodidades presentes incluem um business center 24 horas, check-out expresso e serviço de lavanderia e lavagem a seco. Este hotel possui instalações para eventos com 511 metros quadrados, incluindo espaço para conferência, e é o local ideal para quem está planejando eventos em Miami. Estacionamento grátis sem manobrista está disponível no local.<br/><br/>Sinta-se em casa em um de nossos 140 quartos com geladeiras e micro-ondas. As TVs LCD 50 polegadas com programas via satélite garantem sua diversão e o Wi-Fi de cortesia mantém você conectado. Banheiros possuem chuveiros e produtos de toalete de cortesia. As comodidades incluem cofres para notebook e escrivaninhas, além de telefones com chamadas locais grátis.<br/><br/>As distâncias são apresentadas em números inteiros. <br /> <p>Dolphin Mall - 0,5 km <br /> Miami International Mall - 1,2 km <br /> Florida International University - 4,6 km <br /> Frost Art Museum - 5,2 km <br /> Ocean Bank Convocation Center - 5,4 km <br /> Fair Expo Center - 6 km <br /> CityPlace Doral - 6,4 km <br /> Campo de golfe Blue Monster - 6,8 km <br /> Kendall Regional Medical Center - 7,9 km <br /> Área de compras de Coral Way - 8,2 km <br /> Miami Airport Convention Center - 8,6 km <br /> Sky zone -Miami - 9,4 km <br /> Waterford at Blue Lagoon - 9,6 km <br /> Nicklaus Children's Hospital Foundation - 11,2 km <br /> Tropical Park - 11,6 km <br /> </p><p>Os aeroportos mais próximos são:<br />Aeroporto Internacional de Miami (MIA) – 16 km<br /> Aeroporto Internacional de Fort Lauderdale - Hollywood (FLL) – 53,8 km<br /> Aeroporto Opa Locka Executive (OPF) – 28,4 km<br /> Miami, FL (MPB-Public Seaplane Base) – 22,8 km<br /> </p><p></p><br/><br/>No centro financeiro em Miami, Hilton Garden Inn Miami Dolphin Mall fica a apenas 15 minutos de caminhada de Dolphin Mall e de Miami International Mall.  Este hotel fica a 17,4 km de Universidade de Miami e a 17,6 km de Dadeland Mall.<br/><br/>Próximo a Dolphin Mall",
          facilities: [],
          rooms: [
            {
              title: 'Quarto, 2 camas Queen',
              description: 'Quarto, 2 camas Queen - 2 camas Queen',
              facilities: [
                {
                  id: 6176,
                  name: 'Para não fumantes',
                },
                {
                  id: 1073744691,
                  name: 'Kit de acessibilidade para telefone',
                },
                {
                  id: 26,
                  name: 'TV',
                },
              ],
              travellers: [mockedTravelers[0]],
            },
            {
              title: 'Quarto, 2 camas Queen',
              description: 'Quarto, 2 camas Queen - 2 camas Queen',
              facilities: [
                {
                  id: 6176,
                  name: 'Para não fumantes',
                },
                {
                  id: 1073744691,
                  name: 'Kit de acessibilidade para telefone',
                },
                {
                  id: 26,
                  name: 'TV',
                },
              ],
              travellers: [mockedTravelers[1]],
            },
            {
              title: 'Quarto, 2 camas Queen',
              description: 'Quarto, 2 camas Queen - 2 camas Queen',
              facilities: [
                {
                  id: 6176,
                  name: 'Para não fumantes',
                },
                {
                  id: 1073744691,
                  name: 'Kit de acessibilidade para telefone',
                },
                {
                  id: 26,
                  name: 'TV',
                },
              ],
              travellers: [mockedTravelers[2]],
            },
          ],
        },
      ],
      rooms: [
        {
          title: 'Quarto, 2 camas Queen',
          description: 'Quarto, 2 camas Queen - 2 camas Queen',
          facilities: [
            {
              id: 6176,
              name: 'Para não fumantes',
            },
            {
              id: 1073744691,
              name: 'Kit de acessibilidade para telefone',
            },
            {
              id: 26,
              name: 'TV',
            },
          ],
          travellers: [mockedTravelers[0]],
        },
        {
          title: 'Quarto, 2 camas Queen',
          description: 'Quarto, 2 camas Queen - 2 camas Queen',
          facilities: [
            {
              id: 6176,
              name: 'Para não fumantes',
            },
            {
              id: 1073744691,
              name: 'Kit de acessibilidade para telefone',
            },
            {
              id: 26,
              name: 'TV',
            },
          ],
          travellers: [mockedTravelers[1]],
        },
        {
          title: 'Quarto, 2 camas Queen',
          description: 'Quarto, 2 camas Queen - 2 camas Queen',
          facilities: [
            {
              id: 6176,
              name: 'Para não fumantes',
            },
            {
              id: 1073744691,
              name: 'Kit de acessibilidade para telefone',
            },
            {
              id: 26,
              name: 'TV',
            },
          ],
          travellers: [mockedTravelers[2]],
        },
      ],
      flights: [
        {
          origin: 'GRU',
          destination: 'FOR',
          date: new Date('2023-01-14T10:00:00.000Z'),
          type: FlightType.DEPART,
        },
        {
          origin: 'FOR',
          destination: 'GRU',
          date: new Date('2023-01-21T11:00:00.000Z'),
          type: FlightType.RETURN,
        },
      ],
    },
  ],
}
