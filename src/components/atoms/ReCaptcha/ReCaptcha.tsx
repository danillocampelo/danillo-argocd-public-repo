import { Themes } from '@utils/constants/theme'
import { useTranslation } from 'next-i18next'
import { FunctionComponent, InputHTMLAttributes } from 'react'

type Props = InputHTMLAttributes<HTMLInputElement> & {
  theme?: Themes
  className?: string
}

export const ReCaptcha: FunctionComponent<Props> = ({
  className,
  theme = Themes.light,
  ...rest
}) => {
  const { t } = useTranslation('common')
  const isUsingDarkTheme = theme === Themes.dark

  return (
    <div
      className={`px-6 py-5 ${
        isUsingDarkTheme && 'border-2 border-gray-80'
      } ${className}`}
    >
      <input
        type="checkbox"
        id="recaptcha"
        className="bg-primary-contrast outline-none focus:ring-0"
        {...rest}
      />
      <label
        htmlFor="recaptcha"
        className={`pl-3 font-primary text-paragraph-small font-semibold ${
          isUsingDarkTheme && 'text-white'
        }`}
      >
        {t('im-not-a-robot')}
      </label>
    </div>
  )
}
