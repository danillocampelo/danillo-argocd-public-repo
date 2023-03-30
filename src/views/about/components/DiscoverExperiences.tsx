import { ROUTES } from '@utils/constants/routes'
import { useTranslation } from 'next-i18next'
import Image from 'next/future/image'
import Button from 'src/components/atoms/Button/Button'
import LinkWithLocale from 'src/components/atoms/LinkWithLocale'
import { Themes } from 'src/utils/constants/theme'

export const DiscoverExperiences = () => {
  const { t } = useTranslation('about-page')

  return (
    <section className="flex w-full flex-col items-center justify-center border-b border-gray-80 text-black-contrast md:mb-17 ">
      <div className="flex w-full flex-col items-end justify-between whitespace-pre-line md:mt-10 md:flex-row md:items-start">
        <h3 className="font-light md:max-w-[864px] md:pr-11  md:max-xl:text-h3-desktop xl:text-h2-desktop">
          {t('change-your-experience')}
        </h3>
        <p className="pt-6 text-paragraph-medium font-normal text-gray-40 md:max-w-[45vw] md:items-end">
          {t('smiles-description')}
        </p>
      </div>
      <div className="mb-9 mt-8 flex w-full flex-col items-center justify-center md:mb-16 md:mt-11 2xl:mt-18">
        <Image
          src={'/assets/images/TravelingBoat.png'}
          alt="People cayaking on a lake"
          width={1800}
          height={860}
          className={'max-h-[680px] md:w-full md:object-none'}
        />
        <h3 className="mt-9 mb-7 justify-center font-normal md:mb-8 md:mt-12 md:text-h2-desktop">
          {t('unique-experiences')}
        </h3>
        <LinkWithLocale href={ROUTES.experiences()}>
          <Button
            className="button-small w-[150px]"
            theme={Themes.dark}
            buttonType="secondary"
          >
            {t('discover')}
          </Button>
        </LinkWithLocale>
      </div>
    </section>
  )
}
