import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { Suspense } from 'react'
import ActionBar from './components/ActionBar'
import { InformationItemProps } from 'src/components/atoms/InformationItem'
import Footer from '@components/organisms/Footer'
import CheckoutSection from './components/CheckoutSection'
import Roadmap from './components/Roadmap'
import usePackage from '@api/packages/hooks/usePackage'
import PackageDetails from './components/PackageDetails'
import InformationGrid from '@components/molecules/InformationGrid'
import HotelSection from './components/HotelSection'
import { useTranslation } from 'next-i18next'
import { MainLayout } from '@components/layouts'

export const PackagePage: NextPage = () => {
  const router = useRouter()
  const packageID = String(router.query.packageID)
  const { data } = usePackage({ packageID })

  const { t } = useTranslation('about-page')

  const services = [
    {
      title: t('check-in-priority-title'),
      icon: { id: '1', src: 'airplane-ticket' },
      description: t('check-in-priority-description'),
    },
    {
      title: t('personal-concierge-title'),
      icon: { id: '1', src: 'room-service' },
      description: t('personal-concierge-description'),
    },
    {
      title: t('consultative-sales-title'),
      icon: { id: '1', src: 'handshake' },
      description: t('consultative-sales-description'),
    },
    {
      title: t('free-baggage-title'),
      icon: { id: '1', src: 'redeem' },
      description: t('free-baggage-description'),
    },
    {
      title: t('vip-access-title'),
      icon: { id: '1', src: 'chair' },
      description: t('vip-access-description'),
    },
    {
      title: t('gather-miles-title'),
      icon: { id: '1', src: 'chair' },
      description: t('gather-miles-description'),
    },
  ]

  if (!data) {
    return <div>Não encontrado...</div>
  }
  //TODO: Data still mocked due to lack of definition of how we are going to treat this area
  const travelInformation: InformationItemProps[] | undefined =
    data.hotels[0].facilities?.map((info: any) => ({
      title: {
        content: info.title,
        classes: 'text-white',
      },
      description: {
        content: info.description,
      },
      icon: {
        name: info.icon,
        classes: 'w-[15px] h-[15px] text-white items-center',
      },
    }))

  const exclusiveServicesProps: InformationItemProps[] = services.map(
    (info: any) => ({
      title: {
        content: info.title,
        classes: 'text-white',
      },
      description: {
        content: info.description,
      },
      icon: {
        name: info.icon.src,
        classes: 'w-[15px] h-[15px] text-white items-center',
      },
    }),
  )

  const travelInformationTitleProps = {
    content: 'Informações sobre a sua viagem',
    classes: 'text-white font-bold lg:text-h4-desktop',
  }

  const titleExlusiveServicesItemProps = {
    content: 'Serviços exclusivos para clientes exigentes',
    classes: 'text-white font-bold lg:text-h4-desktop',
  }

  return (
    <MainLayout>
      <Suspense fallback={<div>Carregando...</div>}>
        <ActionBar {...data} />
        <div className={`m-auto`}>
          <PackageDetails {...data} />
          <HotelSection hotel={data.hotels[0]} />
          {data.roadMap && <Roadmap roadmap={data.roadMap} />}
          {travelInformation && (
            <div className={'mx-6 mb-9 md:mx-11'}>
              <InformationGrid
                title={travelInformationTitleProps}
                informationItems={travelInformation}
                gridProps={{
                  classes: 'grid-cols-1 lg:grid-cols-3',
                }}
              />
            </div>
          )}
          <div className={'mx-6 mb-9  md:mx-11 md:mt-18'}>
            <InformationGrid
              title={titleExlusiveServicesItemProps}
              informationItems={exclusiveServicesProps}
              gridProps={{
                classes: 'grid-cols-1 lg:grid-cols-3',
              }}
            />
          </div>
        </div>
        <CheckoutSection {...data} />
      </Suspense>
      <Footer />
    </MainLayout>
  )
}
