import {
  dehydrate,
  DehydratedState,
  QueryClient as ExternalQueryClient,
} from 'react-query'
import { QueryKeys } from '@utils/constants/queryKeys'

const QueryClient = () =>
  new ExternalQueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        cacheTime: 0,
        staleTime: 0,
      },
    },
  })

export const getQueryAndDehydrateProps = async <T>(
  queryKey: QueryKeys,
  queryFn: () => Promise<T>,
): Promise<{ props: { dehydratedState: DehydratedState } }> => {
  const queryClient = QueryClient()

  await queryClient.prefetchQuery([queryKey], () => queryFn())

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  }
}

export default QueryClient
