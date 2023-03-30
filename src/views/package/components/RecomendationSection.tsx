import { ForwardArrowIcon, SmilesIcon } from '@assets/icons'
import Button from '@components/atoms/Button'
import GradientCover from '@components/atoms/GradientCover'
import useMediaQuery from '@hooks/useMediaQuery'
import { convertToCurrency } from '@utils/currency'
import { useTranslation } from 'next-i18next'
import { default as NextImage } from 'next/future/image'

const RecomendationSection = ({}) => {
  const isMobile = useMediaQuery('(max-width: 768px)')

  const recomendationCard = () => {
    const { i18n, t } = useTranslation(['package-page', 'common'])

    return (
      <>
        <GradientCover
          position={{ left: isMobile ? '47%' : '55%', top: '50%' }}
          width={isMobile ? '100%' : '110%'}
          height={'100%'}
          rotation={isMobile ? 12 : 90}
        />
        <NextImage
          src={'/assets/images/bird.png'}
          alt=""
          width={1920}
          height={582}
          className={'h-[582px] w-[1000px] object-cover md:h-[582px]'}
        />

        <div className="absolute top-[204px] z-10 pl-4  md:top-20 md:pl-9">
          <p
            className={
              'mb-4 font-secondary text-paragraph-small font-medium uppercase tracking-[4px] md:mb-6 md:font-secondary md:text-paragraph-small md:tracking-[4px] md:text-white'
            }
          >
            fortaleza, ce
          </p>
          <h3
            className={
              'mb-6 w-full max-w-[300px] font-light md:w-auto md:max-w-[641px] md:text-h3-desktop'
            }
          >
            Sensações à beira mar em uma aldeia de pescadores no Ceará
          </h3>
          <p
            className={`mr-1 mb-6 flex max-w-[268px] flex-col text-tag font-bold uppercase md:max-w-[500px] md:flex-row md:text-paragraph-medium`}
          >
            <p className={'flex flex-row  tracking-[4px] text-white'}>
              <p className={'mr-1 md:mr-0'}>
                {`4 ${t('nights', {
                  ns: 'common',
                })}`}
                {t('initial-price', { ns: 'common' })}
                {convertToCurrency({ rawNumber: 2600, locale: i18n.language })}
                {` / ${t('per-person', { ns: 'common' })}`}
              </p>
            </p>
          </p>
          {!isMobile && (
            <div className={'mt-5 mb-8 flex flex-row items-center'}>
              <p className={'mr-2 text-paragraph-small font-normal text-white'}>
                acumule até
              </p>
              <SmilesIcon className={'w-5'} />
              <p className={'ml-2 text-paragraph-small font-bold text-white'}>
                1.240 milhas Smiles
              </p>
            </div>
          )}
          <Button
            buttonType={'primary'}
            className={'button-extra-small md:button-small'}
            Icon={ForwardArrowIcon}
            reverseIcon
          >
            {t('buy')}
          </Button>
        </div>
      </>
    )
  }

  return (
    <article
      className={`relative mb-9 mt-7 flex flex-col items-start justify-center overflow-hidden rounded-md px-6 font-primary text-gray-0 md:h-[632px] md:max-w-[100%] md:px-11`}
    >
      {recomendationCard()}
    </article>
  )
}

export default RecomendationSection
