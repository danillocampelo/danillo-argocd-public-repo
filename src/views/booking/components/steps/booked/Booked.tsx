import { FC, useEffect, useState } from 'react'

import useOrder from '@api/orders/hooks/useOrder'
import { Skeleton } from '@components/atoms/Skeleton'
import { useTranslation } from 'next-i18next'
import { FlightsReview } from '@views/booking/components/table/FlightsReview'
import { HotelReview } from '@views/booking/components/table/HotelReview'
import { RoadmapReview } from '@views/booking/components/table/RoadmapReview'
import Table from '@components/molecules/Table/Table'
import { BookedHeader } from './components/Header'
import {
  CheckoutFormData,
  useCheckoutContext,
} from '@contexts/CheckoutContext/CheckoutContext'
import { PackageServices } from './components/PackageServices'
import { AdditionalsReview } from '@views/booking/components/table/AdditionalsReview'
import { useBookingData } from '@views/booking/hooks/useBookingData'
import { useSmilesServicesList } from '@views/booking/hooks/useSmilesServicesList'
import { ContentProps } from '../../BookingController'
import { CheckoutRequiredData } from '@views/booking/checkout/Checkout'

export const Booked = ({
  requiredData: { packageAvailability, packageData },
}: ContentProps<CheckoutRequiredData>) => {
  const { t } = useTranslation('checkout')
  const { formData, bookingId } = useCheckoutContext()

  const servicesList = useSmilesServicesList()

  const { data: order, isLoading } = useOrder({
    orderId: bookingId,
    queryOptions: { enabled: Boolean(bookingId) },
  })

  const checkoutFormData: CheckoutFormData = {
    departureDate: formData.getDepartureDate(),
    departureFlightId: formData.getDepartureFlightId(),
    hotelId: formData.getHotelId(),
    originId: formData.getOriginId(),
    originQuery: formData.getOriginQuery(),
    people: formData.getPeople(),
    returnDate: formData.getReturnDate(),
    returnFlightId: formData.getReturnFlightId(),
    roomsId: formData.getRoomIds(),
    roomsQuantities: formData.getRoomsQuantities(),
  }

  if (isLoading)
    return (
      <div className="flex w-full flex-col gap-4 md:gap-8">
        <Skeleton className="h-[200px] w-full md:h-[900px]" />
        <Skeleton className="mx-6 h-6 md:mx-11 md:h-8 md:w-[480px]" />
        <Skeleton className="mx-6 h-[500px] md:mx-11 md:h-[1500px]" />
      </div>
    )

  if (
    !order ||
    !bookingId ||
    !checkoutFormData ||
    !packageData ||
    !packageAvailability
  )
    return <></>

  const { prices, flights, hotel, rooms } = useBookingData({
    checkoutFormData,
    packageAvailability,
  })

  const { total: orderTotalPrice, fees: feesTotalPrice } = prices

  const tableRows = [
    {
      icon: 'plane-up',
      title: t('table.flight'),
      content: <FlightsReview flights={Object.values(flights)} />,
    },
    {
      icon: 'bed',
      title: t('table.accomodation-info.title'),
      tagText: t('table.accomodation-info.refundable-fare'),
      content: (
        <HotelReview
          hotel={hotel}
          rooms={rooms}
          occupancy={order.people.length}
        />
      ),
    },
    {
      icon: 'roadmap',
      title: t('table.itinerary'),
      content: <RoadmapReview roadmap={packageData?.roadMap} />,
      disabled: !packageData?.roadMap?.days.length,
    },
    {
      icon: 'loupe',
      title: t('table.additional-services'),
      content: (
        <AdditionalsReview
          servicesWithTotals={packageAvailability.servicesWithTotals}
        />
      ),
    },
  ].filter((row) => !row.disabled)

  return (
    <main className="flex h-full w-full flex-col items-center justify-center ">
      <BookedHeader
        packageData={packageData!}
        order={order}
        bookingId={bookingId}
      />
      <Table
        miles={packageData?.packageDefault?.miles}
        title={t('table.booked-title')}
        rows={tableRows}
        totalFees={feesTotalPrice}
        amount={orderTotalPrice}
      />

      <div className="mx-6 mt-2 mb-9 md:mx-7 lg:mx-9 2xl:mx-11">
        <PackageServices services={servicesList} />
      </div>
    </main>
  )
}
