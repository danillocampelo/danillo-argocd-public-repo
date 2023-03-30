import React, { FC } from 'react'
import { convertToCurrency } from '@utils/currency'
import { reduceItemPrices } from '@utils/calculateTotalPrice'
import { useTranslation } from 'next-i18next'
import { Room } from '@models/Room'
import { Hotel } from '@models/Hotel'

const titleSharedClasses = 'text-paragraph-medium text-bold xl:text-h5-mobile'
const textSharedClasses =
  'mt-2 text-paragraph-small text-gray-90 xl:text-paragraph-medium'

type Props = {
  hotel: Omit<Hotel, 'startDate' | 'endDate'>
  rooms: Room[]
  occupancy: number
}

export const HotelReview: FC<Props> = ({ hotel, rooms, occupancy }) => {
  const { t, i18n } = useTranslation('checkout')
  const hotelTotalPrice = reduceItemPrices(rooms)

  return (
    <section className="grid gap-y-7 md:grid-cols-3 md:justify-between md:gap-x-5 xl:grid-cols-6">
      <div>
        <strong className={titleSharedClasses}>
          {t('table.accomodation-info.hotel')}
        </strong>
        <p className={textSharedClasses}>{hotel?.name}</p>
      </div>

      <div>
        <strong className={titleSharedClasses}>
          {t('table.accomodation-info.rooms-quantity')}
        </strong>
        <p className={textSharedClasses}>{rooms.length}</p>
      </div>

      <div>
        <strong className={titleSharedClasses}>
          {t('table.accomodation-info.rooms-category')}
        </strong>
        <ol>
          {Object.values(rooms).map((room, index) => (
            <li key={`room-${index}`} className={textSharedClasses}>
              {room.title}
            </li>
          ))}
        </ol>
      </div>

      <div>
        <strong className={titleSharedClasses}>
          {t('table.accomodation-info.people-quantity')}
        </strong>
        <p className={textSharedClasses}>{occupancy}</p>
      </div>

      <div>
        <strong className={titleSharedClasses}>
          {t('table.accomodation-info.price-per-person')}
        </strong>
        <p className={textSharedClasses}>
          {convertToCurrency({
            rawNumber: hotelTotalPrice / occupancy,
            locale: i18n.language,
          })}
        </p>
      </div>

      <div>
        <strong className={titleSharedClasses}>
          {t('table.accomodation-info.total-price')}
        </strong>
        <p className={textSharedClasses}>
          {convertToCurrency({
            rawNumber: hotelTotalPrice,
            locale: i18n.language,
          })}
        </p>
      </div>
    </section>
  )
}
