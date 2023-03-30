import { useContext } from 'react'
import { ConfigProvider } from 'antd'
import { LocaleContext } from '../../contexts/LocaleContext'
import { Locale } from 'antd/es/locale'
import 'dayjs/locale/pt-br'
import ptBR from 'antd/locale/pt_BR'

const locales: { [key: string]: Locale } = {
  'pt-BR': ptBR,
}

type Props = {
  children: React.ReactNode
}

export const AntdProvider = ({ children }: Props) => {
  const { locale } = useContext(LocaleContext)

  return (
    <ConfigProvider
      locale={locales[locale]}
      theme={{
        token: {
          colorPrimary: '#C15D31',
          colorError: '#FF0707',
        },
      }}
    >
      {children}
    </ConfigProvider>
  )
}
