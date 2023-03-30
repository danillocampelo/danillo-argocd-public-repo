import { useEffect, useState } from 'react'
import usePackages from 'src/api/packages/hooks/usePackages'
import Carousel from 'src/components/organisms/Carousel'
import { PackageCarouselItem } from './components/PackageCarouselItem'
import HomeFallback from './components/HomeFallback'
import { MainLayout } from '@components/layouts'

export const HomePage = () => {
  const { data, isLoading } = usePackages({ params: { highlight: true } })
  const [isMobile, setIsMobile] = useState<boolean>()

  useEffect(() => {
    if (window.innerWidth && window.innerWidth < 768) {
      setIsMobile(true)
    }
  }, [])

  const dataFilterImage = data?.map((item) => ({
    ...item,
    image: item.cover,
    city: item.destination.city.name,
  }))

  return (
    <MainLayout>
      {isLoading ? (
        <HomeFallback />
      ) : (
        <Carousel
          data={dataFilterImage ?? []}
          renderItem={PackageCarouselItem}
          containerClassName="absolute top-0 left-0 h-full w-full min-h-[500px]"
          controlsOptions={{
            show: true,
            align: isMobile ? 'center' : 'end',
            curtain: false,
            backArrow: false,
            forwardArrow: isMobile ? false : true,
          }}
          carouselOptions={{
            type: 'loop',
            pagination: false,
            arrows: false,
            drag: false,
            autoplay: true,
            interval: 7000,
            pauseOnFocus: false,
            pauseOnHover: false,
          }}
        />
      )}
    </MainLayout>
  )
}

export default HomePage
