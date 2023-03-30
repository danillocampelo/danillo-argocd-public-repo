import { FC, ReactNode, useContext } from 'react'
import { useTranslation } from 'next-i18next'
import { LocaleContext } from '@contexts/LocaleContext'
import Tag from '@components/atoms/Tag'
import LinkWithLocale from '@components/atoms/LinkWithLocale'
import { convertToCurrency } from '@utils/currency'
import { KeyToIconMapper, SmilesLogoIcon, PaidIcon } from '@assets/icons'

type Row = {
  icon: string
  title: string
  content: ReactNode
  tagText?: string
}

export type Props = {
  title: string
  rows: Row[]
  totalFees: number
  amount: number
  miles?: number
}

const Table: FC<Props> = ({ title, rows, totalFees, amount, miles }) => {
  const { t } = useTranslation(['checkout'])
  const { locale } = useContext(LocaleContext)

  return (
    <table className="flex flex-col p-4 max-xl:gap-6 md:p-7 2xl:p-11">
      <tr>
        <h5 className="mb-4 font-bold md:mb-4">{title}</h5>
      </tr>
      {rows.map((row) => {
        const Icon = KeyToIconMapper[row.icon]
        return (
          <tr
            key={row.title}
            className="flex flex-col border border-gray-20 p-6 max-xl:rounded"
          >
            <article className="md: mb-4 flex flex-col pb-4 md:flex-row md:justify-between">
              <div className="flex">
                <Icon className="h-7 w-7" />
                <h5 className="ml-6 font-bold max-xl:text-h5-mobile xl:text-h6-desktop">
                  {row.title}
                </h5>
              </div>

              {row.tagText && (
                <Tag theme="light" className="w-min max-md:mt-2">
                  {row.tagText}
                </Tag>
              )}
            </article>
            {row.content}
          </tr>
        )
      })}

      <tr className="flex flex-col justify-between bg-black max-xl:rounded xl:flex-row-reverse xl:items-center xl:px-11 xl:py-8">
        <div className="flex flex-col max-xl:w-full xl:mr-21 xl:flex-row xl:gap-13">
          {miles && (
            <div className="flex flex-col border-gray-80 max-xl:border-b max-xl:px-6 max-xl:py-4 xl:flex-row">
              <SmilesLogoIcon className="w-10 max-xl:mb-5 max-xl:mt-3 md:w-12 xl:mr-7 xl:w-14" />
              <strong className="max-w-[190px] text-paragraph-medium text-white xl:text-h5-mobile">
                {t('table.earned-miles', { miles })}
              </strong>
            </div>
          )}

          <div className="flex flex-col border-gray-80 max-xl:border-b max-xl:px-6 max-xl:py-4">
            <strong className="pb-2 text-paragraph-medium text-white xl:text-h5-mobile">
              {t('table.total-fees')}
            </strong>
            <span className="text-paragraph-small text-gray-20 xl:text-paragraph-medium">
              {convertToCurrency({ rawNumber: totalFees, locale })}
            </span>
          </div>
          <div className="flex flex-col border-gray-80 max-xl:border-b max-xl:px-6 max-xl:py-4">
            <strong className="pb-2 text-paragraph-medium text-white xl:text-h5-mobile">
              {t('table.amount')}
            </strong>
            <span className="text-paragraph-small text-gray-20 xl:text-paragraph-medium">
              {convertToCurrency({ rawNumber: amount, locale })}
            </span>
          </div>
        </div>
        <LinkWithLocale
          className="flex text-hyperlink-small text-primary max-xl:px-6 max-xl:py-4"
          href="/"
        >
          <PaidIcon className="mr-1 w-6" />
          {t('table.cancellation-policy')}
        </LinkWithLocale>
      </tr>
    </table>
  )
}

export default Table
