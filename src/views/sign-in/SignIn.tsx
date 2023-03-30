import { useTranslation } from 'next-i18next'
import { Themes } from '@utils/constants/theme'
import useMediaQuery from '@hooks/useMediaQuery'
import Button from '@components/atoms/Button'
import { SmilesMask } from './components/SmilesMask'
import LinkWithLocale from '@components/atoms/LinkWithLocale'
import { ROUTES } from '@utils/constants/routes'

const SignInPage = () => {
  const { t } = useTranslation(['sign-in-page', 'common'])
  const isMobile = useMediaQuery('(max-width: 768px)')

  /**
   * @todo
   * - Implementar request
   * - Salvar token gerado na sessão
   */

  return (
    <div className="flex h-full w-full flex-col bg-primary-contrast mix-blend-normal lg:flex-row">
      <SmilesMask isMobile={isMobile} />

      <main className="flex w-full flex-col overflow-y-auto px-6 py-7 md:px-10 lg:max-h-screen lg:w-1/3 lg:pb-13 lg:pt-10 xl:pt-12 2xl:pt-21">
        <h4 className="pb-7 font-bold text-white md:text-h5-desktop">
          {t('access-your-account')}
        </h4>

        <LinkWithLocale href={ROUTES.login()}>
          <Button
            type="submit"
            theme={Themes.dark}
            buttonType="primary"
            className="button-regular w-full"
          >
            {t('login')}
          </Button>
        </LinkWithLocale>
        <div className={'flex flex-row'}>
          <p className="pt-6 text-paragraph-medium text-gray-40">
            <strong className="mr-2 pt-6  text-paragraph-medium font-bold uppercase text-white">
              {t('common:important')}
            </strong>
            {t('description-login')}
          </p>
        </div>

        {/* <article className="pt-10 md:pt-12">
          <section>
            <h4 className="font-bold text-white md:text-h6-desktop">
              {t('first-time-here')}
            </h4>
            <p className="pb-6 pt-2 text-paragraph-small text-gray-40">
              {t('create-smiles-account')}
            </p>
          </section>

          <LinkWithLocale
            href={ROUTES.register()}
            target={'_blank'}
            isInternal={false}
          >
            <Button
              buttonType="secondary"
              theme={Themes.dark}
              className={'button-small w-full'}
            >
              {t('create-account')}
            </Button>
          </LinkWithLocale>
          <div className={'flex flex-row'}>
            <p className=" pt-6 text-paragraph-small text-gray-40 ">
              <strong className="mr-2 text-paragraph-small font-bold uppercase text-white">
                {t('common:important')}
              </strong>
              {t('description-signup')}
            </p>
          </div>
        </article> */}
      </main>
    </div>
  )
}

export default SignInPage
