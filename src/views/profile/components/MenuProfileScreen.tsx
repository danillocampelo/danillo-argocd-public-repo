import { InputSetUser, Status } from '@api/user/UserServiceApi'
import { TabCarousel } from '@components/molecules/TabCarousel/TabCarousel'
import { User } from '@models/User'
import { Splide } from '@splidejs/react-splide'
import { AxiosResponse } from 'axios'
import { useTranslation } from 'next-i18next'
import { useRef, useState } from 'react'
import { UseMutateFunction } from 'react-query'
import { ProfileData } from './ProfileData'
import UserOrders from './UserOrders'

export type UserMutation = UseMutateFunction<
  AxiosResponse<User, Status>,
  unknown,
  InputSetUser,
  unknown
>

export type Props = {
  userMutation: UserMutation
  userData: User
}

type MenuProfileTranslate = {
  menuTitle: string
}

export const MenuProfileScreen = ({ userMutation, userData }: Props) => {
  const { t } = useTranslation('profile-page')
  const menuProfileData = t('menu-profile', {
    returnObjects: true,
  }) as MenuProfileTranslate[]
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Splide>(null)

  const renderControls = () => {
    return (
      <nav
        className={
          'flex-row overflow-hidden overflow-x-scroll whitespace-nowrap border-b border-gray-10 bg-transparent px-4 py-4 scrollbar-hide md:px-11 md:py-7'
        }
      >
        {menuProfileData.map((item, index) => (
          <button
            key={index}
            className={'mr-5 md:mr-9'}
            onClick={() => setCurrentSlide(index)}
          >
            <h6
              className={`text-hyperlink-small font-bold md:text-hyperlink-medium 2xl:text-h6-desktop 2xl:tracking-tighter ${
                currentSlide == index ? `text-black` : `text-gray-40`
              }`}
            >
              {item.menuTitle}
            </h6>
          </button>
        ))}
      </nav>
    )
  }

  return (
    <main>
      {renderControls()}
      <TabCarousel
        tabs={[
          {
            id: 'profile-1',
            content: ProfileData,
            props: { userMutation, userData },
          },
          {
            id: 'profile-3',
            content: UserOrders,
            props: { userData },
          },
        ]}
        currentSlideState={[currentSlide, setCurrentSlide]}
        splideRef={sliderRef}
        className="flex w-full overflow-x-hidden"
        differentHeightSlides
      />
    </main>
  )
}
