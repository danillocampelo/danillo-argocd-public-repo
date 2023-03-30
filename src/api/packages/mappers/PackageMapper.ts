import { Package } from 'src/models/Package'
import { PackageDto } from '../dtos/PackageDto'

export const PackageMapper = (packageData: PackageDto): Package => {
  return {
    id: packageData.id.toString(),
    hotels: [
      {
        id: packageData.id.toString(),
        description: packageData.hotel?.description ?? '',
        provider: '',
        rooms: [
          {
            id: '',
            title: '',
            maxGuests: 0,
            price: {
              amount: 0,
            },
            metainfos: [],
            fees: { amount: 0 },
            guests: [
              {
                id: '',
                name: '',
                lastname: '',
                livingCountry: {
                  name: '',
                },
                document: {
                  type: 'rg',
                  value: '',
                },
                birthday: '',
                gender: 'other',
              },
            ],
          },
        ],
        location: {
          city: {
            name: '',
          },
          state: {
            name: '',
            uf: '',
          },
        },
        name: packageData.hotel?.name ?? '',
        stars: packageData.hotel?.stars ?? -1,
        images:
          packageData.hotel?.images?.map((image) => ({
            src: image.url,
          })) ?? [],
        metainfos:
          packageData.metainfos?.map((info) => ({
            icon: {
              id: info.icon,
              src: info.icon,
            },
            title: info.title,
          })) ?? [],
        facilities: packageData.hotel?.facilities ?? [],
      },
    ],
    cover: {
      src: packageData.cover?.url ?? '',
    },
    destination: {
      city: { name: packageData.destination.city },
      state: { name: '', uf: '' },
    },
    experience: {
      id: packageData.experience.id.toString(),
      description: packageData.experience?.description ?? '',
      name: packageData.experience.name,
    },
    images:
      packageData.images?.map((image) => ({
        src: image.url,
      })) ?? [],
    roadMap: {
      id: packageData.title,
      days:
        packageData.itinerary?.map((day) => ({
          day: day.day,
          description: day.description,
          title: day.title,
        })) ?? [],
    },
    packageDefault: {
      days: packageData.packageDefault.days,
      nights: packageData.packageDefault.nights,
      price: {
        amount: packageData.packageDefault.price,
      },
      miles: packageData.packageDefault.miles,
    },
    subtitle: packageData.subtitle ?? '',
    title: packageData.title,
    highlight: packageData.highlight,
    texts:
      packageData.texts?.map((text) => ({
        description: text.description,
        type: text.type,
      })) ?? [],
  }
}
