import {DetailType} from '~/modules/database/entity/itemDetail.entity'
import {
  IinfoteraPackageById,
  IUtilityHotelDetail,
} from '../../infotravel/infotravel.interfaces'
import {IPackageWithRelations, Status} from '../interfaces/package.interface'

const images = [
  {
    big: 'http://s3.imagem',
    average: 'http://s3.imagem',
    small: 'http://s3.imagem',
  },
]
export const mockInfotera: IinfoteraPackageById = {
  id: 35,
  title: 'PACOTE GRAMADO E CANELA - TESTE',
  description:
    '<p style="line-height: 150%; margin-top: 0pt; margin-bottom: 0pt; margin-left: 0in; text-align: left; direction: ltr; unicode-bidi: embed; word-break: normal;"><span style="font-family: Arial; font-weight: bold;"><span style="color: rgb(124, 124, 124);">Inclui</span><span style="color: rgb(124, 124, 124);">:</span></span></p><div style="line-height: 150%; margin-top: 0pt; margin-bottom: 0pt; margin-left: 0.31in; text-indent: -0.31in; text-align: left; direction: ltr; unicode-bidi: embed; word-break: normal;"><span style="font-family: Arial;">•<span style="color: rgb(124, 124, 124);">Aéreo ida e volta via Porto Alegre;</span></span></div><div style="line-height: 150%; margin-top: 0pt; margin-bottom: 0pt; margin-left: 0.31in; text-indent: -0.31in; text-align: left; direction: ltr; unicode-bidi: embed; word-break: normal;"><span style="font-family: Arial;">•<span style="color: rgb(124, 124, 124);">05 noites de hospedagem com regime mencionado;</span></span></div><div style="line-height: 150%; margin-top: 0pt; margin-bottom: 0pt; margin-left: 0.31in; text-indent: -0.31in; text-align: left; direction: ltr; unicode-bidi: embed; word-break: normal;"><span style="font-family: Arial;">•<span style="color: rgb(124, 124, 124);">Transporte privativo em carroexecutivo aeroporto/hotel/aeroporto;</span></span></div><div style="line-height: 150%; margin-top: 0pt; margin-bottom: 0pt; margin-left: 0.31in; text-indent: -0.31in; text-align: left; direction: ltr; unicode-bidi: embed; word-break: normal;"><span style="font-family: Arial;">•<span style="color: rgb(124, 124, 124);">Experiência privativa no Pé daCascata do Caracol com Brunch Italiano na casa da Vó Ivone;</span></span></div><div style="line-height: 150%; margin-top: 0pt; margin-bottom: 0pt; margin-left: 0.31in; text-indent: -0.31in; text-align: left; direction: ltr; unicode-bidi: embed; word-break: normal;"><span style="font-family: Arial;">•<span style="color: rgb(124, 124, 124);">Experiência privativa no ParqueOlivas de Gramado para contemplar o por do sol mais lindo da Serra Gaúcha;</span></span></div><div style="line-height: 150%; margin-top: 0pt; margin-bottom: 0pt; margin-left: 0.31in; text-indent: -0.31in; text-align: left; direction: ltr; unicode-bidi: embed; word-break: normal;"><span style="font-family: Arial;">•<span style="color: rgb(124, 124, 124);">Ganhe 1 milha a cada 1 real gasto</span><span style="color: rgb(124, 124, 124);">.</span></span></div>',
  observation: 'NÃO TEM',
  images,
  roadMap: [
    {sqDay: 1, name: 'DIA 1', description: 'XXXXXXXXXXXXXXXXXXXXXXXXX', images},
    {
      sqDay: 2,
      name: 'DIA 2 ',
      description: 'XXXXXXXXXXXXXXXXXXXXXXXXX',
      images,
    },
    {sqDay: 3, name: 'DIA 3', description: 'XXXXXXXXXXXXXXXXXXXXX', images},
    {sqDay: 4, name: 'DIA 4', description: 'XXXXXXXXXXXXXXXXXXXXX', images},
  ],
  destinations: [
    {
      destination: {
        id: 111320,
        name: 'Foz do Iguaçu, Região Sul, Brasil',
        type: 'M',
        iata: 'RIO',
      },
      packageServices: [
        {
          name: 'Bustour Illumination Show - O melhor do Natal em Gramado e Canela!!!!',
          type: 'TOUR',
          includedType: 'INCLUDED',
          day: 1,
          code: '8619',
          integrator: 'LOCALTRIP',
          provider: 'BROCKER TURISMO',
        },
      ],
      packageHotels: [
        {
          id: 1952707,
          name: 'Jangal Das Araucárias Swan Design Hotel',
          keyDetail: 'MTk1MjcwNyMxMCMxNTM1Ng==',
        },
        {
          id: 1952707,
          name: 'Jangal Das Araucárias Swan Design Hotel',
          keyDetail: 'MTk1MjcwNyMxMCMxNTM1Ng==',
        },
      ],
      days: 2,
      nights: 2,
    },
  ],
}
export const mockInternal: IPackageWithRelations = {
  id: 1,
  title: 'Pantanal',
  subtitle: 'Descubra os encanto',
  itinerarySubtitle: null,
  description:
    'O Pantanal é um verdadeiro santuário ecológico da biodiversidade brasileira. Um lugar único, mágico, de contemplação e descobertas, onde podemos imergir na vida selvagem, sem grades ou jaulas.',
  catchphrase:
    'Um espetáculo da natureza, na maior planície alagada que agora você poderá desfrutar com muita exclusividade',
  catchphraseIcon: '1233',
  highlight: false,
  externalDescription: 'O Pantanal',
  externalId: '35',
  destination: '2289',
  destinationType: 'M',
  occupancy: '1',
  startDate: new Date('2023-01-18T17:15:59.779Z'),
  endDate: new Date('2023-01-18T17:15:59.779Z'),
  status: Status.ACTIVE,
  trivia: [{id: 1, text: 'mil km² de extensão', boldText: '195'}],
  itemDetail: [
    {
      id: 1,
      icon: '123',
      title: 'teste',
      description: 'tete',
      type: DetailType.DETAIL_TRIP,
    },
  ],
  experiences: [{id: 1, name: 'Aventure-se', description: ''}],
}
export const mockHotel: IUtilityHotelDetail = {
  hotel: {
    name: 'Jangal Das Araucarias Swan Design Hotel Canela',
    description:
      'Viva uma experiência Uma experiência sensorial completa em um design hotel localizado em Canela, ponto turístico da Serra Gaúcha.  Sustentabilidade, sofisticação e exclusividade são os pilares desse novo conceito em hospitalidade.',
    address: {
      zipcode: '95680-000',
      address: 'R. Nagibe Galdino da Rosa, 253 ',
      city: {name: 'Canela', country: {name: 'Brasil'}},
      coordinates: {latitude: -29.3597882, longitude: -50.8212603},
    },
    stars: 5,
    highlight: '',
    images: [
      {
        large: 'https://media.omnibees.com/Images/15356/Property/926445.jpg',
        medium: 'https://media.omnibees.com/Images/15356/Property/926445.jpg',
        small: 'https://media.omnibees.com/Images/15356/Property/926445.jpg',
      },
      {
        large: 'https://media.omnibees.com/Images/15356/Property/877697.jpg',
        medium: 'https://media.omnibees.com/Images/15356/Property/877697.jpg',
        small: 'https://media.omnibees.com/Images/15356/Property/877697.jpg',
      },
    ],
    facilities: [
      {
        id: 1,
        name: 'Hotel',
        items: [
          {id: 0, name: 'Serviços/Sala de Bagagem', description: ''},
          {id: 1, name: 'Berço disponível a pedido', description: ''},
          {id: 2, name: 'Quartos para Deficientes', description: ''},
          {
            id: 3,
            name: 'Aceita os principais cartões de crédito',
            description: '',
          },
          {id: 4, name: 'Equipe Poliglota', description: ''},
          {
            id: 5,
            name: 'Acessibilidade para Cadeira de Rodas',
            description: '',
          },
          {id: 6, name: 'Serviço de limpeza diário', description: ''},
          {id: 7, name: 'Recepção 24 horas', description: ''},
          {id: 8, name: 'Estacionamento Gratuito', description: ''},
          {id: 9, name: 'Garagem paga', description: ''},
          {id: 10, name: 'Posto de Turismo', description: ''},
          {id: 11, name: 'Bar', description: ''},
          {id: 12, name: 'Restaurante', description: ''},
          {id: 13, name: 'Restaurante Publico', description: ''},
          {id: 14, name: 'Piscina Interior', description: ''},
          {id: 15, name: 'Parquinho', description: ''},
          {id: 16, name: 'Elevador', description: ''},
          {id: 17, name: 'Free Wifi', description: ''},
          {id: 18, name: 'Babá a Pedido', description: ''},
          {id: 19, name: 'Academia gratuita', description: ''},
          {id: 20, name: 'Massagens a Pedido', description: ''},
        ],
      },
    ],
    rooms: [
      {
        code: '91084',
        category: 'Suite Araucária',
        facilities: [
          {
            items: [
              {id: 2, name: 'Ar Condicionado'},
              {id: 99, name: 'Área de Estar'},
              {id: 92, name: 'Cofre'},
              {id: 7, name: 'Varanda'},
              {id: 115, name: '220 AC'},
              {id: 117, name: '220 DC'},
              {id: 74, name: 'Apartamento para não Fumantes'},
              {id: 54, name: 'Acesso a internet'},
              {id: 123, name: 'Internet Wireless'},
              {id: 31, name: 'Telefone com linha directa'},
              {id: 88, name: 'Frigobar'},
              {id: 11, name: 'Artigos para Banheiro'},
              {id: 13, name: 'Banheira'},
              {id: 142, name: 'Ducha'},
              {id: 50, name: 'Secador de cabelo'},
              {id: 85, name: 'Banheiro privado'},
              {id: 251, name: 'Televisão'},
              {id: 18, name: 'TV a Cabo'},
              {id: 90, name: 'Tv com controle Remoto'},
              {id: 116, name: 'Serviço de Despertar'},
              {id: 41, name: 'Lareira'},
            ],
          },
        ],
      },
      {
        code: '91085',
        category: 'Apartamento Jangal',
        facilities: [
          {
            items: [
              {id: 2, name: 'Ar Condicionado'},
              {id: 107, name: 'Telefone'},
              {id: 92, name: 'Cofre'},
              {id: 115, name: '220 AC'},
              {id: 117, name: '220 DC'},
              {id: 74, name: 'Apartamento para não Fumantes'},
              {id: 54, name: 'Acesso a internet'},
              {id: 123, name: 'Internet Wireless'},
              {id: 31, name: 'Telefone com linha directa'},
              {id: 88, name: 'Frigobar'},
              {id: 11, name: 'Artigos para Banheiro'},
              {id: 142, name: 'Ducha'},
              {id: 50, name: 'Secador de cabelo'},
              {id: 85, name: 'Banheiro privado'},
              {id: 251, name: 'Televisão'},
              {id: 246, name: 'Tv de tela Plano / Plasma / LCD'},
              {id: 18, name: 'TV a Cabo'},
              {id: 90, name: 'Tv com controle Remoto'},
              {id: 116, name: 'Serviço de Despertar'},
              {id: 39, name: 'Berço'},
            ],
          },
        ],
      },
    ],
  },
}
