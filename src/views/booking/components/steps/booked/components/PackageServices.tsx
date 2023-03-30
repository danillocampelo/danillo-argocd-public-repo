import { KeyToIconMapper } from '@assets/icons'
import { Metainfo } from '@models/Metainfo'
import { useTranslation } from 'next-i18next'
import { FunctionComponent } from 'react'

type Props = {
  services: Metainfo[]
}

export const PackageServices: FunctionComponent<Props> = ({ services }) => {
  const { t } = useTranslation('checkout')

  return (
    <section>
      <h5 className="pb-7 font-bold xl:pb-8">
        {t('booked.included-services')}
      </h5>

      <div className="grid grid-cols-1 gap-y-4 border border-gray-20 md:grid-cols-2 md:gap-x-7 md:py-5 md:px-2 lg:grid-cols-3 lg:py-6 lg:px-5 xl:grid-cols-4 2xl:grid-cols-5 2xl:gap-y-9 2xl:gap-x-12 2xl:py-9 2xl:px-8">
        {services.map((metainfo, index) => {
          const Icon = KeyToIconMapper[metainfo.icon?.id || 'check']

          return (
            <div
              key={`package-service-${index}`}
              className="flex gap-x-2 py-4 px-4"
            >
              <div className="h-full md:mt-1">
                <Icon className="w-7" />
              </div>

              <div>
                <strong className="pb-2 text-paragraph-medium md:text-h5-mobile lg:pb-4 2xl:text-h6-desktop">
                  {metainfo.title}
                </strong>

                <p className="text-paragraph-small md:text-paragraph-medium">
                  {metainfo.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
