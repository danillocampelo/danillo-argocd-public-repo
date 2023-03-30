import React, { FC, useState } from 'react'
import { Hotel } from '@models/Hotel'
import { GalleryModal } from '../GalleryModal'
import { useTranslation } from 'next-i18next'
import { useLocaleContext } from '@contexts/LocaleContext'
import RadioOption from '@components/atoms/RadioOption'
import Tag from '@components/atoms/Tag'
import Collapse from '@components/atoms/Collapse'
import Button from '@components/atoms/Button'
import IconTextList from '@components/atoms/IconTextList'
import { Panel } from '@components/atoms/Collapse/Collapse'
import {
  CalendarTodayIcon,
  GalleryIcon,
  MoonIcon,
  PaintedStarIcon,
} from '@assets/icons'
import { Themes } from '@utils/constants/theme'
import dayjs from 'dayjs'
import { formatDate } from '@utils/formatDate'
import { convertToCurrency } from '@utils/currency'

type Props = {
  hotel: Hotel
  currentValue: string
  wide?: boolean
}

export const HotelCard: FC<Props> = ({ hotel, currentValue, wide = false }) => {
  const { t } = useTranslation(['checkout', 'common'])
  const { locale } = useLocaleContext()
  const [open, setOpen] = useState(false)
  const images = hotel.images?.map((image) => ({ image })) || []

  const GalleryContent = ({ hotel }: { hotel: Hotel }) => {
    return (
      <div className="hidden max-w-[500px] flex-col gap-6 overflow-y-scroll p-6 scrollbar-hide md:p-11 lg:flex">
        <h2 className="text-h2-mobile font-light">{hotel.name}</h2>
        <p>{hotel.description}</p>
        <h3 className="text-h3-mobile font-light">
          {t('accommodation.offers')}
        </h3>
        <IconTextList
          className={'flex flex-col gap-2 font-normal'}
          metainfos={hotel.metainfos}
        />
      </div>
    )
  }

  return (
    <RadioOption
      currentValue={currentValue}
      value={hotel.id}
      buttonClassName="absolute top-6 left-6 z-10"
      className={`flex-shrink-0 rounded ${
        wide
          ? 'md:flex md:max-h-[356px] md:w-full'
          : 'flex w-[15.875rem] flex-col md:w-[25rem]'
      }`}
    >
      <GalleryModal
        isOpen={open}
        setIsOpen={setOpen}
        carouselItems={images}
        content={<GalleryContent hotel={hotel} />}
      />
      <div
        className={`relative ${wide && 'min-width-[300px] lg:min-w-[400px]'}`}
      >
        <img
          width={400}
          height={300}
          src={images[0]?.image.src}
          alt={''}
          className={`max-h-300 rounded-t object-cover ${
            wide && 'md:h-[356px] lg:w-[400px]'
          }`}
        />
        <button
          type="button"
          aria-disabled
          onClick={() => setOpen(true)}
          className="absolute bottom-6 left-6 text-tag-large"
        >
          <Tag Icon={GalleryIcon} theme={Themes.dark}>
            {hotel?.images?.length ?? 0}
          </Tag>
        </button>
      </div>

      <div
        className={
          wide
            ? 'p-4 md:flex md:w-full md:flex-col md:justify-between md:p-6'
            : 'flex w-[15.875rem] flex-col p-4 md:w-[25rem] md:p-6'
        }
      >
        <div
          className={
            wide ? 'border-gray-20 md:flex md:justify-between md:border-b' : ''
          }
        >
          <div>
            <h6 className="pb-2 text-paragraph-medium font-bold md:pb-4 md:text-h6-desktop">
              {hotel.name}
            </h6>
            <div
              className={`flex flex-wrap gap-2 border-b border-gray-20 pb-7 ${
                wide && 'md:border-none'
              }`}
            >
              <Tag Icon={PaintedStarIcon} className="text-tag-large">
                {hotel.stars}
              </Tag>

              <Tag Icon={MoonIcon} className="md:text-tag-large">
                {hotel.days ?? 0}
              </Tag>
            </div>
          </div>
          <div
            className={`flex items-center gap-8 border-b border-gray-20 py-4 md:gap-13 md:py-6 ${
              wide && 'md:border-none md:px-4'
            }`}
          >
            <div className="flex flex-col">
              <span className="text-tag">{t('accommodation.check-in')}</span>
              <div className="flex pt-1 md:pt-2">
                <CalendarTodayIcon className="hidden w-6 md:block" />
                <span className="text-caption md:pl-1">
                  {dayjs(hotel.startDate).format(formatDate[locale])}
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-tag">{t('accommodation.check-out')}</span>
              <div className="flex pt-1 md:pt-2">
                <CalendarTodayIcon className="hidden w-6 md:block" />
                <span className="text-caption md:pl-1">
                  {dayjs(hotel.endDate).format(formatDate[locale])}
                </span>
              </div>
            </div>
          </div>
        </div>
        <IconTextList
          className={
            wide
              ? 'hidden md:flex md:flex-col md:gap-2 md:border-b md:border-gray-20 md:pb-6 md:font-normal lg:pt-6'
              : 'hidden'
          }
          metainfos={hotel.metainfos?.slice(0, 2)}
        />
        <Collapse
          className={`flex flex-col rounded-none border-0 text-paragraph-medium font-bold ${
            wide && 'md:hidden'
          }`}
        >
          <Panel header={t('accommodation.more-info')} key={hotel.name}>
            <IconTextList
              className="flex flex-col gap-2 border-b border-gray-20 pb-6 font-normal lg:pt-6"
              metainfos={hotel.metainfos?.slice(0, 3)}
            />
          </Panel>
        </Collapse>
        <div className={wide ? 'md:flex md:items-end md:justify-between' : ''}>
          <div className="flex flex-col gap-1 pt-4 md:pt-6">
            <span className="text-tag font-normal">
              {`${t('accommodation.starting-at')}`}
            </span>
            <h6 className="text-h6-desktop font-bold">
              {convertToCurrency({
                rawNumber: hotel.price?.amount || 0,
                currency: hotel.price?.currency,
              })}
            </h6>
          </div>
          <Button
            className={wide ? 'hidden md:block' : 'hidden'}
            buttonType="tertiary"
            onClick={() => setOpen(true)}
          >
            {t('accommodation.more-info')}
          </Button>
        </div>
      </div>
    </RadioOption>
  )
}
