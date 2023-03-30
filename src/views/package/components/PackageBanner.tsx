import React from 'react'
import { useTranslation } from 'next-i18next'
import { ParallaxBanner, ParallaxBannerLayer } from 'react-scroll-parallax'
import useMediaQuery from '../../../hooks/useMediaQuery'
import { Package } from '../../../models/Package'
import InformationBanner from './InformationBanner'
import { Button } from '@components/index'
import { DownArrowIcon } from '@assets/icons'
import { Themes } from '@utils/constants/theme'

export function packageDetailsScroll() {
  const element = document.getElementById('packageDetailsScroll')
  const headerOffset = 80
  const elementPosition = element?.getBoundingClientRect().top || 0
  const offsetPosition = elementPosition + window.pageYOffset - headerOffset
  window.scrollTo({
    top: offsetPosition,
    behavior: 'smooth',
  })
}

export const PackageBanner = ({ packageData }: { packageData: Package }) => {
  const { t } = useTranslation(['package-page', 'common'])
  const isMobile = useMediaQuery('(max-width: 768px)')

  return (
    <ParallaxBanner
      layers={[
        {
          image: packageData.cover.src,
          speed: -15,
        },
      ]}
      className={`flex h-[85vh] text-black-contrast lg:mb-9`}
    >
      <ParallaxBannerLayer
        className={`flex flex-col items-start justify-end bg-gradient-to-r from-[#000000ab] to-[#00000000] px-6 pb-6 md:px-11 `}
      >
        <div className="lg:max-w-[60vw]">
          <p
            className={`magazine-fade relative mb-4 overflow-hidden whitespace-nowrap text-paragraph-small font-bold uppercase tracking-wide opacity-0 md:mb-6 md:text-paragraph-medium`}
          >
            <span
              className={`magazine-reveal absolute top-0 right-0 h-full w-full bg-white`}
            ></span>
            {packageData.experience.name}
          </p>
          <h2
            className={`title-fade-slide mb-4 px-0 capitalize opacity-0 md:mb-6`}
          >
            {packageData.title.toLocaleLowerCase()}
          </h2>
          <p className="mb-6 text-paragraph-medium font-bold md:mb-11 md:text-h6-desktop">
            {packageData.subtitle}
          </p>
          <InformationBanner
            isMobile={isMobile}
            numberOfNights={packageData.packageDefault?.nights || 0}
            acommodationType={`${t('hotel', { ns: 'common' })} ${
              packageData.hotels[0].stars
            } ${t('stars')}`}
          />
        </div>
        <Button
          buttonType="secondary"
          Icon={DownArrowIcon}
          theme={Themes.dark}
          className="button-small mt-11 hidden self-center justify-self-end border-gray-40 lg:mt-12 lg:flex lg:w-[29vw]"
          reverseIcon={true}
          onClick={packageDetailsScroll}
        >
          {t('discover-region')}
        </Button>
      </ParallaxBannerLayer>
    </ParallaxBanner>
  )
}
