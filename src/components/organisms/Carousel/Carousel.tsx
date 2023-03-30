import { useEffect, useRef, useState } from 'react'
import {
  Splide,
  SplideSlide,
  Options as CarouselOptions,
} from '@splidejs/react-splide'
import React from 'react'

import {
  CarouselControls,
  ControlsOptions,
} from './components/CarouselControls'
import { Image } from 'src/models/Image'

export interface CarouselItem {
  image?: Image
  title?: string
  city?: string
}

type Props<T extends CarouselItem> = {
  data: T[]
  renderItem: (item: T, isMobile?: boolean) => JSX.Element
  carouselOptions?: CarouselOptions
  controlsOptions?: ControlsOptions
  containerClassName?: string
}

export const Carousel = <T,>({
  data,
  renderItem,
  containerClassName,
  controlsOptions = {
    show: true,
    align: 'center',
    curtain: false,
    backArrow: true,
    forwardArrow: true,
    isDotTrack: false,
  },
  carouselOptions = {
    type: 'loop',
    pagination: false,
    arrows: false,
  },
}: Props<T & CarouselItem>) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<Splide>(null)

  useEffect(() => {
    if (sliderRef.current && sliderRef.current.splide) {
      sliderRef.current.splide.on('move', (newIndex: number) => {
        setCurrentSlide(newIndex)
      })
    }
    return () => {
      if (sliderRef.current && sliderRef.current.splide) {
        sliderRef.current.splide.off('move')
      }
    }
  }, [])

  return (
    <div className={containerClassName}>
      <Splide
        ref={sliderRef}
        options={carouselOptions}
        className="flex h-full w-full overflow-x-hidden object-cover"
      >
        {data.map((item, index) => (
          <SplideSlide key={index}>{renderItem(item)}</SplideSlide>
        ))}
      </Splide>
      <CarouselControls
        currentSlide={currentSlide}
        sliderRef={sliderRef}
        data={data}
        autoPlay={carouselOptions.autoplay === true}
        {...controlsOptions}
      />
    </div>
  )
}
