import { getUser } from '@api/user/UserServiceApi'
import { QueryKeys } from '@utils/constants/queryKeys'
import ProfilePage from '@views/profile'
import { GetServerSidePropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { User } from '@models/User'
import { getQueryAndDehydrateProps } from '@api/_common/query'
import { withPageAuthRequired } from '@auth0/nextjs-auth0'

const userIdMock = '1'

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (context: GetServerSidePropsContext) => {
    const translations = await serverSideTranslations(context.locale!, [
      'profile-page',
    ])

    const { props } = await getQueryAndDehydrateProps<User>(
      QueryKeys.user,
      () => getUser({ userId: userIdMock }),
    )

    return {
      props: { ...translations, ...props },
    }
  },
})

export default ProfilePage
