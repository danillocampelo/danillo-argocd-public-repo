import { FunctionComponent } from 'react'
import { AlertIcon } from '@assets/icons'
import { Alert as AntdAlert, AlertProps } from 'antd'

const ErrorAlert: FunctionComponent<AlertProps> = ({ className, ...rest }) => {
  return (
    <AntdAlert
      closable
      showIcon
      type="error"
      icon={<AlertIcon className="h-5 w-5 text-white" />}
      className={`cursor-pointer rounded border-0 bg-feedback-negative text-white ${className}`}
      {...rest}
    />
  )
}

export default ErrorAlert
