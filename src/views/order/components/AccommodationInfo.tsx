import { Divider } from 'antd'
import { useTranslation } from 'next-i18next'
import { Room } from '@models/Room'
import { Order } from '@models/Order'
import { KeyToIconMapper } from '@assets/icons'
import RoomDetails from '@components/molecules/RoomDetails/RoomDetails'
import HtmlText from '@components/atoms/HtmlText'
import Tooltip from '@components/atoms/Tooltip'

const RoomCard = ({ room }: { room: Room }) => {
  const { t } = useTranslation(['order-page'])

  return (
    <div className="flex w-full flex-col border border-gray-10 px-6 py-7 md:flex-row">
      <img
        className="h-[120px] w-[120px] self-start rounded-full object-cover max-md:mb-6 md:mr-7  md:h-[200px] md:self-center md:max-xl:h-[160px] md:max-xl:w-[160px] xl:w-[200px]"
        alt=""
        src={room.images[0].src}
        height={200}
        width={200}
      />
      <div className="flex w-full flex-col">
        <h5 className="mb-6 font-bold text-black">{room.title}</h5>
        <RoomDetails
          className="columns-1 py-6 md:columns-2 2xl:columns-3"
          itemClassName="font-bold text-black text-paragraph-small md:text-paragraph-medium"
          metainfos={room.metainfos.splice(-6)}
        />
        <div className="flex gap-6 md:gap-7">
          <Tooltip
            text={t('guests')}
            className="text-bold self-end text-hyperlink-small uppercase text-primary"
          >
            {room.guests.map((guest, index) => (
              <p
                key={`guest-${index}`}
                className="text-paragraph-small md:text-paragraph-medium"
              >
                {guest.name}
              </p>
            ))}
          </Tooltip>
        </div>
      </div>
    </div>
  )
}

export const AccommodationInfo = ({ order }: { order: Order }) => {
  const { t } = useTranslation(['order-page'])

  return (
    <>
      <h5 className="mt-9 font-bold md:mb-8 2xl:text-h4-desktop">
        {t('stay')}
      </h5>
      <section className="flex w-full flex-col border border-gray-10 px-6 py-7 md:flex-row">
        <img
          className="h-[120px] w-[120px] self-start rounded-full object-cover max-md:mb-6 md:mt-2 md:mr-7 md:max-xl:h-[160px] md:max-xl:w-[160px] xl:h-[200px] xl:w-[200px]"
          alt=""
          src={`${order.rooms[0].images[0].src}`}
          height={200}
          width={200}
        />
        <div className="flex w-full flex-col overflow-clip">
          <h5 className="mb-6 font-bold text-black">{order.hotels[0].name}</h5>
          <HtmlText
            className="pb-6 text-paragraph-small text-gray-40 md:text-h5-mobile xl:max-w-[39vw]"
            text={order.hotels[0]?.description || ''}
          />
          <div className="mb-6 flex flex-row justify-between gap-10">
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col md:flex-row md:gap-9">
                {order.hotels[0]?.metainfos?.slice(0, 4).map((metainfos) => {
                  const MappedIcon =
                    KeyToIconMapper[metainfos.icon?.src || 'check']

                  return (
                    <span key={metainfos.title} className="flex flex-row">
                      <MappedIcon className="mr-2 h-6 w-6" />
                      <p className="text-paragraph-small font-bold text-black md:mr-9 md:text-paragraph-medium">
                        {metainfos.title}
                      </p>
                    </span>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>
      <Divider className="border-2 md:my-9 2xl:my-14" />
      <h5 className="font-bold md:mb-8 2xl:text-h4-desktop">
        {t('accommodations')}
      </h5>
      <div className="grid grid-cols-1 md:gap-11 xl:grid-cols-2">
        {order.rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </>
  )
}
