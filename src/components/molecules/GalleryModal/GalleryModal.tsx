import React, { FC } from 'react'
import { Modal } from 'antd'
import styles from './GalleryModal.module.css'
import Carousel, { CarouselItem } from '@components/organisms/Carousel'

type Props = {
  isOpen: boolean
  setIsOpen: (value: boolean) => void
  carouselItems: CarouselItem[]
  content?: React.ReactElement
}

export const GalleryModal: FC<Props> = ({
  isOpen,
  setIsOpen,
  carouselItems,
  content,
}) => {
  return (
    <Modal
      className={`${styles['custom-gallery']} min-h-0 lg:h-[764px] lg:min-w-[945px]`}
      centered
      width={content ? 1445 : 945}
      footer={null}
      open={isOpen}
      onCancel={() => setIsOpen(false)}
    >
      <div className="flex">
        <Carousel
          containerClassName="relative"
          data={carouselItems}
          renderItem={(item) => (
            <img
              alt=""
              width={945}
              height={764}
              src={item.image?.src}
              className="h-full object-cover"
            />
          )}
          controlsOptions={{
            show: true,
            align: 'center',
            curtain: false,
            backArrow: true,
            forwardArrow: true,
          }}
          carouselOptions={{
            type: 'slide',
            pagination: false,
            arrows: false,
            drag: false,
            autoplay: false,
          }}
        />
        {content}
      </div>
    </Modal>
  )
}
