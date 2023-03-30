import { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { SmilesIcon } from '@assets/icons'

interface MilesAccrualProps {
  miles?: number
  textBeforeIcon?: string
  breakLineOnMobile?: boolean
}

const MilesAccrual: FC<MilesAccrualProps> = ({
  miles,
  textBeforeIcon,
  breakLineOnMobile,
}) => {
  const { t } = useTranslation(['common'])

  return (
    <div
      className={'text-paragraph-small text-white md:text-paragraph-medium '}
    >
      {miles ? (
        <div
          className={`flex w-full ${
            breakLineOnMobile ? 'gap-2 max-lg:flex-col' : ''
          }`}
        >
          <span className="flex">
            {textBeforeIcon || t('acumulate-until')}
            <SmilesIcon className="mx-3 w-5 text-primary" />
          </span>
          <span className="font-bold">{`${miles} ${t('smiles-miles')}`}</span>
        </div>
      ) : (
        <div className="flex w-full">
          {t('default-acumulate')}
          <span className="ml-1 font-bold">{t('default-miles')}</span>
          <SmilesIcon className="mx-3 w-5 text-primary" />
        </div>
      )}
    </div>
  )
}

export default MilesAccrual
