import { Splide } from '@splidejs/react-splide'

import { BackArrowIcon, ForwardArrowIcon } from '@assets/icons'
import { CarouselItem } from '../Carousel'

import { DotsTrack } from './DotsTrack'
import { ImageTrack } from './ImageTrack'

interface Props<T extends CarouselItem> extends ControlsOptions {
  data: T[]
  sliderRef: React.RefObject<Splide>
  currentSlide: number
  autoPlay?: boolean
}

export type ControlsOptions = {
  align: 'start' | 'center' | 'end'
  show: boolean
  curtain?: boolean
  backArrow?: boolean
  forwardArrow?: boolean
  isDotTrack?: boolean
}

const positionClasses: { [key: string]: string } = {
  start: 'pl-6 pr-4 md:px-[70px] justify-start',
  center: 'left-1/2 -translate-x-1/2 justify-evenly',
  end: 'pr-6 pl-4 md:px-[70px] justify-end',
}

export const CarouselControls = <T,>({
  data,
  sliderRef,
  currentSlide,
  align,
  show,
  curtain,
  backArrow,
  forwardArrow,
  autoPlay = false,
  isDotTrack,
}: Props<T & CarouselItem>) => {
  const backArrowSpacing = !backArrow ? 'first:ml-0' : ''
  const forwardArrowSpacing = !forwardArrow ? 'last:mr-0' : ''

  const classes = positionClasses[align]
  const hasTitle = data[0]?.title

  const getSlidesAroundCurrent = (
    arr: (T & CarouselItem)[],
    currentSlide: number,
  ) => {
    const slidesAroundCurrent = []
    const slidesCount = arr.length

    if (slidesCount <= 5) {
      return arr.map((item, index) => ({
        item,
        index,
      }))
    }

    let start = currentSlide - 2
    let end = currentSlide + 2
    if (start < 0) {
      end -= start
      start = 0
    }
    if (end >= slidesCount) {
      start -= end - slidesCount + 1
      end = slidesCount - 1
    }
    if (start < 0) {
      start = 0
    }

    for (let i = start; i <= end; i++) {
      slidesAroundCurrent.push({ item: arr[i], index: i })
    }

    return slidesAroundCurrent
  }

  const reducedSlides = getSlidesAroundCurrent(data, currentSlide)

  return (
    <nav
      className={`absolute ${
        align !== 'center'
          ? 'top-[106px] md:bottom-8 md:top-auto'
          : 'bottom-8 md:bottom-11'
      } flex max-w-full overflow-x-scroll
          rounded-sm text-white scrollbar-hide
          ${classes}`}
    >
      {backArrow && (
        <button
          className={`mr-3 ${hasTitle ? 'h-[103px]' : ''} `}
          onClick={() => sliderRef.current?.go('<')}
        >
          <BackArrowIcon width={40} height={40} />
        </button>
      )}
      <DotsTrack
        data={reducedSlides}
        currentSlide={currentSlide}
        sliderRef={sliderRef}
        arrowSpacing={`${backArrowSpacing} ${forwardArrowSpacing}`}
        curtain={curtain}
        autoPlay={autoPlay}
        className={`${isDotTrack ? 'flex lg:hidden' : 'hidden'}`}
      />
      <ImageTrack
        data={reducedSlides}
        currentSlide={currentSlide}
        sliderRef={sliderRef}
        arrowSpacing={`${backArrowSpacing} ${forwardArrowSpacing}`}
        curtain={curtain}
        autoPlay={autoPlay}
        className={`${isDotTrack ? 'hidden lg:flex' : 'flex'}`}
      />

      {forwardArrow && (
        <button
          className={`ml-3 ${hasTitle ? 'h-[103px]' : ''}`}
          onClick={() => sliderRef.current?.go('>')}
        >
          <ForwardArrowIcon width={40} height={40} />
        </button>
      )}
    </nav>
  )
}
