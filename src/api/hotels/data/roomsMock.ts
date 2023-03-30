import { Room } from '@models/Room'

export const roomsMock: Room[] = [
  {
    id: '111',
    title: 'Suíte',
    recommended: true,
    maxGuests: 2,
    metainfos: [
      {
        icon: { src: 'area' },
        title: '30m²',
      },
      {
        icon: { src: 'shower' },
        title: 'Chuveiro a gás',
      },
      {
        icon: { src: 'tv' },
        title: 'Tv',
      },
      {
        icon: { src: 'air-conditioning' },
        title: 'Ar-condicionado',
      },
      {
        icon: { src: 'self-care' },
        title: 'Secador',
      },
      {
        icon: { src: 'pool' },
        title: 'Vista para a piscina',
      },
      {
        icon: { src: 'wifi' },
        title: 'Wi-fi',
      },
      {
        icon: { src: 'hot-tub' },
        title: 'Hidromassagem',
      },
      {
        icon: { src: 'balcony' },
        title: 'Varanda',
      },
    ],
    price: {
      currency: 'brl',
      amount: 1200,
    },
    images: [
      {
        id: '1',
        url: '/assets/images/bird.png',
      },
    ],
    startDate: new Date('2023-02-10'),
    endDate: new Date('2023-02-10'),
    guests: {
      adult: [],
    },
  },
  {
    id: '222',
    title: 'Suíte Superior',
    remaining: 3,
    maxGuests: 2,
    metainfos: [
      {
        icon: { src: 'shower' },
        title: 'Chuveiro a gás',
      },
      {
        icon: { src: 'tv' },
        title: 'Tv',
      },
      {
        icon: { src: 'air-conditioning' },
        title: 'Ar-condicionado',
      },
      {
        icon: { src: 'self-care' },
        title: 'Secador',
      },
      {
        icon: { src: 'pool' },
        title: 'Vista para a piscina',
      },
      {
        icon: { src: 'wifi' },
        title: 'Wi-fi',
      },
      {
        icon: { src: 'hot-tub' },
        title: 'Hidromassagem',
      },
      {
        icon: { src: 'balcony' },
        title: 'Varanda',
      },
    ],
    price: {
      currency: 'brl',
      amount: 1100,
    },
    images: [
      {
        id: '1',
        url: '/assets/images/bird.png',
      },
    ],
    startDate: new Date('2023-02-10'),
    endDate: new Date('2023-02-10'),
    guests: {
      adult: [],
    },
  },
  {
    id: '333',
    title: 'Suíte Master',
    recommended: false,
    maxGuests: 2,
    metainfos: [
      {
        icon: { src: 'shower' },
        title: 'Chuveiro a gás',
      },
      {
        icon: { src: 'tv' },
        title: 'Tv',
      },
      {
        icon: { src: 'air-conditioning' },
        title: 'Ar-condicionado',
      },
      {
        icon: { src: 'self-care' },
        title: 'Secador',
      },
      {
        icon: { src: 'pool' },
        title: 'Vista para a piscina',
      },
      {
        icon: { src: 'wifi' },
        title: 'Wi-fi',
      },
      {
        icon: { src: 'hot-tub' },
        title: 'Hidromassagem',
      },
      {
        icon: { src: 'balcony' },
        title: 'Varanda',
      },
    ],
    price: {
      currency: 'brl',
      amount: 1200,
    },
    images: [
      {
        id: '1',
        url: '/assets/images/bird.png',
      },
    ],
    startDate: new Date('2023-02-10'),
    endDate: new Date('2023-02-10'),
    guests: {
      adult: [],
    },
  },
]
