import { useTranslation } from 'next-i18next'
import { DownArrowIcon } from 'src/assets/icons'

const ScrollableButtonHome = () => {
  const { t } = useTranslation(['home-page'])

  return (
    <div
      className={'fixed bottom-16 flex cursor-pointer items-center text-white'}
    >
      <DownArrowIcon />
      <h3 className={'text-2xl ml-10 max-w-[218px] font-primary'}>
        {t('button-to-scroll')}
      </h3>
    </div>
  )
}

export default ScrollableButtonHome
