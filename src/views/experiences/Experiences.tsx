import Footer from '@components/organisms/Footer'
import usePackages from '@api/packages/hooks/usePackages'
import useExperiences from '@api/experiences/hooks/useExperiences'
import { renderPackages } from './components/RenderPackages'
import ExperiencesFallback from './components/ExperiencesFallback'
import { MainLayout } from '@components/layouts'

const Experiences = () => {
  const { data: experiences, isLoading: isLoadingExperiences } = useExperiences(
    {},
  )
  const { data: packages, isLoading: isLoadingPackages } = usePackages({
    params: {},
  })

  const isLoading = isLoadingExperiences || isLoadingPackages

  return (
    <MainLayout background="bg-primary-contrast">
      {isLoading ? (
        <ExperiencesFallback />
      ) : (
        <main className="container max-w-none border-t-[1px] border-gray-90 px-6 pt-7 md:px-11 md:pt-9">
          {experiences?.map((experience) => {
            const experiencePackages = packages?.filter(
              (pack) => pack?.experience?.id == experience.id,
            )
            if (!experiencePackages || experiencePackages.length == 0) {
              return null
            } else {
              return (
                <article key={experience.id} className="mb-11">
                  <div className="mb-7 grid grid-cols-1 items-end md:mb-8 md:grid-cols-2 md:grid-rows-1 md:gap-11">
                    <section>
                      <h2 className="mb-1 text-h2-mobile font-light leading-[4rem] text-white md:mb-0 md:text-[3.5rem] md:leading-[4.5rem]">
                        {experience.name?.toLowerCase()}
                      </h2>
                    </section>
                    <section className="flex flex-row justify-between">
                      <p className="text-paragraph-medium font-normal text-gray-40 md:max-w-[45%]">
                        {experience.description}
                      </p>
                    </section>
                  </div>
                  <section>{renderPackages(experiencePackages)}</section>
                </article>
              )
            }
          })}
          <Footer />
        </main>
      )}
    </MainLayout>
  )
}

export default Experiences
