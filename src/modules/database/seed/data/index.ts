import {IPackageSeed} from '../dto/package-seed.dto'

const experiences = ['Aventure-se']

const packages: IPackageSeed[] = [
  {
    id: 1,
    title: 'Pantanal',
    subtitle: 'Descubra os encanto',
    description:
      'O Pantanal é um verdadeiro santuário ecológico da biodiversidade brasileira. Um lugar único, mágico, de contemplação e descobertas, onde podemos imergir na vida selvagem, sem grades ou jaulas.',
    experience: 'Aventure-se',
    catchphrase:
      'Um espetáculo da natureza, na maior planície alagada que agora você poderá desfrutar com muita exclusividade',
    catchphraseIcon: '1233',
    externalDescription: 'O Pantanal',
    itinerarySubtitle: 'Explore cada km² de natureza',
    externalId: '',
    destination: '2289',
    destinationType: 'M',
    occupancy: '1',
    startDate: new Date('2022-11-24').toISOString(),
    endDate: null,
    trivia: [
      {boldText: '195', text: 'mil km² de extensão'},
      {boldText: '+ 3.500', text: 'espécies de plantas'},
      {boldText: '+ 650', text: 'espécies de aves'},
    ],
    information_items: [
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

export {experiences, packages}
