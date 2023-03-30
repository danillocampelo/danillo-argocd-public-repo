import { PackageDto } from '@api/packages/dtos/PackageDto'

export const packageMock: PackageDto = {
  id: 95,
  title: 'Experiência Nannai muro alto',
  subtitle: 'Experiência Nannai Muro Alto',
  experience: {
    id: 4,
    name: 'Apaixone-se',
    description:
      'Construa suas histórias de amor com a exclusividade que só a Smiles Viagens pode oferecer',
  },
  destination: { city: 'Porto de Galinhas, Ipojuca, Região Nordeste, Brasil' },
  packageDefault: { days: 6, nights: 5, price: 10999.99, miles: 33000 },
  hotel: {
    stars: 5,
    name: 'Nannai Muro Alto',
    description:
      'A hospedagem no NANNAI é um capítulo à parte. Os bangalôs com as piscinas individuais à beira mar, desde a fundação, em 2001, são um marco importante e criaram uma nova experiência de hospitalidade no Brasil.\r\rAs acomodações foram desenhadas integradas à arquitetura tropical e todas têm o DNA NANNAI, não importa sua categoria.\rInteressante notar tanta opção. Mas, uma vez que você entende o direcionamento totalmente personalizado, percebe que cada tipo de hospedagem é para um perfil ou determinado momento de sua vida. Este mosaico, de acomodar as pessoas de forma que se sintam bem, está na essência do NANNAI.',
    facilities: [
      { id: 0, title: 'Serviços/Sala de Bagagem' },
      { id: 1, title: 'Berço disponível a pedido' },
      { id: 2, title: 'Loja de Lembranças' },
      { id: 3, title: 'Cabeleireiro' },
      { id: 4, title: 'Quartos para Deficientes' },
      { id: 5, title: 'Lavanderia/Limpeza a seco' },
    ],
    images: [
      { url: 'https://media.omnibees.com/Images/5652/Property/168693.jpg' },
      { url: 'https://media.omnibees.com/Images/5652/Property/168694.jpg' },
      { url: 'https://media.omnibees.com/Images/5652/Property/168695.jpg' },
      { url: 'https://media.omnibees.com/Images/5652/Property/168696.jpg' },
      { url: 'https://media.omnibees.com/Images/5652/Property/168697.jpg' },
      { url: 'https://media.omnibees.com/Images/5652/Property/168698.jpg' },
      { url: 'https://media.omnibees.com/Images/5652/Property/168699.jpg' },
      { url: 'https://media.omnibees.com/Images/5652/Property/168700.jpg' },
      { url: 'https://media.omnibees.com/Images/5652/Property/168701.jpg' },
      { url: 'https://media.omnibees.com/Images/5652/Property/168702.jpg' },
      { url: 'https://media.omnibees.com/Images/5652/Property/168703.jpg' },
      { url: 'https://media.omnibees.com/Images/5652/Property/168704.jpg' },
    ],
  },
  metainfos: [],
  texts: [
    {
      description:
        'Ao  chegar  na  praia  de  Muro  Alto,  localizada em Pernambuco, você irá se ver caminhando por praias de areias brancas e macias, tendo como vista um mar de águas  mornas  e  cristalinas.  Ao  visitar  os  quiosques  da  praia,  cercados  por coqueirais e manguezais, você irá sentir o aroma de alguns dos pratos típicos da região, como peixe assado e camarão frito. Com uma gastronomia inﬂuenciada pela culinária afro-brasileira e portuguesa, os pratos locais são preparados com ingredientes frescos, tendo como acompanhamento arroz, feijão e farofa. Além dos frutos do mar, você não pode deixar de experimentar os deliciosos coquetéis da região, perfeitos para desfrutar enquanto admira a vista da praia.',
      type: 1,
    },
    {
      description:
        'Ao  chegar  na  praia  de  Muro  Alto,  localizada em Pernambuco, você irá se ver caminhando por praias de areias brancas e macias, tendo como vista um mar de águas  mornas  e  cristalinas.  Ao  visitar  os  quiosques  da  praia,  cercados  por coqueirais e manguezais, você irá sentir o aroma de alguns dos pratos típicos da região, como peixe assado e camarão frito. Com uma gastronomia inﬂuenciada pela culinária afro-brasileira e portuguesa, os pratos locais são preparados com ingredientes frescos, tendo como acompanhamento arroz, feijão e farofa. Além dos frutos do mar, você não pode deixar de experimentar os deliciosos coquetéis da região, perfeitos para desfrutar enquanto admira a vista da praia.',
      type: 2,
    },
    { description: 'Ida e volta via Recífe', type: 4 },
    {
      description:
        '5 noites de hospedagem com café da manhã e jantar no Resort Nannai',
      type: 4,
    },
    {
      description: 'Privativo Aeroporto Recife/Resort/Aeroporto Recife',
      type: 4,
    },
  ],
  cover: {
    url: '//media.infotravel.com.br/image/upload/59260D58E62BFF1217D05F4551AF43C9.jpg',
  },
  highlight: true,
  images: [
    {
      url: '//media.infotravel.com.br/image/upload/B292BFC5238804BCB000E5BE07E37426.jpg',
      type: 1,
    },
    {
      url: '//media.infotravel.com.br/image/upload/2D32E946D34EBCA71804F70D2F4479F5.jpg',
      type: 2,
    },
    {
      url: '//media.infotravel.com.br/image/upload/9BA186A2857E05B2A91921D72E7237FE.jpg',
      type: 3,
    },
    {
      url: '//media.infotravel.com.br/image/upload/4979B2C555F3F2DAB717A73DDE54B450.jpg',
      type: 4,
    },
    {
      url: '//media.infotravel.com.br/image/upload/478201DD89837E4F509DBB9366091A35.jpg',
      type: 2,
    },
    {
      url: '//media.infotravel.com.br/image/upload/1D7017F81EBB713DDF47566569450D34.jpg',
      type: 3,
    },
    {
      url: '//media.infotravel.com.br/image/upload/749E5D31D8B07EBA33C2CBAC3BB0BE39.jpg',
      type: 4,
    },
    {
      url: '//media.infotravel.com.br/image/upload/F84E52817386E9827A78E3547CCE3E06.jpg',
      type: 1,
    },
    {
      url: '//media.infotravel.com.br/image/upload/FB1A0CFDDDC93A98D11461E9FFFDE0FD.jpg',
      type: 2,
    },
    {
      url: '//media.infotravel.com.br/image/upload/8B06BCF6AB60072BE5530B02EA75DCDF.jpeg',
      type: 3,
    },
    {
      url: '//media.infotravel.com.br/image/upload/6BD404685CE8576EAA40F2F51B42CA71.jpg',
      type: 4,
    },
  ],
  itinerary: [
    {
      day: 1,
      title: 'Chegada.',
      description:
        'Voo com destino Recife, traslado ao hotel em Porto de Galinhas, trajeto dura em média 48min. O  Check-in estará disponível a partir das 14:00. Tarde Livre para conhecer a belíssima estrutura do hotel.',
    },
    {
      day: 2,
      title: 'diferentes momentos ...',
      description:
        'Delicioso café da manhã. Dia livre, aproveite para curtir cada segundo nos 6 mil m2 de águas! São  piscinas, individuais e coletivas, que se comunicam pelo hotel inteiro. ',
    },
    {
      day: 3,
      title: 'Diferentes momentos .. ',
      description:
        'Café da manhã, dia livre para aproveitar como desejar. Sugerimos se aventurar nos esportes e serviços opcionais oferecidos, são levados a sério, com profissionais responsáveis para atender do iniciante ao avançado. Hidroginástica, alongamento, dança, academia, beach tênis, tênis, stand up e caiaque... Aproveite!',
    },
    {
      day: 4,
      title: 'Diferentes momentos.. ',
      description:
        "Café da manhã, dia livre para aproveitar como preferir. Sugerimos relaxar no NANNAI SPA by L'occitane, une o espírito NANNAI ao padrão L’occitane!",
    },
    {
      day: 5,
      title: 'Diferentes Momentos.',
      description:
        'Café da manhã, dia livre para vivenciar momentos incríveis. Aproveite seu último dia nesse lugar maravilhoso e não esqueça de garantir sua lembrancinha no NANNAI Beach Boutique, um "duty free" praiano onde você encontrará ofertas de grifes internacionais e nacionais.',
    },
    {
      day: 6,
      title: 'Fim dos serviços',
      description:
        'Café da manhã, traslado ao aeroporto de Recife para voo de retorno. Check-out disponível até as 12:00.',
    },
  ],
  details: [],
}
