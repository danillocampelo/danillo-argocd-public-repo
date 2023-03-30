import { Splide } from '@splidejs/react-splide'
import { CarouselItem } from '../Carousel'

interface Props<T extends CarouselItem> {
  data: {
    item: T
    index: number
  }[]
  sliderRef: React.RefObject<Splide>
  currentSlide: number
  autoPlay: boolean
  curtain?: boolean
  arrowSpacing?: string
  className?: string
}

export const DotsTrack = <T,>({
  data,
  sliderRef,
  currentSlide,
  arrowSpacing,
  className,
}: Props<T & CarouselItem>) => (
  <>
    {data.map((item, index) => {
      const isActive = currentSlide == index

      return (
        <div
          className={`mx-[6px] flex items-center md:mx-[12px] ${arrowSpacing} ${className}`}
          key={index}
        >
          <button
            className={`h-[16px] w-[12px] rounded-md transition-all md:h-[111px] md:w-[90px] ${
              isActive ? `border-primary bg-primary` : `border-white`
            } border-2 border-solid p-[2px] md:rounded-[29px] md:p-[6px]`}
            onClick={() => sliderRef.current?.go(index)}
          />
        </div>
      )
    })}
  </>
)
