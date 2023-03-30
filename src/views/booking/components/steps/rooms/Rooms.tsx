import React, { useMemo, useRef, useState } from 'react'
import { Splide } from '@splidejs/react-splide'
import { useTranslation } from 'next-i18next'

import { PeopleIcon } from '@assets/icons'
import { TabCarousel } from '@components/molecules/TabCarousel/TabCarousel'
import { CHECKOUT_FORM_INPUT_NAMES } from '@utils/constants/formInputName'

import { GenericSectionSelection } from '../../GenericSelectionSection'
import { RoomQuantity } from '../../RoomQuantitySelection'
import { RoomOption } from './components/RoomOption'
import Tag from '@components/atoms/Tag'
import { Hotel } from '@models/Hotel'
import { useCheckoutContext } from '@contexts/CheckoutContext'
import { TabCarouselControls } from '@components/molecules/TabCarousel/TabCarouselControls'

type Props = {
  hotels: Hotel[]
}

export const Rooms = ({ hotels }: Props) => {
  const { t } = useTranslation(['checkout', 'common'])
  const { formData } = useCheckoutContext()

  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Splide>(null)

  const roomsQuantities = formData.getRoomsQuantities() || []

  const selectedHotelId = formData.getHotelId()

  const roomCapacity = (roomQuantity: RoomQuantity) =>
    roomQuantity.adults + roomQuantity.children

  const selectedHotel = useMemo(
    () => hotels.find(({ id }) => id === selectedHotelId),
    [selectedHotelId],
  )

  const tabControlsItems = useMemo(
    () =>
      roomsQuantities.map((roomQuantity, index) => ({
        id: `room-${roomQuantity.id}`,
        tabText: `${t('roomQuantitySelection.room')} ${index + 1}`,
      })),
    [roomsQuantities],
  )

  const RoomSubtitle = ({ roomCapacity }: { roomCapacity: number }) => {
    return (
      <div className="flex w-full items-center justify-between">
        <TabCarouselControls
          currentSlideState={[currentSlide, setCurrentSlide]}
          items={tabControlsItems}
        />
        <Tag
          theme="dark"
          Icon={PeopleIcon}
          className="text-tag-large"
          data-testid="room-capacity"
        >
          {roomCapacity}
        </Tag>
      </div>
    )
  }

  const tabs = roomsQuantities.map((roomQuantity, index) => ({
    id: `room-${roomQuantity.id}`,
    content: GenericSectionSelection,
    props: {
      name: [CHECKOUT_FORM_INPUT_NAMES.roomId, index],
      key: `section-room-${index}`,
      title: t('roomSelection.title', { count: index + 1 }),
      ItemOption: RoomOption,
      selectionData: selectedHotel?.rooms || [],
      SubtitleElement: () =>
        RoomSubtitle({
          roomCapacity: roomCapacity(roomQuantity),
        }),
    },
  }))

  return (
    <TabCarousel
      tabs={tabs}
      currentSlideState={[currentSlide, setCurrentSlide]}
      splideRef={sliderRef}
      className="overflow-x-hidden"
    />
  )
}
