import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSidePropsContext } from 'next'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import CustomCheckoutPage from '@views/booking/custom-checkout'
import { CustomCheckoutRequiredData } from '@views/booking/custom-checkout/CustomCheckout'

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context: GetServerSidePropsContext) => {
    const translations = await serverSideTranslations(context.locale!, [
      'custom-checkout',
      'checkout',
      'common',
    ])

    const params = context.query

    const requiredData: CustomCheckoutRequiredData = {
      startDate: params.startDate,
      endDate: params.endDate,
      origin: JSON.parse((params.origin as string) || 'null'),
      destination: JSON.parse((params.destination as string) || 'null'),
    }

    return {
      props: { ...translations, requiredData },
    }
  },
})

export default CustomCheckoutPage
