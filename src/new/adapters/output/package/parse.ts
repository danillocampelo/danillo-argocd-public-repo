import {calculateMiles} from '~/helpers/miles'
import {removeArrayEmptyAvalues} from '~/helpers/remove-empty-values'
import {DetailType} from '~/modules/database/entity/itemDetail.entity'
import {
  IFare,
  IFlightAvails,
  IFlightAvailsRoutesFlights,
  IHotelDetailImage,
  IinfoteraPackageById,
  IinfoteraPackageByIdImage,
  InfoTravelPackageAvailbility,
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
import {sumAvailPoints} from '~/new/core/package/common'
import {CustomPackageListDTO} from '~/new/ports/driven/api/dto/customPackageDTO'

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

function getBestFareFromIHotelRomGroups(roomGroups: IroomGroup[]): IRooms {
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
  return hotelImages.map((image) => ({
    big: image.large,
    average: image.medium,
    small: image.small,
  }))
}

export function parseToIPackagesOutPutByIdDetails(
  externalPackage: IinfoteraPackageById,
  packageWithRelations: IPackageWithRelations,
  hotels: IUtilityHotelDetail[],
  points?: number,
  cancellationPolicies?: any,
): IPackagesOutPutByIdDetails {
  const innerHotels = hotels.map((item) => item.hotel)
  const experience = packageWithRelations.experiences?.length && {
    id: packageWithRelations.experiences?.[0]?.id,
    name: packageWithRelations.experiences?.[0]?.name,
    description: packageWithRelations.experiences?.[0]?.description,
  }

  const packageImages =
    externalPackage?.images || mapHotelImages(innerHotels[0]?.images)

  return {
    id: externalPackage?.id,
    title: externalPackage?.title,
    subtitle: packageWithRelations.subtitle,
    experience,
    destination: {
      city: getCityFromExternalData(externalPackage),
    },
    hotel: !!innerHotels.length
      ? parseIHotelDetailToIPackagesOutPutByIdDetails(
          innerHotels,
          cancellationPolicies,
        )
      : {},
    packageDefault: getPackageDefault(
      {
        days: externalPackage.destinations[0].days,
        nights: externalPackage.destinations[0].nights,
      },
      packageWithRelations,
      points,
    ),
    texts: getItemDetailByTypeTexts(packageWithRelations),
    cover: packageImages && {url: packageImages[0].big},
    highlight: packageWithRelations.highlight,
    images: getImagesFromIinfoteraPackageById(packageImages),
    itinerary: parseToPackagesOutPutByIdDetailsItinerary(externalPackage),
  }
}

function getPackageDefault(
  externalData: {days: number; nights: number},
  packageWithRelations: IPackageWithRelations,
  points?: number,
) {
  const price = packageWithRelations?.price ?? DEFAULT_PRICE
  const res = {
    days: externalData.days,
    nights: externalData.nights,
    price,
  } as any
  if (points) {
    res.miles = points
  }
  return res
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
  cancellationPolicies?: any,
): IPackagesOutPutByIdDetails['hotel'] {
  return {
    stars: formatHotelsStars(hotels.map((item) => item.stars)) || [
      DEFAULT_HOTEL_STAR,
    ],
    name: hotels[0].name,
    description: hotels[0].description,
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
    cancellationPolicies: cancellationPolicies,
  }
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

export function formatHotelsStars(stars: number[]): number[] {
  if (stars.length > 1) {
    const uniqueStars = Array.from(new Set(stars))
    return removeArrayEmptyAvalues([
      Math.min(...uniqueStars),
      Math.max(...uniqueStars),
    ])
  }
  return stars
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

export function parseToIPackagesOutPutList(
  packages: IPackageWithRelations[],
  packageExternalData: IinfoteraPackageById[],
): IPackagesOutPutList[] {
  return packages.map((pck) => {
    const externalData = packageExternalData.find(
      (data) => data.id == pck.externalId,
    )
    return {
      id: Number(pck.externalId),
      title: externalData?.title,
      experience: {
        id: pck.experiences?.[0]?.id,
        name: pck.experiences?.[0]?.name,
        description: pck.experiences?.[0]?.description,
      },
      destination: {
        city: getCityFromExternalData(externalData),
      },
      packageDefault: getPackageDefault(
        {
          days: externalData.destinations[0].days,
          nights: externalData.destinations[0].nights,
        },
        pck,
      ),
      cover: {
        url: externalData?.images?.[0]?.big,
      },
      highlight: pck.highlight,
    }
  })
}

export const parseToCustomPackageList = (
  packages: IinfoteraPackageById[],
): CustomPackageListDTO => {
  const formattedCustomPackages = packages.map((pck) => {
    //TO DO : remove Default Price
    return {
      id: pck.id,
      destination: {
        id: pck.destinations?.[0]?.destination?.id,
        name: pck.destinations?.[0]?.destination?.name,
        iataCode: pck.destinations?.[0]?.destination.iata,
      },
      packageDefault: {
        days: pck.destinations?.[0]?.days,
        nights: pck.destinations?.[0]?.nights,
        price: DEFAULT_PRICE,
        miles: calculateMiles(DEFAULT_PRICE),
      },
      cover: {
        url: pck.images?.[0]?.big,
      },
    }
  })
  const [hightlights, ...mostViews] = formattedCustomPackages
  return {
    mostViews,
    hightlights: [hightlights],
  }
}

export function getCityFromExternalData(
  externalData: IinfoteraPackageById,
): string {
  return externalData.destinations[0].destination.name
}

export function parseToIPackagesAvailOutPutList(
  packages: IPackageWithRelations[],
  availbilityPackages: PromiseFulfilledResult<InfoTravelPackageAvailbility>[],
): IPackagesOutPutList[] {
  return packages.map((pck) => {
    const availbilityPackage = availbilityPackages.find(
      (data) =>
        data.value.packageAvails[0].package.id == Number(pck.externalId),
    )
    const availPackage = availbilityPackage?.value.packageAvails[0].package
    const points = sumAvailPoints(availbilityPackage.value)
    return {
      id: Number(pck.externalId),
      title: availPackage.name,
      experience: {
        id: pck.experiences?.[0]?.id,
        name: pck.experiences?.[0]?.name,
        description: pck.experiences?.[0]?.description,
      },
      destination: {
        city: availPackage.destination,
      },
      packageDefault: getPackageDefault(
        {days: availPackage.days, nights: availPackage.nights},
        pck,
        points,
      ),
      cover: {
        url: availPackage.images[0].large,
      },
      highlight: pck.highlight,
    }
  })
}
