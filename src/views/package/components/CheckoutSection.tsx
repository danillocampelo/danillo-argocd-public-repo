import {
  ForwardArrowIcon,
  LeakedStarIcon,
  LocationIcon,
  MoonIcon,
  SupportAgentIcon,
} from '@assets/icons'
import { Button } from '@components/index'
import useMediaQuery from '@hooks/useMediaQuery'
import { Package } from '@models/Package'
import { Themes } from '@utils/constants/theme'
import { convertToCurrency } from '@utils/currency'
import { useTranslation } from 'next-i18next'

import { useNavigateToCheckoutPage } from '@hooks/navigators/useNavigateToCheckoutPage'
import { DEFAULT_MAX_INSTALLMENTS } from '../../../utils/constants/installments'
import MilesAccrual from '@components/organisms/MilesAccrual/MilesAccrual'

const CheckoutSection = (packageData: Package) => {
  const { t } = useTranslation(['package-page', 'common'])
  const isMobile = useMediaQuery('(max-width: 768px)')

  const price = packageData.packageDefault?.price

  const navigateToCheckoutPage = useNavigateToCheckoutPage(packageData)
  return (
    <section
      className={
        'mt-9 flex w-full flex-1 justify-between px-6 lg:mt-18 lg:mb-12 lg:px-11'
      }
    >
      <section className={'flex w-full flex-col lg:max-w-[34%]'}>
        <p
          className={
            'mb-4 font-secondary text-paragraph-medium font-bold uppercase -tracking-tighter text-primary lg:mb-6 lg:text-h3-desktop'
          }
        >
          {packageData.title}
        </p>
        <h3 className={'mb-5 font-light text-white lg:mb-7'}>
          {packageData.subtitle || packageData.experience.name}
        </h3>
        <section className={'mb-6 flex flex-row lg:mb-11'}>
          <div
            className={
              'flex flex-row items-center font-secondary text-tag font-bold uppercase leading-4 text-white'
            }
          >
            <MoonIcon className={'mr-3'} />{' '}
            {`${packageData.packageDefault?.nights} ${t('nights', {
              ns: 'common',
            })}`}
          </div>
          {!isMobile && (
            <div
              className={
                'ml-7 flex flex-row items-center font-secondary text-tag font-bold uppercase leading-4 text-white'
              }
            >
              <LeakedStarIcon className={'mr-3'} />{' '}
              <p>
                {`${t('hotel', {
                  ns: 'common',
                })}  ${packageData.hotels[0]?.stars} ${t('stars')}`}
              </p>
            </div>
          )}
          <div
            className={
              'ml-5 flex flex-row items-center font-secondary text-tag font-bold uppercase leading-4 text-white'
            }
          >
            <LocationIcon className={'mr-3'} />{' '}
            {`${packageData.destination.city.name?.split(',')[0]} `}
          </div>
        </section>
        <img
          width={1080}
          height={812}
          src={packageData.cover.src}
          alt=""
          className={`flex h-[324px] w-full object-cover lg:hidden lg:h-full`}
        />
        <p
          className={
            'mb-3 mt-6 font-secondary text-tag-large font-bold uppercase text-white'
          }
        >
          {t('initial-price', { ns: 'common' })}
        </p>
        <div className={'flex flex-row'}>
          <h5 className={'font-light text-white'}>
            {convertToCurrency({
              rawNumber: price?.amount || 0,
              currency: price?.currency,
            })}
          </h5>
          <p
            className={
              'ml-1 flex items-end font-secondary text-tag-large font-bold uppercase text-white'
            }
          >
            {` / ${t('per-person', { ns: 'common' })}`}
          </p>
        </div>
        <p className={'mt-4 mb-5 text-tag uppercase text-gray-40'}>
          {t('installment-purchase', {
            installments: DEFAULT_MAX_INSTALLMENTS,
          })}
        </p>
        {!isMobile && (
          <MilesAccrual miles={packageData.packageDefault?.miles} />
        )}
        <div className={'mt-7 lg:flex lg:flex-row'}>
          <Button
            buttonType="primary"
            className="button-regular mb-4 w-full lg:mr-8"
            Icon={ForwardArrowIcon}
            reverseIcon
            onClick={navigateToCheckoutPage}
          >
            {t('buy')}
          </Button>
          <Button
            theme={Themes.dark}
            buttonType="secondary"
            className="button-regular mb-4 w-full"
            Icon={SupportAgentIcon}
            reverseIcon
          >
            {t('speak-consultant', { ns: 'common' })}
          </Button>
        </div>
      </section>
      <div className={'hidden lg:flex lg:h-[632px] lg:max-w-[56%] lg:flex-1'}>
        <img
          width={1080}
          height={812}
          src={packageData.cover.src}
          alt=""
          className={`h-[324px] w-full object-cover lg:h-full`}
        />
      </div>
    </section>
  )
}

export default CheckoutSection
