import { Splide } from '@splidejs/react-splide'
import { useRef, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { Form, Radio } from 'antd'

import { TabCarousel } from '@components/molecules/TabCarousel/TabCarousel'
import { TabCarouselControls } from '@components/molecules/TabCarousel/TabCarouselControls'
import { useCheckoutContext } from '@contexts/CheckoutContext'
import { CHECKOUT_FORM_INPUT_NAMES } from '@utils/constants/formInputName'
import { Tour, TourOption } from '@views/booking/components/TourOption'

const days = [
  [
    {
      id: '1',
      name: 'Tour 1',
      description: 'Tour 1 description',
      duration: 1,
      price: {
        amount: 100,
        currency: 'BRL',
      },
      miles: 100,
      unmissable: false,
      trending: true,
    },
    {
      id: '2',
      name: 'Tour 2',
      description: 'Tour 2 description',
      duration: 1,
      price: {
        amount: 1000,
        currency: 'BRL',
      },
      miles: 100,
      unmissable: true,
      trending: false,
    },
    {
      id: '3',
      name: 'Tour 3',
      description: 'Tour 3 description',
      duration: 1,
      price: {
        amount: 1000,
        currency: 'BRL',
      },
      miles: 100,
      unmissable: false,
      trending: false,
    },
  ],
  [
    {
      id: '4',
      name: 'Tour 4',
      description: 'Tour 4 description',
      duration: 1,
      price: {
        amount: 100,
        currency: 'BRL',
      },
      miles: 100,
      unmissable: false,
      trending: true,
    },
    {
      id: '5',
      name: 'Tour 5',
      description: 'Tour 5 description',
      duration: 1,
      price: {
        amount: 1000,
        currency: 'BRL',
      },
      miles: 100,
      unmissable: true,
      trending: false,
    },
  ],
]
export const Tours = () => {
  const { t } = useTranslation(['custom-checkout', 'checkout', 'common'])

  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Splide>(null)

  const tabControlsItems = days.map((day, index) => ({
    id: `day-${index}`,
    tabText: `${t('checkout:roadmap.day')} ${index + 1}`,
  }))

  const tabs = days.map((day, index) => ({
    id: `day-${index}`,
    content: TourList,
    props: { tours: day, index },
  }))

  return (
    <div className="flex flex-col">
      <header className="p-4 pb-0 md:px-7 md:pt-7 2xl:px-11 2xl:pt-11">
        <h5 className="mb-4 font-bold md:mb-4">{t('steps.tours')}</h5>
        <p className="text-paragraph-medium text-gray-90">
          {t('tour.description')}
        </p>
        <TabCarouselControls
          currentSlideState={[currentSlide, setCurrentSlide]}
          items={tabControlsItems}
        />
      </header>
      <TabCarousel
        tabs={tabs}
        splideRef={sliderRef}
        currentSlideState={[currentSlide, setCurrentSlide]}
      />
    </div>
  )
}

const TourList = ({ tours, index }: { tours: Tour[]; index: number }) => {
  const name = [CHECKOUT_FORM_INPUT_NAMES.tourId, index]

  const { formInstance } = useCheckoutContext()

  const [currentValue, setCurrentValue] = useState<string>(
    formInstance.getFieldValue(name) || '',
  )

  return (
    <Form.Item
      name={name}
      noStyle
      initialValue={formInstance.getFieldValue(name) || ''}
    >
      <Radio.Group
        onChange={(e) => setCurrentValue(e.target.value)}
        className="flex w-full overflow-x-auto px-3 md:px-10"
      >
        {tours.map((tour) => (
          <TourOption
            key={tour.name}
            value={tour.name}
            currentValue={currentValue}
            setCurrentValue={setCurrentValue}
            tour={tour}
          />
        ))}
      </Radio.Group>
    </Form.Item>
  )
}
