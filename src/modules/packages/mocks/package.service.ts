export const packageMock = [
  {
    id: 1,
    price: 10500,
    installmentPrice: 1750,
    numberOfInstallments: 6,
    isConfigurable: true,
    experiences: [{name: 'Aventure-se', id: 1}],
    title: 'Pantanal',
    subtitle: 'Descubra os encantos',
    description:
      'O Pantanal é um verdadeiro santuário ecológico da biodiversidade brasileira. Um lugar único, mágico, de contemplação e descobertas, onde podemos imergir na vida selvagem, sem grades ou jaulas.',
    images: [
      '/assets/images/bird.png',
      '/assets/images/bird.png',
      '/assets/images/bird.png',
    ],
    trivia: [
      {boldText: '195', text: 'mil km² de extensão'},
      {boldText: '+ 3.500', text: 'espécies de plantas'},
      {boldText: '+ 650', text: 'espécies de aves'},
    ],
    catchphrase:
      'Um espetáculo da natureza, na maior planície alagada que agora você poderá desfrutar com muita exclusividade',
    hotel: {
      id: 1,
      name: 'Casa Caiman',
      description:
        'Se hospedar na Casa Caiman é aproveitar cada segundo de um refúgio ecológico cercado de verde, que une aventura, conforto e hospitalidade de luxo sustentável.',
      rating: 4.5,
      images: [
        '/assets/images/bird.png',
        '/assets/images/bird.png',
        '/assets/images/bird.png',
      ],
    },
    itinerary: {
      subtitle: 'Explore cada km² de natureza',
      items: [
        {
          title: 'Safári',
          description: 'expedição em carro aberto em meio à vida selvagem',
          image: '/assets/images/bird.png',
        },
        {
          title: 'Caiman Tour',
          description: 'um mergulho na cultura pantaneira',
          image: '/assets/images/bird.png',
        },
        {
          title: 'Focagem noturna',
          description: 'contemplando o silêncio e as espécies da noite',
          image: '/assets/images/bird.png',
        },
        {
          title: 'Expedição fotográfica',
          description: 'com um fotógrafo profissional',
          image: '/assets/images/bird.png',
        },
      ],
    },
    informationItems: [
      {
        title: 'Aéreo',
        description: 'ida e volta via Campo Grande',
        icon: 'plane-right',
      },
      {
        title: 'Bebida',
        description: 'pensão completa com bebidas não alcoólicas',
        icon: 'drink',
      },
      {
        title: 'Voos',
        description: 'com saídas regulares',
        icon: 'plane-up',
      },
      {
        title: 'Hospedagem',
        description: '04 noites na Casa Caiman',
        icon: 'hotel',
      },
      {
        title: 'Pessoas',
        description: 'escolha até 2 passeios por dia já incluso no valor',
        icon: 'people',
      },
      {
        title: 'Transporte',
        description: 'privativo aeroporto/hotel/aeroporto ',
        icon: 'car',
      },
    ],
  },
]
