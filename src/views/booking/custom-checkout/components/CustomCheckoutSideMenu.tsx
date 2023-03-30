import { useTranslation } from 'next-i18next'
import { ChangeEvent, FunctionComponent, useState } from 'react'
import { LocationIcon, PencilIcon } from '@assets/icons'
import { LocationData } from '../CustomCheckout'

type Props = {
  initialDestination: LocationData
}

export const CustomCheckoutSideMenuHeader: FunctionComponent<Props> = ({
  initialDestination,
}) => {
  const { t } = useTranslation('custom-checkout')
  const [destination, setDestination] = useState(initialDestination)

  const editDestinationHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setDestination((previousValue) => ({
      ...previousValue,
      value: event.target.value,
    }))
  }

  return (
    <section className="mb-9 2xl:mb-11">
      <label htmlFor="destination-input" className="mb-6 flex items-center ">
        <div>
          <LocationIcon className="mr-2 w-5 text-primary" />
        </div>
        <p className="text-paragraph-small font-bold ">
          {t('side-menu.destination')}
        </p>
      </label>

      <div className="flex border-b border-gray-20">
        <input
          type="text"
          className="mr-7 w-full bg-transparent pb-2 text-h6-desktop font-bold outline-none"
          id="destination-input"
          value={destination.value}
          onChange={editDestinationHandler}
        />
        <button type="button" className="pl-2">
          <PencilIcon className="w-6" />
        </button>
      </div>
    </section>
  )
}
