import {Status} from '../interfaces/package.interface'

export const PackageRepositoryMock = {
  id: 1,
  title: 'Pantanal',
  subtitle: 'Descubra os encantos',
  description:
    'O Pantanal é um verdadeiro santuário ecológico da biodiversidade brasileira. Um lugar único, mágico, de contemplação e descobertas, onde podemos imergir na vida selvagem, sem grades ou jaulas.',
  catchphrase:
    'Um espetáculo da natureza, na maior planície alagada que agora você poderá desfrutar com muita exclusividade',
  catchphrase_icon: '1233',
  external_description: 'O Pantanal',
  external_id: '',
  destination: '2289',
  destination_type: 'M',
  occupancy: '1',
  start_date: new Date('2022-11-24T00:00:00.000Z'),
  end_date: null,
  status: Status.ACTIVE,
  created_at: new Date('2022-12-05T16:45:23.162Z'),
  updated_at: new Date('2022-12-05T16:45:23.162Z'),
  experiences: [
    {
      package_id: 1,
      experience_id: 1,
      assignedAt: new Date('2022-12-05T16:45:23.162Z'),
      experience: {
        id: 1,
        name: 'Aventure-se',
      },
    },
  ],
  trivia: [
    {
      id: 1,
      text: 'mil km² de extensão',
      boldText: '195',
      package_id: 1,
    },
    {
      id: 2,
      text: 'espécies de plantas',
      boldText: '+ 3.500',
      package_id: 1,
    },
    {
      id: 3,
      text: 'espécies de aves',
      boldText: '+ 650',
      package_id: 1,
    },
  ],
  information_items: [
    {
      id: 1,
      icon: 'plane-right',
      title: 'Aéreo',
      description: 'ida e volta via Campo Grande',
      package_id: 1,
    },
    {
      id: 2,
      icon: 'drink',
      title: 'Bebida',
      description: 'pensão completa com bebidas não alcoólicas',
      package_id: 1,
    },
    {
      id: 3,
      icon: 'plane-up',
      title: 'Voos',
      description: 'com saídas regulares',
      package_id: 1,
    },
    {
      id: 4,
      icon: 'hotel',
      title: 'Hospedagem',
      description: '04 noites na Casa Caiman',
      package_id: 1,
    },
    {
      id: 5,
      icon: 'people',
      title: 'Pessoas',
      description: 'escolha até 2 passeios por dia já incluso no valor',
      package_id: 1,
    },
    {
      id: 6,
      icon: 'car',
      title: 'Transporte',
      description: 'privativo aeroporto/hotel/aeroporto ',
      package_id: 1,
    },
  ],
}
