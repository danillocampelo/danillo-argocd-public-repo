import { ForwardArrowIcon } from '@assets/icons'
import { ROUTES } from '@utils/constants/routes'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { Button } from 'src/components'
import { Package } from 'src/models/Package'
import { Themes } from 'src/utils/constants/theme'
import { convertToCurrency } from 'src/utils/currency'
import MilesAccrual from '@components/organisms/MilesAccrual/MilesAccrual'

type Props = {
  packageData: Package
}

const HighlightPackage = ({ packageData }: Props) => {
  const { i18n, t } = useTranslation(['package-page', 'common'])

  return (
    <article className="col-span-full flex h-[614px] text-white">
      <section
        className={`pt-52 flex h-full w-full flex-col items-start justify-center bg-cover bg-center bg-no-repeat pl-4 md:pt-0 md:pl-16`}
        style={{
          backgroundImage: `linear-gradient(260.27deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.72) 100%), linear-gradient(0deg, rgba(0, 0, 0, 0.32), rgba(0, 0, 0, 0.32)), url(${packageData.cover?.src}) `,
        }}
      >
        <span
          className={
            'font-secondary text-paragraph-small font-medium uppercase tracking-[0.25em]'
          }
        >
          {packageData?.destination.city.name}
        </span>
        <h3
          className={
            'mb-6 mt-3 w-full max-w-xs font-light sm:text-h4-desktop md:mb-6 md:mt-4 md:w-auto md:max-w-[641px] md:text-h3-desktop'
          }
        >
          {packageData.title}
        </h3>
        <h3 className={'max-w-[70%] font-light lg:max-w-[536px]'}>
          {packageData.subtitle}
        </h3>
        <span
          className={
            ' mb-6 flex flex-col whitespace-pre text-paragraph-small font-medium uppercase tracking-[0.25em] md:flex-row'
          }
        >
          <p>{`${t('initial-price', { ns: 'common' })} ${convertToCurrency({
            rawNumber: packageData.packageDefault?.price.amount || 5000,
            locale: i18n.language,
          })} `}</p>
          <p className="text-primary">{`/ ${
            packageData.packageDefault?.nights
          } ${t('nights', { ns: 'common' })} por pessoa`}</p>
        </span>
        <div
          className={
            'justify-content-center align-items-center mb-7 flex flex-row rounded-sm bg-black p-2 md:mb-7 md:mt-6'
          }
        >
          <MilesAccrual miles={packageData.packageDefault?.miles} />
        </div>
        <Button
          buttonType={'primary'}
          theme={Themes.dark}
          Icon={ForwardArrowIcon}
          reverseIcon
        >
          <Link href={ROUTES.packageIdPage(packageData.id)}>
            {t('discover', { ns: 'common' })}
          </Link>
        </Button>
      </section>
    </article>
  )
}

export default HighlightPackage
