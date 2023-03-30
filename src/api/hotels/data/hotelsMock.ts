import { Hotel } from '@models/Hotel'
import { roomsMock } from './roomsMock'

export const hotelsMock: Hotel[] = [
  {
    id: 'remingways-1',
    name: 'Remingways Hotel',
    description:
      'Passar uma temporada na Casa Caiman é ter a chance de fazer uma imersão em um dos cenários mais deslumbrantes do planeta. Afinal, nossa pousada principal ocupa um canto mágico do Pantanal: um terreno com vista para uma baía cinematográfica e cercado...',
    stars: 5,
    images: [
      {
        id: '1',
        url: '/assets/images/bird.png',
      },
      {
        id: '2',
        url: '/assets/images/TravelingBoat.png',
      },
      {
        id: '3',
        url: '/assets/images/package/alligator.png',
      },
    ],
    rooms: roomsMock,
    startDate: new Date('2023-02-10'),
    endDate: new Date('2023-02-14'),
    location: {
      city: {
        name: '',
      },
      state: {
        name: '',
        uf: '',
      },
    },
    metainfos: [
      {
        icon: { src: 'child' },
        description: 'Permite crianças',
      },
      {
        icon: { src: 'room' },
        description: 'Suítes, suítes superiores, suítes master',
      },
    ],
    recommended: true,
  },
  {
    id: 'remingways-2',
    name: 'Remingways Hotel',
    description:
      'Passar uma temporada na Casa Caiman é ter a chance de fazer uma imersão em um dos cenários mais deslumbrantes do planeta. Afinal, nossa pousada principal ocupa um canto mágico do Pantanal: um terreno com vista para uma baía cinematográfica e cercado...',
    stars: 5,
    images: [
      {
        id: '1',
        url: '/assets/images/bird.png',
      },
      {
        id: '2',
        url: '/assets/images/TravelingBoat.png',
      },
      {
        id: '3',
        url: '/assets/images/package/alligator.png',
      },
    ],
    rooms: roomsMock,
    startDate: new Date('2023-02-10'),
    endDate: new Date('2023-02-14'),
    location: {
      city: {
        name: '',
      },
      state: {
        name: '',
        uf: '',
      },
    },
    metainfos: [
      {
        icon: { src: 'child' },
        description: 'Permite crianças',
      },
      {
        icon: { src: 'room' },
        description: 'Suítes, suítes superiores, suítes master',
      },
    ],
    recommended: false,
  },
  {
    id: 'remingways-3',
    name: 'Remingways Hotel',
    description:
      'Passar uma temporada na Casa Caiman é ter a chance de fazer uma imersão em um dos cenários mais deslumbrantes do planeta. Afinal, nossa pousada principal ocupa um canto mágico do Pantanal: um terreno com vista para uma baía cinematográfica e cercado...',
    stars: 5,
    images: [
      {
        id: '1',
        url: '/assets/images/bird.png',
      },
      {
        id: '2',
        url: '/assets/images/TravelingBoat.png',
      },
      {
        id: '3',
        url: '/assets/images/package/alligator.png',
      },
    ],
    rooms: roomsMock,
    startDate: new Date('2023-02-10'),
    endDate: new Date('2023-02-14'),
    location: {
      city: {
        name: '',
      },
      state: {
        name: '',
        uf: '',
      },
    },
    metainfos: [
      {
        icon: { src: 'child' },
        description: 'Permite crianças',
      },
      {
        icon: { src: 'room' },
        description: 'Suítes, suítes superiores, suítes master',
      },
    ],
    recommended: false,
  },
]
