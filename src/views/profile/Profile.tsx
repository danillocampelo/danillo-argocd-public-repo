import { setUser } from '@api/user/UserServiceApi'
import useUser from '@hooks/useUser'
import { QueryKeys } from '@utils/constants/queryKeys'
import { useRouter } from 'next/router'
import { useMutation, useQueryClient } from 'react-query'
import { MenuProfileScreen } from './components/MenuProfileScreen'
import { Navbar } from '@components/index'
import { LogoutIcon } from '@assets/icons'
import { ROUTES } from '@utils/constants/routes'
import { useTranslation } from 'next-i18next'

export const ProfilePage = ({}) => {
  const client = useQueryClient()
  const router = useRouter()
  const userId = String(router.query.userId)
  const { data } = useUser({ userId })
  const { t } = useTranslation('profile-page')

  const { mutate } = useMutation({
    mutationFn: setUser,
    onSuccess: () => {
      client.invalidateQueries({ queryKey: QueryKeys.user })
    },
  })

  if (!data) {
    return <div>Não encontrado...</div>
  }

  const items = [
    {
      icon: LogoutIcon,
      title: t('logout'),
      href: ROUTES.logout(),
    },
  ]

  return (
    <div className={'min-h-screen bg-white'}>
      <Navbar buttons={items} useDefaultMobileButtons={false} />
      <MenuProfileScreen userMutation={mutate} userData={data} />
    </div>
  )
}
