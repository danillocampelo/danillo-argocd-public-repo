import LinkWithLocale from '@components/atoms/LinkWithLocale'
import { Order } from '@models/Order'
import { ROUTES } from '@utils/constants/routes'
import { useTranslation } from 'next-i18next'

export const ExperienceCard = ({ userOrder }: { userOrder: Order }) => {
  const { t } = useTranslation('profile-page')

  if (!userOrder) {
    return null
  }
  return (
    <section className="flex w-full flex-col border border-gray-10 p-6 md:flex-row 2xl:max-w-[33vw]">
      <img
        className="h-[120px] w-[120px] self-start rounded-full object-cover max-md:mb-6 md:mr-7  md:h-[200px] md:max-xl:h-[160px] md:max-xl:w-[160px] xl:w-[200px] xl:self-center"
        alt=""
        src={userOrder.package.cover.src}
        height={200}
        width={200}
      />
      <div>
        <p className="mb-2 text-paragraph-small font-bold text-gray-90">
          {userOrder.id}
        </p>
        <h5 className="mb-6 font-bold text-black 2xl:text-h6-desktop">
          {userOrder.package.title}
        </h5>
        <div className="mb-6 flex flex-row gap-10">
          {userOrder.hotels[0].stars == 0 ?? (
            <div className="flex flex-col">
              <p className="text-paragraph-small font-bold tracking-[0.125rem] text-gray-90">
                {t('user-orders.stay')}
              </p>
              <p className="text-paragraph-small font-bold text-black md:text-paragraph-medium">
                {`${userOrder.hotels[0].stars} ${t('user-orders.stars')}`}
              </p>
            </div>
          )}
          <div className="flex flex-col">
            <p className="text-tag font-bold uppercase tracking-[0.125rem] text-gray-90">
              {t('user-orders.period')}
            </p>
            <p className="text-paragraph-small font-bold text-black md:text-paragraph-medium">
              {`${userOrder.duration} ${t('user-orders.nights')}`}
            </p>
          </div>
        </div>
        <LinkWithLocale
          href={ROUTES.orderDetail(userOrder.id)}
          className="text-bold text-hyperlink-small uppercase text-primary"
        >
          {t('user-orders.more-info')}
        </LinkWithLocale>
      </div>
    </section>
  )
}
