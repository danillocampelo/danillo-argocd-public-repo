import { useTranslation } from 'next-i18next'
import { Package } from 'src/models/Package'
import { convertToCurrency } from 'src/utils/currency'
import { Button } from 'src/components'
import { ForwardArrowIcon, TicketIcon } from 'src/assets/icons'
import LinkWithLocale from 'src/components/atoms/LinkWithLocale'
import GradientCover from '@components/atoms/GradientCover'
import { ROUTES } from '@utils/constants/routes'
import MilesAccrual from '@components/organisms/MilesAccrual/MilesAccrual'

export const PackageCarouselItem = (packageData: Package) => {
  const { t, i18n } = useTranslation(['common', 'home-page'])

  return (
    <article
      className={`relative flex h-full w-screen flex-col items-start justify-center overflow-hidden  font-primary text-gray-0`}
    >
      <img
        src={packageData.cover.src}
        alt="Package cover image"
        width={1920}
        height={1080}
        className={'h-full w-full object-cover'}
      />
      <GradientCover className="left-1/2 top-[60%] h-[120%] w-[120%] lg:hidden" />
      <GradientCover
        className="top-[60%] left-[55%] h-[120%] w-[120%] max-lg:hidden"
        rotation={90}
      />
      <div className="absolute bottom-[140px] z-10 flex flex-col pl-6 sm:top-[45%] md:bottom-auto md:-translate-y-1/2 md:pl-[70px] 2xl:top-1/2">
        <span
          className={
            'mb-4 text-tag uppercase sm:text-paragraph-small md:mb-4 md:text-paragraph-medium md:font-normal lg:text-paragraph-small'
          }
        >
          {`${packageData.experience.name} em ${
            packageData.destination.city.name.split(',')[0]
          }`}
        </span>
        <h3
          className={
            'mb-6 w-full max-w-xs font-light sm:text-h4-desktop md:w-auto md:max-w-[641px] md:text-h3-desktop'
          }
        >
          {packageData.title}
        </h3>
        <div
          className={'flex w-fit flex-col bg-black/75  px-2 py-3 md:w-[640px]'}
        >
          <div className="flex">
            <LinkWithLocale href={ROUTES.packageIdPage(packageData.id)}>
              <Button
                buttonType={'primary'}
                Icon={ForwardArrowIcon}
                className={'button-small md:button-small md:p-3'}
                reverseIcon
              >
                {t('home-page:learn-more')}
              </Button>
            </LinkWithLocale>
            <TicketIcon className="ml-6 hidden md:inline-block" />
            <span
              className={
                ' inline-block max-w-[112px] whitespace-pre-line pl-5 text-tag md:max-w-none md:text-button'
              }
            >
              <span className="text-primary">
                {`${packageData.packageDefault?.nights} ${t('nights')} ${t(
                  'initial-price',
                )}`}
              </span>{' '}
              {`\n ${convertToCurrency({
                rawNumber: 100,
                locale: i18n.language,
              })}`}
            </span>
          </div>
          <div className="mt-5">
            <MilesAccrual
              miles={packageData.packageDefault?.miles}
              textBeforeIcon={t('home-page:acumulate-until')}
            />
          </div>
        </div>
      </div>
    </article>
  )
}

export default PackageCarouselItem
