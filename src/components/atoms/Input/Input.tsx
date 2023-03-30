import { FunctionComponent } from 'react'
import { MaskedInput } from 'antd-mask-input'
import { Input as AntdInput, InputProps, Tooltip } from 'antd'
import { QuestionMarkIcon, AlertIcon } from 'src/assets/icons'
import { Themes } from '@utils/constants/theme'

type InputSize = 'small' | 'medium' | 'full'

type Props = InputProps & {
  label?: string
  tooltip?: string
  errorMessage?: string
  width?: InputSize
  theme?: Themes
  value?: string
  defaultValue?: string
  /** @description for details check https://github.com/antoniopresto/antd-mask-input and https://imask.js.org/guide.html */
  maskProps?: {
    mask: string
    radix?: string
    value?: string
    lazy?: boolean
    placeholderChar?: string
  }
}

const inputWidthClasses: Record<InputSize, string> = {
  small: 'w-full md:w-[15rem]',
  medium: 'w-full md:w-[34rem]',
  full: 'w-full',
}

const Input: FunctionComponent<Props> = ({
  id,
  className,
  maskProps,
  label,
  tooltip,
  width = 'medium',
  theme = Themes.light,
  errorMessage,
  ...rest
}) => {
  const isUsingDarkTheme = theme === Themes.dark

  const InputLabel = () => (
    <div className="flex items-center justify-between pb-3">
      <label
        htmlFor={id}
        className={`text-paragraph-small font-bold ${
          errorMessage && 'text-red-600'
        } ${isUsingDarkTheme && 'text-gray-10'} `}
      >
        {label}
      </label>
      {tooltip && (
        <Tooltip
          title={tooltip}
          className={`${isUsingDarkTheme && 'bg-primary'}`}
        >
          <QuestionMarkIcon className="h-4 w-4" />
        </Tooltip>
      )}
    </div>
  )

  const ErrorWarning = () => (
    <div className="flex items-center pt-3">
      <AlertIcon className="mr-2 h-4 w-4 text-red-600" />
      <p className="text-red-600">{errorMessage}</p>
    </div>
  )

  const inputProps = {
    ...rest,
    id,
    className: `h-11 outline-none rounded-none border-2 border-gray-20 px-6 py-5 text-paragraph-small focus:ring-0 ${
      isUsingDarkTheme &&
      'bg-primary-contrast border-gray-80 text-gray-10 placeholder:text-gray-40 focus:border-primary hover:border-primary'
    } ${errorMessage && 'border-red-600 focus:border-red-600'}`,
  }

  return (
    <div className={`${className} ${inputWidthClasses[width]}`}>
      {label && <InputLabel />}
      {maskProps ? (
        <MaskedInput {...maskProps} {...inputProps} size="small" />
      ) : (
        <AntdInput {...inputProps} size="small" />
      )}
      {errorMessage && <ErrorWarning />}
    </div>
  )
}

export default Input
