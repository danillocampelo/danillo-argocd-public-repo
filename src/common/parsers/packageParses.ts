import {calculateMiles} from '~/helpers/miles'
import {
  IFare,
  IFlightAvails,
  IFlightAvailsRoutesFlights,
  IHotelDetailImage,
  IinfoteraPackageById,
  IinfoteraPackageByIdImage,
  IroomGroup,
  IRooms,
  ITourAvails,
  IUtilityHotelDetail,
} from '~/modules/infotravel/infotravel.interfaces'
import {
  DEFAULT_HOTEL_STAR,
  DEFAULT_PRICE,
} from '~/modules/packages/entity/constants'
import {IPackageWithRelations} from '~/modules/packages/interfaces/package.interface'
import {
  IPackagesOutPutByIdDetails,
  IPackagesOutPutList,
} from '~/modules/packages/interfaces/package.service.output'
import {DetailType} from '../../modules/database/entity/itemDetail.entity'

export function getInformationItems(data: IPackageWithRelations) {
  return data.itemDetail.map((item) => {
    // where type == InformationItems
    return {
      title: item.title,
      description: item.description,
      icon: item.icon,
    }
  })
}

export function getItinerary(
  tours: ITourAvails[],
  internalPackage: IPackageWithRelations,
) {
  const itinerary = {
    subtitle: internalPackage.itinerarySubtitle,
    items: tours.map((val) => {
      return {
        title: val.tour.name,
        image: val.tour.image.medium,
        description: val.tour.description,
      }
    }),
  }
  return itinerary
}

export function getBestFareFromIHotelRomGroups(
  roomGroups: IroomGroup[],
): IRooms {
  return roomGroups[0].rooms.reduce((acc, val) => {
    const fare1 = getFare(acc.fares)
    const fare2 = getFare(val.fares)
    if (fare2.price < fare1.price) acc = val
    return acc
  })
}

function getFare<T extends IFare>(fares: T[]): T {
  return fares.find((fare) => fare.type === 'FARE')
}

function getBestRouteFlight(x: IFlightAvails[]): {
  depart: IFlightAvailsRoutesFlights[]
  return: IFlightAvailsRoutesFlights[]
} {
  return x.reduce(
    (acc, val) => {
      acc.depart.push(val.routes[RoutesIndex.depart].flights[0])
      acc.return.push(val.routes[RoutesIndex.return].flights[0])
      return acc
    },
    {depart: [], return: []},
  )
}

enum RoutesIndex {
  depart = 0,
  return = 1,
}

function getBestFlight(
  flights: IFlightAvailsRoutesFlights[],
): IFlightAvailsRoutesFlights {
  return flights.reduce((acc, val) => {
    if (getFare(acc.fares).price.amount < getFare(val.fares).price.amount)
      acc = val
    return acc
  })
}

function getBestRoutePrice(x: {
  depart: IFlightAvailsRoutesFlights[]
  return: IFlightAvailsRoutesFlights[]
}): number {
  const fare1 = getFare(getBestFlight(x.depart).fares).price.amount
  const fare2 = getFare(getBestFlight(x.return).fares).price.amount

  return fare1 + fare2
}

export function mapHotelImages(
  hotelImages: IHotelDetailImage[],
): IinfoteraPackageByIdImage[] {
  return hotelImages?.map((image) => ({
    big: image.large,
    average: image.medium,
    small: image.small,
  }))
}

export function parseToIPackagesOutPutByIdDetails(
  externalPackage: IinfoteraPackageById,
  packageWithRelations: IPackageWithRelations,
  hotels: IUtilityHotelDetail[],
): IPackagesOutPutByIdDetails {
  const innerHotels = hotels.map(item => item.hotel)
  const experience = packageWithRelations.experiences?.length && {
    id: packageWithRelations.experiences?.[0]?.id,
    name: packageWithRelations.experiences?.[0]?.name,
    description: packageWithRelations.experiences?.[0]?.description,
  }

  const packageImages = externalPackage?.images || mapHotelImages(innerHotels[0]?.images)

  return {
    id: externalPackage?.id,
    title: externalPackage?.title,
    subtitle: packageWithRelations.subtitle,
    experience,
    destination: {
      city: getCityFromExternalData(externalPackage),
    },
    packageDefault: getPackageDefault(packageWithRelations, externalPackage),
    //ADEQUAR PARA UMA POSSIBILIDADE DE MAIS DE UM HOTEL
    hotel: !!hotels.length ? parseIHotelDetailToIPackagesOutPutByIdDetails(innerHotels) : {},
    metainfos: getItemDetailByTypeMetainfos(packageWithRelations),
    texts: getItemDetailByTypeTexts(packageWithRelations),
    cover: packageImages && {url: packageImages[0].big},
    highlight: packageWithRelations.highlight,
    images: getImagesFromIinfoteraPackageById(packageImages),
    itinerary: parseToPackagesOutPutByIdDetailsItinerary(externalPackage),
    details: getItemDetailByTypeInformationItens(packageWithRelations),
  }
}

