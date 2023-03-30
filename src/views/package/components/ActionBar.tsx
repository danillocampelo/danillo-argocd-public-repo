import { useTranslation } from 'next-i18next'
import { convertToCurrency } from 'src/utils/currency'
import { ForwardArrowIcon, TicketIcon } from 'src/assets/icons'
import { Button } from 'src/components'
import { Package } from 'src/models/Package'
import useMediaQuery from '@hooks/useMediaQuery'
import { useNavigateToCheckoutPage } from '@hooks/navigators/useNavigateToCheckoutPage'
import { DEFAULT_MAX_INSTALLMENTS } from '../../../utils/constants/installments'

const ActionBar = (packageData: Package) => {
  const { t } = useTranslation(['package-page', 'common'])
  const isMobile = useMediaQuery('(max-width: 768px)')
  const price = packageData.packageDefault?.price

  const navigateToCheckout = useNavigateToCheckoutPage(packageData)
  return (
    <nav
      className={`sticky top-0 z-50 flex w-full flex-row items-center justify-between bg-black p-3 font-bold text-white lg:px-8`}
    >
      <h6 className={`hidden items-center capitalize lg:flex`}>
        {packageData.title.toLocaleLowerCase()}
      </h6>
      <div className="flex flex-1 items-center justify-between font-secondary tracking-wider md:flex-none">
        <TicketIcon className={`mr-4 text-primary`} />
        <div
          className={`text-base relative mr-2 flex flex-1 items-center  md:mr-8 md:block `}
        >
          <p
            className={`text-rotate-up-in mr-1 flex flex-col text-tag uppercase md:flex-row  md:text-paragraph-medium`}
          >
            <span className={'flex flex-row text-primary'}>
              {`${packageData.packageDefault?.nights} ${t('nights', {
                ns: 'common',
              })}`}
              {isMobile && <>{t('initial-price', { ns: 'common' })} </>}
            </span>

            <span
              className={`text-tag text-white md:ml-2 md:text-paragraph-medium`}
            >
              {!isMobile && <>{t('initial-price', { ns: 'common' })} </>}
              {` `}
              {convertToCurrency({
                rawNumber: price?.amount || 0,
                currency: price?.currency,
              })}
              {` / ${t('per-person', { ns: 'common' })}`}
            </span>
          </p>
          <p
            className={`text-rotate-down-in absolute top-0 flex h-full items-center whitespace-nowrap text-tag uppercase opacity-0 md:text-paragraph-medium`}
          >
            {` ${t('installment-in')}`}
            <span
              className={`ml-2 text-tag text-white md:text-paragraph-medium`}
            >
              {`${DEFAULT_MAX_INSTALLMENTS}x `}
              {convertToCurrency({
                rawNumber: (price?.amount || 0) / DEFAULT_MAX_INSTALLMENTS,
                currency: price?.currency,
              })}
            </span>
          </p>
        </div>
        <Button
          buttonType={'primary'}
          className={'button-extra-small md:button-small'}
          Icon={ForwardArrowIcon}
          onClick={navigateToCheckout}
          reverseIcon
        >
          {t('buy')}
        </Button>
      </div>
    </nav>
  )
}

export default ActionBar
