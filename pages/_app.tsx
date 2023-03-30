import '@styles/globals.css'
import '@styles/antd.css'
import '@styles/fonts.css'
import '@styles/animations.css'
import '@styles/adyen.css'
import '@splidejs/react-splide/css'

import { useState } from 'react'
import type { AppProps } from 'next/app'
import { DehydratedState, Hydrate, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ParallaxProvider } from 'react-scroll-parallax'
import { appWithTranslation } from 'next-i18next'

import QueryClient from '@api/_common/query'
import { LocaleProvider } from '@contexts/LocaleContext'
import { AntdProvider } from '@providers/antd'
import { PackageProvider } from '../src/contexts/PackageContext'
import { UserProvider } from '@auth0/nextjs-auth0/client'

function MyApp({
  Component,
  pageProps,
}: AppProps<{ dehydratedState: DehydratedState }>) {
  const [queryClient] = useState(() => QueryClient())

  return (
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <ParallaxProvider>
            <LocaleProvider>
              <AntdProvider>
                {/* TODO: find a better way to handle global states */}
                <PackageProvider>
                  <Component {...pageProps} />
                </PackageProvider>
              </AntdProvider>
            </LocaleProvider>
          </ParallaxProvider>
        </Hydrate>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </UserProvider>
  )
}

export default appWithTranslation<any>(MyApp)
