import { usePackageContext } from '@contexts/PackageContext'
import { Package } from '@models/Package'
import { ROUTES } from '../../utils/constants/routes'
import { useNavigateTo } from './useNavigateTo'

export const useNavigateToCheckoutPage = (packageData?: Package) => {
  const { setSelectedPackage } = usePackageContext()
  const navigateToCheckoutPage = useNavigateTo(ROUTES.checkout(packageData?.id))

  return () => {
    if (packageData) {
      setSelectedPackage(packageData)
    }
    navigateToCheckoutPage()
  }
}
