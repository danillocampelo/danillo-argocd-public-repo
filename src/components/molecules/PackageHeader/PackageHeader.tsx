import { packageMock } from '@api/packages/data/mocks/packageMock'
import { ForwardArrowIcon, TicketIcon } from '@assets/icons'
import Button from '@components/atoms/Button'
import useMediaQuery from '@hooks/useMediaQuery'
import { ROUTES } from '@utils/constants/routes'
import { Themes } from '@utils/constants/theme'
import { convertToCurrency } from '@utils/currency'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const PackageHeader = () => {
  const { t, i18n } = useTranslation(['common'])
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <header className="mb-8 flex flex-row justify-between border-t border-t-gray-90 px-6 py-4 text-white md:mb-[36px] md:py-7 md:px-11">
      {!isMobile && (
        <h3 className="ml-4 text-h3-mobile font-light">
          {`${packageMock.title}`}
        </h3>
      )}
      <section className="flex flex-row items-center whitespace-pre font-secondary text-tag font-bold uppercase tracking-[2px] max-md:w-full max-md:justify-between md:text-button">
        <div className="flex flex-col pr-4 max-md:w-[198px] md:flex-row md:pr-8">
          <span className="text-primary">
            {!isMobile ? <TicketIcon className="mr-3 inline-block" /> : null}
            {`${packageMock.numberOfDays} ${t('nights')} ${
              isMobile ? t('initial-price') : ''
            } `}
          </span>
          <span>{`${
            !isMobile ? t('initial-price') + ' ' : ''
          }${convertToCurrency({
            rawNumber: 5000,
            locale: i18n.language,
          })} / por pessoa`}</span>
        </div>
        <Button
          buttonType={'primary'}
          className="button-extra-small"
          theme={Themes.dark}
          Icon={ForwardArrowIcon}
          reverseIcon
        >
          <Link href={ROUTES.packageIdPage(packageMock.id)}>
            <span className="font-bold uppercase md:text-button">
              {t('buy')}
            </span>
          </Link>
        </Button>
      </section>
    </header>
  )
}
export default PackageHeader
