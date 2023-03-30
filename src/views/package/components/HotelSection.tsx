import React from 'react'
import { useTranslation } from 'next-i18next'
import {
  DollarIcon,
  HotelBedIcon,
  KeyToIconMapper,
} from '../../../assets/icons'
import Carousel, { CarouselItem } from 'src/components/organisms/Carousel'
import useMediaQuery from '@hooks/useMediaQuery'
import LinkWithLocale from '@components/atoms/LinkWithLocale'
import { Hotel } from '@models/Hotel'
import { packageMock } from '@api/packages/data/mocks/packageMock'
import { PackageMapper } from '@api/packages/mappers/PackageMapper'

type Props = {
  hotel: Hotel
}

export const HotelSection = ({ hotel }: Props) => {
  const { t } = useTranslation('package-page')
  const isMobile = useMediaQuery('(max-width: 768px)')
  const areThereImages = Boolean(hotel.images?.length)

  const carouselItems: CarouselItem[] =
    hotel.images?.map((image) => ({
      image: { id: image.src, src: image.src },
    })) ?? []

  const renderCarouselItem = (item: CarouselItem) => (
    <img
      width={1080}
      height={812}
      src={item.image?.src || '/assets/images/bird.png'}
      alt="Image"
      className={`mt-12 h-[324px] w-full object-cover md:object-cover lg:h-[65vh]`}
    />
  )

  const renderAccommodationDetails = () => (
    <section className="flex w-full flex-col items-center justify-between gap-7 lg:flex-row lg:gap-14 ">
      <h3
        className={`${
          areThereImages ? 'hidden' : 'hidden lg:flex'
        } self-center font-bold capitalize text-white lg:text-h4-desktop`}
      >
        {t('accommodation')}
      </h3>
      <div className=" flex flex-col items-start px-6 pt-9 lg:px-0 lg:pt-11">
        <h6
          className={`mb-2 font-secondary text-tag font-bold uppercase leading-4 text-primary md:mb-0 md:text-paragraph-medium`}
        >
          {t('about-accommodation')}
        </h6>
        <h3
          className={`mb-3 text-start font-bold md:mt-4 md:mb-4 lg:text-h4-desktop`}
        >
          {hotel.name}
        </h3>
        <p
          className={`max-w-[400px] text-start text-paragraph-medium leading-5 text-gray-40 line-clamp-4`}
        >
          {hotel.description}
        </p>
        <div
          className={
            'mt-4 mb-9 rounded-sm bg-pink-100 py-2 px-3 font-secondary text-tag text-black md:mb-8'
          }
        >
          {t('refundable-rate')}
        </div>
        <ul
          className={`${
            areThereImages ? 'flex flex-col' : 'grid grid-cols-2 gap-4 gap-x-21'
          } justify-start`}
        >
          {PackageMapper(packageMock).hotels[0].facilities?.map(
            (item: any, index: number) => (
              <li className={`flex items-center`} key={index}>
                {/* {KeyToIconMapper[item.icon] &&
                  React.createElement(KeyToIconMapper[item.icon], {
                    width: 24,
                    height: 24,
                    className: `inline-block`,
                  })} */}
                <h3
                  className={`inline-block font-primary text-caption font-bold leading-5 text-white`}
                >
                  {item.title}
                </h3>
              </li>
            ),
          )}
          <LinkWithLocale
            className="my-8 flex items-start font-primary text-tag text-primary"
            href="/"
          >
            <DollarIcon className={'mr-2 h-5 w-5'} />
            {t('cancellation-policy')}
          </LinkWithLocale>
          <LinkWithLocale
            className="my-8 flex items-start font-primary text-tag text-primary"
            href="/"
          >
            <HotelBedIcon className={'mr-2 h-5 w-5'} />
            {t('hotel-policy')}
          </LinkWithLocale>
        </ul>
      </div>
    </section>
  )

  return (
    <section
      className={`flex flex-col justify-between border-b border-b-gray-80 md:mx-11 md:flex-row md:pb-11`}
    >
      <div
        className={`z-10 flex flex-col items-start overflow-hidden text-center text-black-contrast ${
          areThereImages ? 'md:max-w-[40%]' : 'w-full justify-between lg:mr-15'
        }`}
      >
        {renderAccommodationDetails()}
      </div>
      {areThereImages ? (
        <Carousel
          data={carouselItems}
          renderItem={renderCarouselItem}
          containerClassName={'relative flex-1 md:max-w-[56%]'}
          carouselOptions={{
            type: 'loop',
            pagination: false,
            arrows: false,
            drag: false,
            autoplay: false,
          }}
          controlsOptions={{
            align: 'center',
            backArrow: true,
            forwardArrow: true,
            show: true,
            isDotTrack: true,
          }}
        />
      ) : null}
    </section>
  )
}

export default HotelSection
