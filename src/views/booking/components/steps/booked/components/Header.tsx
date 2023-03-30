import { FC, useContext } from 'react'
import { useTranslation } from 'next-i18next'

import {
  MarkerIcon,
  GooglePlayIcon,
  AppstoreIcon,
  MoonIcon,
  MapIcon,
  GroupIcon,
  CalendarIcon,
  TakeoffIcon,
} from '@assets/icons'
import GradientCover from '@components/atoms/GradientCover'
import LinkWithLocale from '@components/atoms/LinkWithLocale'
import { Button } from '@components/index'
import { LocaleContext } from '@contexts/LocaleContext'
import { ROUTES } from '@utils/constants/routes'
import { Themes } from '@utils/constants/theme'
import { getDateRange } from '@utils/time'
import { Order } from '@models/Order'
import { Package } from '@models/Package'

type Props = {
  order: Order
  packageData: Package
  bookingId: string
}

export const BookedHeader: FC<Props> = ({ order, packageData, bookingId }) => {
  const { t } = useTranslation(['checkout', 'common'])
  const { locale } = useContext(LocaleContext)

  const printReview = () => {
    window.print()
  }

  const calculateDateRange = () => {
    const endDate = new Date(order.startDate)
    endDate.setDate(endDate.getDate() + order.duration)

    return getDateRange(order.startDate, endDate, locale)
  }

  return (
    <header className="relative z-10 w-full overflow-hidden bg-black px-6 py-7 text-white xl:p-11">
      <img
        src={order.package.cover.src}
        alt=""
        className="absolute top-0 left-0 z-[-1] h-full w-full object-cover"
      />
      <GradientCover
        className="left-1/2 top-1/2 z-[-1] h-[100%] w-[101%] max-xl:hidden"
        rotation={90}
      />
      <GradientCover
        className="left-1/2 top-1/2 z-[-1] h-[100%] w-[101%] xl:hidden"
        gradient={['rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.6)']}
      />
      <strong className="text-button">{`${t(
        'booked.order',
      )} #${bookingId}`}</strong>
      <h5 className="pb-2 pt-7 xl:pb-4">{t('booked.title')}</h5>
      <p className="pb-7 text-h5-mobile font-light xl:max-w-[43.75rem] xl:text-h3-mobile">
        {t('booked.message')}
      </p>
      <section className="flex flex-col gap-7 pb-11 xl:flex-row xl:gap-8 xl:pb-[10.875rem]">
        <LinkWithLocale
          href={ROUTES.concierge()}
          target="_blank"
          rel="noreferrer noopener"
        >
          <Button
            theme={Themes.dark}
            buttonType="secondary"
            Icon={MarkerIcon}
            className="button-small w-full xl:w-auto"
            reverseIcon
          >
            {t('booked.talk-to-concierge')}
          </Button>
        </LinkWithLocale>

        <div className="flex justify-between xl:gap-8">
          <LinkWithLocale href={ROUTES.googlePlay()}>
            <GooglePlayIcon />
          </LinkWithLocale>
          <LinkWithLocale href={ROUTES.appStore()}>
            <AppstoreIcon />
          </LinkWithLocale>
        </div>
      </section>
      <section className="flex flex-col justify-between gap-7 xl:flex-row">
        <div>
          <h2 className="pb-2 font-light">{order.package.title}</h2>
          <p className="pb-7 text-paragraph-medium">{packageData.subtitle}</p>
          <ul className="flex flex-col gap-2 text-button xl:flex-row xl:gap-6 ">
            <li className="flex items-center gap-2">
              <MoonIcon className="w-[29px]" />
              {`${order.duration} ${t('common:nights')}`}
            </li>
            <li className="flex items-center gap-2">
              <MapIcon className="w-[29px]" />
              {`${order.package.destination.city.name.split(',')[0]}`}
            </li>
            <li className="flex items-center gap-2">
              <GroupIcon className="w-[29px]" />
              {`${2} ${t('booked.travelers')}`}
            </li>
            <li className="flex items-center gap-2">
              <CalendarIcon className="w-[29px]" />
              {`${calculateDateRange()}`}
            </li>
            <li className="flex items-center gap-2">
              {order.flights[0].route?.from?.iata?.name}
              <TakeoffIcon className="w-[29px]" />
              {order.flights[0].route?.to?.iata?.name}
            </li>
          </ul>
        </div>
        <Button
          buttonType="secondary"
          theme={Themes.dark}
          type="button"
          onClick={printReview}
          className="button-small w-full self-end xl:w-auto"
        >
          {t('print-summary')}
        </Button>
      </section>
    </header>
  )
}
