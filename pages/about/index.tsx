import { AboutPage } from 'src/views/about/About'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetStaticPropsContext } from 'next'

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const translations = await serverSideTranslations(context.locale!, [
    'about-page',
    'common',
  ])

  return {
    props: { ...translations },
  }
}

export default AboutPage
