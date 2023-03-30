import { ServiceWithTotals } from '@api/availability/mappers/ServiceMapper'
import { useTranslation } from 'next-i18next'

export const AdditionalsReview = ({
  servicesWithTotals,
}: {
  servicesWithTotals: ServiceWithTotals
}) => {
  const { t } = useTranslation(['checkout', 'common'])

  return (
    <section className="flex flex-col flex-wrap gap-12">
      {servicesWithTotals.services.map((service) => (
        <div key={service.id} className="flex flex-col gap-2">
          <h5 className="text-paragraph-medium font-bold lg:text-h5-mobile">
            {service.name}
          </h5>
          <p className="text-paragraph-small text-gray-80 2xl:text-paragraph-medium">
            {service.description}
          </p>
        </div>
      ))}
    </section>
  )
}
