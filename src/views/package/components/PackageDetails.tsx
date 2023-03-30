import { Parallax } from 'react-scroll-parallax'
import React, { useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Package } from '@models/Package'
import { DownArrowIcon } from '@assets/icons'
import useMediaQuery from '@hooks/useMediaQuery'
import PlaneWindowImage from '@components/atoms/PlaneWindowImage'
import { PackageBanner, packageDetailsScroll } from './PackageBanner'
import Button from '@components/atoms/Button'
import { Themes } from '@utils/constants/theme'

export const PackageDetails = (packageData: Package) => {
  const [, setCatchphraseScrollProgress] = useState(0)
  const { t } = useTranslation(['package-page', 'common'])
  const isMobile = useMediaQuery('(max-width: 768px)')

  const [firstImage, secondImage] = packageData.images || []

  return (
    <main
      className={`flex flex-col items-center gap-12 font-primary text-primary-contrast`}
    >
      <PackageBanner packageData={packageData} />

      <section
        id={'packageDetailsScroll'}
        className={`flex w-full flex-col items-center gap-12 px-6 md:px-8 lg:px-11`}
      >
        <Button
          buttonType="secondary"
          Icon={DownArrowIcon}
          theme={Themes.dark}
          className="button-small flex self-center justify-self-end border-gray-40 lg:mt-12 lg:hidden lg:w-[29vw]"
          reverseIcon={true}
          onClick={packageDetailsScroll}
        >
          {t('discover-region')}
        </Button>
        <article className="flex w-full flex-col items-center gap-12 lg:flex-row lg:justify-between">
          {firstImage.src && (
            <>
              <img
                src={firstImage.src || ''}
                alt={'first package image'}
                className="hidden h-[48vh] w-[40vw] lg:flex"
              />
              <PlaneWindowImage
                size="large"
                imageSrc={firstImage.src || ''}
                className="flex lg:hidden"
              />
            </>
          )}
          <div className="flex flex-col items-center justify-center gap-12 text-white lg:max-w-[52%] lg:items-start">
            <h2 className="text-center font-primary text-h2-mobile font-light md:text-h2-desktop lg:text-left">
              {packageData.subtitle}
            </h2>
            <p className="w-full text-center text-[1.25rem] text-gray-40 lg:text-left">
              {packageData.texts && packageData.texts[0]?.description}
            </p>
          </div>
        </article>
        <article className="flex w-full flex-col gap-12 lg:flex-row-reverse lg:justify-between">
          <div className="flex justify-center gap-12 lg:items-center">
            {secondImage.src && (
              <>
                <img
                  src={secondImage.src || ''}
                  alt={'second package image'}
                  className="hidden h-[48vh] w-[40vw] lg:flex"
                />
                <PlaneWindowImage
                  size="large"
                  imageSrc={secondImage.src || ''}
                  className="flex lg:hidden"
                />
              </>
            )}
          </div>
          <div className="flex flex-col items-center justify-center text-white lg:max-w-[52%] lg:items-start">
            <p className="w-full text-center text-[1.25rem] text-gray-40 lg:text-left">
              {packageData.texts && packageData.texts[1]?.description}
            </p>
          </div>
        </article>
      </section>
      <Parallax
        onProgressChange={(progress) => setCatchphraseScrollProgress(progress)}
      >
        <div className={'px-6 md:px-8'}>
          <h2
            className={`border-grey-40 }
            border-b pb-11 text-center text-h3-mobile font-light text-white md:text-h3-desktop lg:max-w-[77vw] lg:border-gray-80`}
          >
            {packageData.texts && packageData.experience?.description}
          </h2>
        </div>
      </Parallax>
    </main>
  )
}

export default PackageDetails
