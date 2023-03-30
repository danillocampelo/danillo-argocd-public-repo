import { FunctionComponent } from 'react'
import { useTranslation } from 'next-i18next'
import { Order } from '@models/Order'
import { PersonType } from '@models/Person'
import { Flight, FlightType } from '@models/Flight'
import { GlobeIcon, MoonIcon, StarIcon } from '@assets/icons'
import { FlightDetails } from './FlightDetails'
import { OrderPerson } from './OrderPerson'

type Props = {
  order: Order
}

export const OrderData: FunctionComponent<Props> = ({ order }) => {
  const { i18n, t } = useTranslation(['order-page'])

  const departFlight = order.flights.filter(
    (flight) => flight.type === FlightType.DEPART,
  )

  const returnFlights = order.flights.filter(
    (flight) => flight.type === FlightType.RETURN,
  )

  const adultTravellers = order.people.filter(
    (person) => person.type === PersonType.ADULT,
  )

  const childTravellers = order.people.filter(
    (person) => person.type === PersonType.CHILD,
  )

  return (
    <article>
      <section className="w-full lg:w-3/5">
        <p className="font-semibold md:text-paragraph-medium 2xl:text-h6-desktop">
          {t('order-details')} {order.id}
        </p>
        <h4 className="py-6 font-bold md:py-7 md:text-h3-desktop 2xl:text-h2-desktop">
          {order.package.title}
        </h4>
      </section>

      <div className="flex">
        <div className="mr-5  flex max-w-[40%] items-start md:mr-8">
          <div>
            <GlobeIcon className="mr-3 mt-1 h-6 w-6 md:mr-4" />
          </div>
          <p className="text-paragraph-small font-bold max-2xl:mt-1 md:max-w-full md:text-paragraph-medium 2xl:text-h6-desktop">
            {order.package.destination?.city.name}
          </p>
        </div>

        <div className="mr-6 flex items-start md:mr-9">
          <MoonIcon className="mr-2 w-7 md:mr-3" />
          <p className="text-paragraph-small font-bold max-2xl:mt-1 md:text-paragraph-medium 2xl:text-h6-desktop">
            {order.duration} {t('nights')}
          </p>
        </div>

        <div className="flex items-start">
          <StarIcon className="mr-2 w-7 md:mr-3" />
          <p className="text-paragraph-small font-bold max-2xl:mt-1 md:text-paragraph-medium 2xl:text-h6-desktop">
            {order.hotels[0].stars}
          </p>
        </div>
      </div>

      <section className="border-b border-gray-10 pt-11 md:border-b-2">
        <h5 className="self-start pb-8 font-bold 2xl:text-h4-desktop">
          {t('passengers')}
        </h5>

        <div className="grid grid-cols-1 gap-x-6 md:grid-cols-2">
          {adultTravellers.map((person, index) => {
            const adultNumber = String(index + 1).padStart(2, '0')
            return (
              <OrderPerson
                key={`adult-${adultNumber}`}
                displayText={`${t('adult')} ${adultNumber}`}
                person={person}
              />
            )
          })}

          {childTravellers.map((person, index) => {
            const childNumber = String(index + 1).padStart(2, '0')
            return (
              <OrderPerson
                key={`child-${childNumber}`}
                displayText={`${t('child')} ${childNumber}`}
                person={person}
              />
            )
          })}
        </div>
      </section>

      <section className="border-b-2 border-gray-10 pt-10 md:py-9 2xl:pt-14">
        <h5 className="pb-8 font-bold 2xl:text-h4-desktop">{t('flights')}</h5>

        <div className="grid grid-cols-1 gap-x-8 lg:grid-cols-2">
          <div>
            <p className="pb-2 text-paragraph-small font-bold uppercase text-gray-60">
              {t('outbound')}
            </p>

            {departFlight.map((flight, index) => (
              <FlightDetails
                flight={flight as Flight}
                language={i18n.language}
                key={`depart-flight-${index}`}
              />
            ))}
          </div>

          <div className="max-lg:pt-7">
            <p className="pb-2 text-paragraph-small font-bold uppercase text-gray-60">
              {t('return')}
            </p>

            {returnFlights.map((flight, index) => (
              <FlightDetails
                flight={flight as Flight}
                language={i18n.language}
                key={`return-flights-${index}`}
              />
            ))}
          </div>
        </div>
      </section>
    </article>
  )
}
