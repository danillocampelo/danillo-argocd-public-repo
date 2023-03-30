import usePackage from '@api/packages/hooks/usePackage'
import { Package } from '@models/Package'
import { usePackageContext } from '../contexts/PackageContext/PackageContext'

export const useSelectedPackage = (id?: string): [Package | undefined] => {
  const { selectedPackage, setSelectedPackage } = usePackageContext()

  const doesIdNotMatch =
    !selectedPackage || selectedPackage.id?.toString() !== id

  const { data } = usePackage({
    packageID: id,
    queryOptions: {
      enabled: !!id && doesIdNotMatch,
    },
  })

  if (doesIdNotMatch) {
    if (data) {
      setSelectedPackage(data)
    }
    return [data]
  }

  return [selectedPackage]
}
