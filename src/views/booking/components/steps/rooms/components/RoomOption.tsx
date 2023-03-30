import React, { FC } from 'react'
import { useTranslation } from 'next-i18next'
import { Room } from '@models/Room'
import IconTextList from '@components/atoms/IconTextList'
import RadioOption from '@components/atoms/RadioOption'
import { convertToCurrency } from '@utils/currency'
import Tag from '@components/atoms/Tag'
import Collapse from '@components/atoms/Collapse'
import { Panel } from '@components/atoms/Collapse/Collapse'
import styles from './RoomOption.module.css'
import { Pricing } from '@views/booking/components/Pricing'

type Props = {
  data: Room
  value: string
  currentValue: string
}

export const RoomOption: FC<Props> = ({ data, value, currentValue }) => {
  const { t } = useTranslation(['checkout', 'common'])

  return (
    <>
      <RadioOption
        currentValue={currentValue}
        value={value}
        buttonClassName="absolute top-6 left-6 xl:top-7 xl:left-7 z-10"
        className="flex flex-shrink-0 flex-col rounded bg-white pl-10 max-lg:w-full xl:max-w-[55.75rem] xl:flex-row xl:pl-11 2xl:max-w-[64.25rem] 3xl:max-w-[73.5rem] "
      >
        <main className="flex w-full flex-col p-7">
          <div className="flex flex-col justify-between xl:flex-row">
            <h6 className="font-bold">{data.title}</h6>
            <div className="flex flex-wrap gap-4 max-xl:pt-4">
              {data.recommended && <Tag>{t('recommended')}</Tag>}
              {data.remaining && (
                <Tag theme="warn">
                  {t('remaining-only', { number: data.remaining })}
                </Tag>
              )}
            </div>
          </div>
          <Collapse className="flex flex-col rounded-none border-0 text-paragraph-medium font-bold">
            <Panel
              header={`${t('accommodation.more-info')}`}
              key={''}
              className={`${styles['room-collapse-header']}`}
            >
              <IconTextList
                className="columns-1 py-6 text-gray-60 md:columns-2 xl:columns-3"
                metainfos={data.metainfos}
                itemClassName="first:mt-0 mt-4"
                iconSize="w-6"
              />
            </Panel>
          </Collapse>
          <Pricing price={data.price} />
        </main>
      </RadioOption>
    </>
  )
}