function getPackageDefault(
  packageWithRelations: IPackageWithRelations,
  externalPackage?: IinfoteraPackageById,
) {
  const price = packageWithRelations?.price ?? DEFAULT_PRICE
  return {
    price,
    miles: calculateMiles(price),
    ...(!!externalPackage && {
      days: externalPackage.destinations?.[0]?.days,
      nights: externalPackage.destinations?.[0]?.nights,
    }),
  }
}

function parseToPackagesOutPutByIdDetailsItinerary(
  infotravel: IinfoteraPackageById,
): IPackagesOutPutByIdDetails['itinerary'] {
  return infotravel.roadMap.map((x) => {
    return {
      day: x.sqDay,
      title: x.name,
      description: x.description,
    }
  })
}

function parseIHotelDetailToIPackagesOutPutByIdDetails(
  hotels: IUtilityHotelDetail['hotel'][],
): IPackagesOutPutByIdDetails['hotel'] {
  return {
    stars: !!hotels.length ? formatHotelsStars(hotels) : [DEFAULT_HOTEL_STAR],
    name: hotels[0].name,
    description: hotels[0].description,
    adress: hotels[0].address.address,
    city: hotels[0].address.city.name,
    facilities: 
      hotels[0].facilities?.[0]?.items?.map((item) => {
        return {
          id: item.id,
          title: item.name,
        }
      }) || [],
    images: hotels[0]?.images?.map((img): {url: string} => {
      return {url: img.large}
    }),
  }
}

function getItemDetailByTypeMetainfos(
  packageWithRelations: IPackageWithRelations,
): {icon: string; title: string}[] {
  return packageWithRelations.itemDetail
    .filter((item) => item.type === DetailType.METAINFOS)
    .map((item) => {
      return {
        icon: item.icon,
        title: item.title,
        description: item.description,
      }
    })
}

function getItemDetailByTypeTexts(
  packageWithRelations: IPackageWithRelations,
): {description: string; type: 1 | 2 | 3 | 4}[] {
  return packageWithRelations.itemDetail
    .filter((item) => [1, 2, 3, 4].includes(Number(item.type)))
    .map((item) => {
      return {
        description: item.description,
        type: item.type,
      }
    }) as any
}

function getItemDetailByTypeInformationItens(
  packageWithRelations: IPackageWithRelations,
): {icon: string; title: string; description: string}[] {
  return packageWithRelations.itemDetail
    .filter((item) => item.type === DetailType.INFORMATION_ITENS)
    .map((item) => {
      return {
        icon: item.icon,
        title: item.title,
        description: item.description,
      }
    })
}

function getImagesFromIinfoteraPackageById(
  images: IinfoteraPackageByIdImage[],
): {url: string; type: number}[] {
  return (
    images?.map((img, i): {url: string; type: number} => {
      return {url: img.big, type: i + 1}
    }) || []
  )
}

function formatHotelsStars(hotels: IUtilityHotelDetail['hotel'][]): number[] {
  const stars = hotels.map(hotel => hotel.stars)
  if(stars.length > 1) {
    const uniqueStars = Array.from(new Set(stars))
    return [Math.min(...uniqueStars),Math.max(...uniqueStars)]
  }
  return stars
}

export function parseToIPackagesOutPutList(
  packages: IPackageWithRelations[],
  packageExternalData: IinfoteraPackageById[],
): IPackagesOutPutList[] {
  return packages.map((pck) => {
    const externalData = packageExternalData.find(
      (data) => data.id === Number(pck.externalId),
    )
    return {
      id: Number(pck.externalId),
      title: externalData?.title,
      subtitle: pck?.subtitle,
      experience: {
        id: pck.experiences?.[0]?.id,
        name: pck.experiences?.[0]?.name,
        description: pck.experiences?.[0]?.description,
      },
      destination: {
        city: getCityFromExternalData(externalData),
      },
      packageDefault: getPackageDefault(pck, externalData),
      cover: {
        url: externalData?.images?.[0]?.big,
      },
      highlight: pck.highlight,
    }
  })
}

export const parseToListWithoutExternalData = (
  packages: IPackageWithRelations[],
): IPackagesOutPutList[] => {
  return packages.map((parsingPackage) => {
    return {
      id: Number(parsingPackage.externalId),
      subtitle: parsingPackage?.subtitle,
      experience: {
        id: parsingPackage.experiences?.[0]?.id,
        name: parsingPackage.experiences?.[0]?.name,
      },
      highlight: parsingPackage.highlight,
    }
  })
}

export const parseToPakcageWithouExternalData = (
  packageWithRelations: IPackageWithRelations,
): IPackagesOutPutByIdDetails => {
  return {
    id: Number(packageWithRelations.externalId),
    subtitle: packageWithRelations?.subtitle,
    experience: {
      id: packageWithRelations.experiences?.[0]?.id,
      name: packageWithRelations.experiences?.[0]?.name,
    },
    highlight: packageWithRelations.highlight,
    metainfos: getItemDetailByTypeMetainfos(packageWithRelations),
    texts: getItemDetailByTypeTexts(packageWithRelations),
    details: getItemDetailByTypeInformationItens(packageWithRelations),
  }
}

export const getCityFromExternalData = (externalData: IinfoteraPackageById) =>
  externalData.destinations?.[0]?.destination?.name
