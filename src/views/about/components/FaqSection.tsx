import { useTranslation } from 'next-i18next'
import { FaqSectionCarousel } from './FaqSectionCarousel'
import LinkWithLocale from '@components/atoms/LinkWithLocale'
import Button from '@components/atoms/Button'
import { ROUTES } from '@utils/constants/routes'

export type CategoryData = {
  category: string
  questions: Questions[]
}

type Questions = {
  title: string
  summary: string
}

export const FaqSection = ({}) => {
  const { t } = useTranslation('about-page')
  const faqData = t('faq-data', { returnObjects: true }) as CategoryData[]

  return (
    <main
      className={
        'flex flex-1 flex-col justify-between pt-9 md:flex-row md:py-18'
      }
    >
      <div className={'w-full max-md:max-w-[70vw] md:max-w-[555px]'}>
        <h2
          className={'text-h3-mobile font-light text-white md:text-h2-desktop'}
        >
          {t('faq-title')}
        </h2>
        <h6
          className={
            'mt-6 text-paragraph-medium font-normal text-white md:mt-10 md:max-w-[352px] md:text-h6-desktop'
          }
        >
          {t('faq-subtitle')}
        </h6>
        <LinkWithLocale
          target="_blank"
          rel="noopener noreferrer"
          href={ROUTES.whatsapp()}
        >
          <Button buttonType="primary" className="button-small mt-7">
            {t('contact-us')}
          </Button>
        </LinkWithLocale>
      </div>
      <div className="w-full md:w-[57%]">
        <FaqSectionCarousel categoryData={faqData} />
      </div>
    </main>
  )
}
