import { notification } from 'antd'
import { NotificationPlacement } from 'antd/es/notification/interface'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export const useNotification = () => {
  const [api, contextHolder] = notification.useNotification()

  const notify = ({
    message,
    type,
    placement = 'topRight',
    description,
    duration = 3,
  }: {
    message: string
    type: NotificationType
    placement?: NotificationPlacement
    description?: string
    duration?: number
  }) => {
    api[type]({
      message,
      description,
      placement,
      duration,
    })
  }

  return { notify, contextHolder }
}
