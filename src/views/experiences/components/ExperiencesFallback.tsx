import { Skeleton } from '@components/atoms/Skeleton'

const PackageFallback = () => (
  <div>
    <Skeleton className="h-[208px] w-full md:h-[250px] lg:h-[300px] 2xl:h-[468px]" />
    <Skeleton className="mt-4 h-[22px] w-4/5 md:mt-6 md:w-1/3" />
    <Skeleton className="mt-1 h-[22px] w-4/5 md:mt-2 md:w-1/3" />
    <Skeleton className="mt-1 h-[22px] w-4/5 md:mt-2 md:w-1/3" />
  </div>
)

const ExperiencesFallback = () => (
  <div className="px-6 pt-7 md:px-11 md:pt-9">
    <Skeleton className="mb-7 h-12 w-[270px] md:mb-8" />
    <div className="grid grid-cols-1 gap-[2.25rem] md:grid-cols-2 md:gap-11">
      <PackageFallback />
      <PackageFallback />
    </div>
  </div>
)

export default ExperiencesFallback
