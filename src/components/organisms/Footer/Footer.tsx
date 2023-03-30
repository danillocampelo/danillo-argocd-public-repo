import { SmilesViagensIcon } from '@assets/icons'
import useMediaQuery from '@hooks/useMediaQuery'
import { ROUTES } from '@utils/constants/routes'
import { useTranslation } from 'next-i18next'

const Footer = () => {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const { t } = useTranslation(['common'])

  return (
    <footer className="border-t-black-contrast-400 flex flex-col items-center justify-between border-t py-8 max-md:pb-0 md:flex-row md:gap-7 md:px-7 md:py-10">
      <div className="flex flex-col items-center font-normal text-gray-10 md:min-w-[430px] md:flex-row">
        <p className="whitespace-pre-line pt-4 pb-7 text-paragraph-small font-normal max-md:text-center md:py-0 md:pl-3">
          {t('smiles-company-document', { symbol: isMobile ? '\n' : '-' })}
        </p>
      </div>
      <menu className="flex h-fit text-hyperlink-small font-bold text-white md:justify-end md:uppercase">
        <ul className="flex-direction-col md:flex-direction-row flex font-bold max-md:w-full max-md:flex-col max-md:items-center md:gap-11">
          <div className="flex border-gray-90 py-6 max-md:w-full max-md:justify-center max-md:border-t max-md:border-b">
            <a href={ROUTES.termsAndConditions()} download>
              {t('use-terms')}
            </a>
          </div>
        </ul>
      </menu>
    </footer>
  )
}

export default Footer
