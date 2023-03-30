import { get, PaginationParams } from '@api/_common/api'
import { Package } from 'src/models/Package'
import { PackageDto } from './dtos/PackageDto'
import { PackageMapper } from './mappers/PackageMapper'

const basePath = 'packages'

export type GetPackageInput = {
  packageID?: string
}

export type GetPackagesInput = {
  highlight?: boolean
  experiences?: string[]
} & PaginationParams

const getPackage = async ({ packageID }: GetPackageInput): Promise<Package> => {
  try {
    if (packageID === undefined || packageID === null)
      throw new Error('packageID is required')
    const { data } = await get<PackageDto>({
      url: `${basePath}/${packageID}`,
    })

    return PackageMapper(data)
  } catch (err) {
    throw err
  }
}

const getPackages = async ({
  experiences,
  highlight,
}: GetPackagesInput): Promise<Package[]> => {
  try {
    const { data } = await get<PackageDto[]>({
      url: `${basePath}`,
      config: {
        params: {
          highlight,
          experiences,
        },
      },
    })

    return data.map((item) => PackageMapper(item))
  } catch (err: any) {
    console.log({ err })
    throw Error(err)
  }
}

export { getPackages, getPackage }
