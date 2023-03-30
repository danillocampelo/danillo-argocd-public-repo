import { useRouter } from 'next/router'

export const useNavigateTo = (route: string) => {
  const router = useRouter()

  return () => {
    router.push(route)
  }
}
