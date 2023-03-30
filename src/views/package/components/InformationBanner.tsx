import { DownArrowIcon, MoonIcon, StarIcon } from '@assets/icons'
import { useTranslation } from 'next-i18next'

type Props = {
  isMobile: boolean
  numberOfNights: number
  acommodationType: string
}

const InformationBanner = ({
  isMobile,
  numberOfNights,
  acommodationType,
}: Props) => {
  const { t } = useTranslation(['package-page', 'common'])

  return (
    <>
      {isMobile ? (
        <>
          <div className={'mb-7 flex flex-row items-center'}>
            <StarIcon className={'mr-2 h-4 w-4'} />
            <p className={'font-secondary text-tag uppercase text-white'}>
              {acommodationType}
            </p>
          </div>
          <div className={'flex flex-row items-center'}>
            <MoonIcon className={'mr-2 h-4 w-4'} />
            <p className={'font-secondary text-tag uppercase text-white'}>
              {`${numberOfNights} ${t('nights', {
                ns: 'common',
              })}`}
            </p>
          </div>
        </>
      ) : (
        <div className={'flex w-full flex-row items-center'}>
          <div className={'mb-7 flex flex-row items-center md:mb-0'}>
            <MoonIcon className={'mr-2 h-4 w-4 md:mr-5'} />
            <p className={'font-secondary text-tag uppercase text-white'}>
              {`${numberOfNights} ${t('nights', {
                ns: 'common',
              })}`}
            </p>
            <div className={'mx-7 h-7 w-[2px] bg-white'} />
          </div>
          <div className={'flex flex-row items-center'}>
            <StarIcon className={'mr-2 h-4 w-4 md:mr-5'} />
            <p className={'font-secondary text-tag uppercase text-white'}>
              {acommodationType}
            </p>
            <div className={'mx-7 h-7 w-[2px] bg-white'} />
          </div>
          <div className={'flex h-full flex-row items-center'}>
            <DownArrowIcon className={'mr-2 md:mr-5'} />
            <p className={'font-secondary text-tag uppercase  text-white'}>
              {t('common:discover-the-charms-of-the-region')}
            </p>
          </div>
        </div>
      )}
    </>
  )
}

export default InformationBanner
