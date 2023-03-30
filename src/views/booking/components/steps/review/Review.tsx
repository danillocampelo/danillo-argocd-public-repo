import React, { FC, useEffect, useRef } from 'react'
import { useTranslation } from 'next-i18next'
import { useCheckoutContext } from '@contexts/CheckoutContext'

import { useCheckRate } from '@api/booking/hooks/useCheckRate'

import Table from '@components/molecules/Table'

import { PeopleReview } from '@views/booking/components/table/PeopleReview'
import { FlightsReview } from '@views/booking/components/table/FlightsReview'
import { HotelReview } from '@views/booking/components/table/HotelReview'
import { RoadmapReview } from '@views/booking/components/table/RoadmapReview'
import { AdditionalsReview } from '@views/booking/components/table/AdditionalsReview'
import { CheckoutFormData } from '@contexts/CheckoutContext/CheckoutContext'
import { CheckoutStorageKeys } from '@views/booking/checkoutStorageKeys'
import { Flight } from '@models/Flight'
import { PackageAvailability } from '@api/availability/AvailabilityServiceApi'
import { useBookingData } from '@views/booking/hooks/useBookingData'
import { ContentProps } from '../../BookingController'

const getFlightKeys = (departureFlight?: Flight, returnFlight?: Flight) => {
  let flightKeys: { departKey: string; returnKey: string } | undefined

  if (departureFlight && returnFlight)
    flightKeys = departureFlight.keyPairs![returnFlight.number]

  return flightKeys
}

type Props = {
  packageAvailability: PackageAvailability
} & Pick<ContentProps<any>, 'notify' | 'setNextStepDisabled' | 'setLoading'>

const Review: FC<Props> = ({
  notify,
  setNextStepDisabled,
  setLoading,
  packageAvailability,
}) => {
  const { t } = useTranslation(['checkout', 'common'])

  const { formData, setTotalAmount, setTotalFees, setBookingId } =
    useCheckoutContext()

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

  sessionStorage.setItem(
    CheckoutStorageKeys.PACKAGE_AVAILABILITY,
    JSON.stringify(packageAvailability),
  )

  sessionStorage.setItem(
    CheckoutStorageKeys.FORM_DATA,
    JSON.stringify(checkoutFormData),
  )

  const { mutate: getCheckRate } = useCheckRate({
    onSuccess: (res) => {
      const bookingId = String(res.bookingId)

      sessionStorage.setItem(CheckoutStorageKeys.BOOKING_ID, bookingId)
      setBookingId(bookingId)
      setNextStepDisabled(false)
      setLoading(false)
    },
    onError: () => {
      notify({ message: t('review.error'), type: 'error', duration: 5 })
      setNextStepDisabled(true)
      setLoading(false)
    },
  })

  const hasCheckedRate = useRef(false)

  const people = formData.getPeople()

  const { hotel, flights, occupancy, prices, rooms } = useBookingData({
    packageAvailability,
    checkoutFormData,
  })

  const flightKeys = getFlightKeys(flights.departure, flights.return)

  const { total: orderTotal, fees: orderFees } = prices
  const { total: hotelAmount, fees: hotelFees } = prices.hotel
  const { total: flightsAmount, fees: flightsFees } = prices.flights

  useEffect(() => {
    if (hasCheckedRate.current) return
    setNextStepDisabled(true)
    setLoading(true)

    getCheckRate({
      checkoutMetadata: packageAvailability.checkoutMetadata,
      persons: people,
      hotelId: hotel.id,
      roomIds: checkoutFormData.roomsId || [],
      flightIds: [flightKeys!.departKey, flightKeys!.returnKey],
      hotelProvider: hotel.provider,
    })

    setTotalAmount(hotelAmount + flightsAmount)
    setTotalFees(hotelFees + flightsFees)

    hasCheckedRate.current = true
  }, [])

  const tableRows = [
    {
      icon: 'peopleGroup',
      title: t('table.people'),
      content: <PeopleReview people={people} />,
    },
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
        <HotelReview hotel={hotel} rooms={rooms} occupancy={occupancy} />
      ),
    },
    {
      icon: 'roadmap',
      title: t('table.itinerary'),
      content: <RoadmapReview roadmap={packageAvailability.roadMap} />,
      disabled: !packageAvailability.roadMap?.days.length,
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
    <Table
      title={t('table.review-title')}
      rows={tableRows}
      totalFees={orderFees}
      amount={orderTotal}
    />
  )
}

export default Review
