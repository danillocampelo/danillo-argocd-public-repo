import { Skeleton } from '@components/atoms/Skeleton'

//TODO: Add lazy loading in background image
const HomeFallback = () => (
  <div className="mt-[-82px] flex h-screen w-full items-end pb-[150px] md:items-center md:pb-0">
    <div className="flex h-[274px] w-[320px] flex-col pl-6 md:h-[338px] md:w-[711px] md:pl-[70px]">
      <Skeleton className="mb-4 h-[40px] w-4/5" />
      <Skeleton className="mb-6 h-[128px] w-[90%]" />
      <Skeleton className="h-[148px] w-full md:w-4/5" />
    </div>
  </div>
)

export default HomeFallback
