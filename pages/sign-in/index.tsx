import SignInPage from '@views/sign-in'
import { GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const translations = await serverSideTranslations(context.locale!, [
    'sign-in-page',
    'common',
  ])

  return {
    props: { ...translations },
  }
}

export default SignInPage
