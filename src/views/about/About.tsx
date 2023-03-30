import { FunctionComponent } from 'react'
import { DiscoverExperiences } from './components/DiscoverExperiences'
import { FaqSection } from './components/FaqSection'
import { ServicesSection } from './components/ServicesSection'
import { PackagesSection } from './components/PackagesSection'
import Footer from '@components/organisms/Footer'
import { MainLayout } from '@components/layouts'

export const AboutPage: FunctionComponent = () => {
  return (
    <MainLayout>
      <div className="overflow-hidden px-6 md:px-11">
        <DiscoverExperiences />
        <ServicesSection />
        <FaqSection />
        <PackagesSection />
        <Footer />
      </div>
    </MainLayout>
  )
}
