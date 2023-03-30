import OrderPage from '@views/order'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  const translations = await serverSideTranslations(context.locale!, [
    'profile-page',
    'order-page',
    'common',
  ])

  const orderId = String(context.params?.orderId)

  return {
    props: { ...translations, orderId },
  }
}

export default OrderPage
