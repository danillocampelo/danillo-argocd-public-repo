import { FunctionComponent } from 'react'
import { useTranslation } from 'next-i18next'
import PackageCard from '@components/molecules/PackageCard'
import usePackages from '@api/packages/hooks/usePackages'

export const PackagesSection: FunctionComponent = () => {
  const { t } = useTranslation(['about-page', 'common'])

  const { data } = usePackages({
    params: {
      highlight: true,
      limit: 3,
      offset: 0,
    },
    queryOptions: {
      staleTime: 10 * 60 * 1000, // 10 mins
    },
  })

  if (!data) return <></>

  return (
    <section className="pb-7 max-md:pt-6 md:pb-13">
      <div className="flex flex-col justify-between md:flex-row md:items-end">
        <p className="max-w-[245px] text-paragraph-medium font-normal uppercase text-gray-40">
          {t('common:discover-experiences')}
        </p>
        {/* <h5 className=" font-bold text-primary">
          {t('common:see-more')}
        </h5> */}
      </div>
      <ul className="flex flex-col gap-y-7 pt-8 md:flex-row md:gap-x-11">
        {data[0] && (
          <PackageCard packageData={data[0]} className={'md:w-[50%]'} />
        )}
        {data[1] && (
          <PackageCard packageData={data[1]} className={'md:w-[25%]'} />
        )}
        {data[2] && (
          <PackageCard packageData={data[2]} className={'md:w-[25%]'} />
        )}
      </ul>
    </section>
  )
}
