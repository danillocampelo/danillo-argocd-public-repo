import { Hotel } from '@models/Hotel'

export const hotelsMock: Hotel[] = [
  {
    id: 'remingways-1',
    name: 'Remingways Hotel',
    description:
      'Um refúgio ecológico cercado de tranquilidade e luxo. Descubra o melhor da natureza com a estrutura de um hotel de altíssimo padrão',
    price: 100,
    stars: 5,
    nights: 4,
    metainfos: [
      {
        title: 'Permite crianças',
        icon: { src: 'child' },
      },
      {
        title: 'Suítes, suítes superiores, suítes master',
        icon: { src: 'room' },
      },
    ],
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
  },
  {
    id: 'remingways-2',
    name: 'Remingways Hotel',
    description:
      'Passar uma temporada na Casa Caiman é ter a chance de fazer uma imersão em um dos cenários mais deslumbrantes do planeta. Afinal, nossa pousada principal ocupa um canto mágico do Pantanal: um terreno com vista para uma baía cinematográfica e cercado...',
    price: 100,
    stars: 3,
    nights: 4,
    metainfos: [
      {
        title: 'Permite crianças',
        icon: { src: 'child' },
      },
      {
        title: 'Suítes, suítes superiores, suítes master',
        icon: { src: 'room' },
      },
    ],
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
  },
  {
    id: 'remingways-3',
    name: 'Remingways Hotel',
    description:
      'Passar uma temporada na Casa Caiman é ter a chance de fazer uma imersão em um dos cenários mais deslumbrantes do planeta. Afinal, nossa pousada principal ocupa um canto mágico do Pantanal: um terreno com vista para uma baía cinematográfica e cercado...',
    price: 100,
    stars: 4,
    nights: 4,
    metainfos: [
      {
        title: 'Permite crianças',
        icon: { src: 'child' },
      },
      {
        title: 'Suítes, suítes superiores, suítes master',
        icon: { src: 'room' },
      },
    ],
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
  },
]
