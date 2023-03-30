import type { GetStaticPaths, GetStaticPropsContext } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { getPackage } from 'src/api/packages/PackagesServiceApi'
import { QueryKeys } from 'src/utils/constants/queryKeys'

import { getQueryAndDehydrateProps } from 'src/api/_common/query'
import PackagePage from 'src/views/package'

export async function getStaticProps(context: GetStaticPropsContext) {
  const packageID = String(context.params?.packageID)

  const queryDehydrate = await getQueryAndDehydrateProps(
    QueryKeys.package,
    () => getPackage({ packageID }),
  )

  if (queryDehydrate.props) {
    return {
      props: {
        ...(await serverSideTranslations(context.locale!, [
          'package-page',
          'common',
          'about-page',
        ])),
        ...queryDehydrate.props,
      },
    }
  }
  return {
    props: {
      error: true,
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export default PackagePage
