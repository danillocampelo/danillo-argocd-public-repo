import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Package } from '@models/Package'
import { convertToCurrency } from '@utils/currency'
import { ROUTES } from '@utils/constants/routes'

type Props = {
  packageData: Package
  className?: string
}

//TODO: Change currency to package price when we define the logic
const PackageCard = ({ packageData, className }: Props) => {
  const { t, i18n } = useTranslation(['common'])

  return (
    <Link href={ROUTES.packageIdPage(packageData.id)}>
      <article
        className={`flex max-h-[56vh] max-w-full cursor-pointer flex-col items-start justify-start overflow-hidden md:max-h-screen ${className}`}
      >
        <div
          className="h-[208px] w-full md:h-[250px] lg:h-[300px] 2xl:h-[468px]"
          style={{
            backgroundImage: `url('${packageData.cover?.src}')`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
          }}
        />
        <section className="mt-4 md:mt-6">
          <span className="text-paragraph-small uppercase text-gray-40 line-clamp-3">
            {packageData.destination?.city?.name}
          </span>
          <p className="mt-1 text-paragraph-medium font-bold text-white line-clamp-2 md:mt-2">
            {packageData.title}
          </p>
          <div className="mt-2 flex flex-row">
            <p className="text-paragraph-medium font-normal text-white">
              {packageData.packageDefault?.nights} {t('nights')}{' '}
              {t('initial-price')}
            </p>
            <p className="ml-1 text-left text-paragraph-small font-normal leading-6 text-primary">
              {convertToCurrency({
                rawNumber: packageData.packageDefault?.price.amount || 1000,
                locale: i18n.language,
              })}
            </p>
          </div>
        </section>
      </article>
    </Link>
  )
}

export default PackageCard
