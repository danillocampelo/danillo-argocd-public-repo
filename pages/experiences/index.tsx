import { getPackages } from '@api/packages/PackagesServiceApi'
import { Experience } from '@models/Experience'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { dehydrate, QueryClient } from 'react-query'
import { getExperiences } from 'src/api/experiences/ExperienceServiceApi'
import { QueryKeys } from 'src/utils/constants/queryKeys'
import Experiences from 'src/views/experiences'

export async function getStaticProps(context: GetStaticPropsContext) {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([QueryKeys.experiences], getExperiences)
  const experiences = queryClient.getQueryData<Experience[]>(
    QueryKeys.experiences,
  )
  await queryClient.prefetchQuery([QueryKeys.packages], () =>
    getPackages({ experiences: experiences?.map((exp) => exp.id) }),
  )

  return {
    props: {
      ...(await serverSideTranslations(context.locale!, [
        'packages-page',
        'common',
      ])),
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default Experiences
