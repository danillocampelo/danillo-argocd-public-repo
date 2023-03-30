import { RoundedBoxIcon } from '@assets/icons'
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

export const ImageTrack = <T,>({
  data,
  sliderRef,
  currentSlide,
  autoPlay,
  curtain,
  arrowSpacing,
  className,
}: Props<T & CarouselItem>) => {
  return (
    <section className={`${className}`}>
      {data.map(({ item, index }) => {
        const isActive = currentSlide == index

        return (
          <div className={`mx-[6px] md:mx-3 ${arrowSpacing}`} key={index}>
            <button
              className={`group h-[70px] w-[57px] rounded-lg transition-all md:h-[111px] md:w-[90px] ${
                isActive
                  ? `border-white bg-primary-contrast`
                  : `border-primary-contrast bg-primary-contrast`
              } relative overflow-hidden rounded-[20px] border-2 border-solid p-[2px] md:rounded-[29px] md:p-[4px]`}
              onClick={() => sliderRef.current?.go(index)}
            >
              <RoundedBoxIcon
                className={`pointer-events-none absolute left-1/2 top-1/2 h-[120%] -translate-x-1/2 -translate-y-1/2 ${
                  isActive && autoPlay
                    ? 'circular-progress text-primary'
                    : 'text-transparent'
                }`}
              />
              <div
                className={`relative h-full w-auto overflow-hidden rounded-[18px]  md:rounded-3xl`}
              >
                <img
                  width={80}
                  height={100}
                  src={item.image?.src}
                  alt="Cover image"
                  className={`absolute top-0 left-0 h-full w-auto object-cover`}
                />
                {curtain && (
                  <div
                    className={`absolute top-0 left-0 z-10 h-8 w-full bg-white transition-all group-hover:top-[-100%]`}
                  >
                    <div
                      className={`absolute bottom-1 left-1/2 z-20 h-[2px] w-6 -translate-x-1/2 bg-gray-20`}
                    />
                  </div>
                )}
              </div>
            </button>
            {/* {item.title && !isMobile && isActive && (
              <h5
                className={`pt-[10px] text-center text-paragraph-small line-clamp-3 md:w-[90px]`}
              >
                {item.city}
              </h5>
          )} */}
          </div>
        )
      })}
    </section>
  )
}
