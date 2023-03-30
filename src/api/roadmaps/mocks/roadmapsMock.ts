import { Roadmap } from '@models/RoadMap'

export const roadmapsMock: Roadmap = {
  id: '1',
  days: [
    {
      day: 1,
      title: 'Caminhada Ecológica',
      description:
        'Caminhe em um passeio guiado, pelos pontos tradicionais deste imenso refúgio ecológico.',
      duration: 3,
    },
    {
      day: 2,
      title: 'Canoa Canadense',
      description:
        'Contemple a vegetação, as aves aquáticas, os sons locais e o lindo pôr do sol, enquanto desliza a remo pelas tranquilas águas do pantanal.',
      duration: 4,
    },
  ],
}
