import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSidePropsContext } from 'next'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { CheckoutPage } from '@views/booking/checkout/Checkout'

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context: GetServerSidePropsContext) => {
    const translations = await serverSideTranslations(context.locale!, [
      'checkout',
      'common',
    ])

    return {
      props: { ...translations },
    }
  },
})

export default CheckoutPage
