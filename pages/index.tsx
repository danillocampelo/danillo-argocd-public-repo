import type { GetStaticPropsContext, NextPage } from 'next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { getPackages } from 'src/api/packages/PackagesServiceApi'
import { getQueryAndDehydrateProps } from 'src/api/_common/query'
import { QueryKeys } from 'src/utils/constants/queryKeys'

import HomePage from '../src/views/home/HomePage'

export async function getStaticProps(context: GetStaticPropsContext) {
  const { props } = await getQueryAndDehydrateProps(QueryKeys.package, () =>
    getPackages({ highlight: true, limit: 4 }),
  )

  return {
    props: {
      ...(await serverSideTranslations(context.locale!, [
        'home-page',
        'common',
        'footer',
      ])),
      ...props,
    },
  }
}

const Home: NextPage = () => {
  return (
    <div className="bg-black">
      <Head>
        <title>Smiles Web</title>
        <meta name="description" content="Smiles Web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className=" mx-auto ">
        <HomePage />
      </div>
    </div>
  )
}

export default Home
