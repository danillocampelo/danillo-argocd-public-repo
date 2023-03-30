import React, { FC } from 'react'
import { AlertFillIcon } from '@assets/icons'
import {
  Input,
  Caption,
  DocumentInput,
  DatePicker,
  Divider,
} from '@components/index'
import {
  ValidateCPF,
  validateDocument,
} from '@utils/validations/validateDocuments'
import { Form } from 'antd'
import { useTranslation } from 'next-i18next'
import { CHECKOUT_FORM_INPUT_NAMES } from '@utils/constants/formInputName'
import { useCheckoutContext } from '@contexts/CheckoutContext'
import dayjs, { Dayjs } from 'dayjs'
import { Person } from '@models/Person'
import { ContentProps } from '@views/booking/components/BookingController'
import { RoomQuantity } from '../../RoomQuantitySelection'

const getDisabledDates = (type: string, isResponsible?: boolean) => {
  switch (type) {
    case 'adult':
      return (current: Dayjs) => {
        if (isResponsible) return current > dayjs().subtract(18, 'year')
        else return current > dayjs().subtract(12, 'year')
      }
    case 'child':
      return (current: Dayjs) => {
        return (
          current > dayjs().subtract(2, 'year') ||
          current < dayjs().subtract(11, 'year')
        )
      }
    case 'baby':
      return (current: Dayjs) => {
        return (
          current > dayjs().subtract(1, 'day') ||
          current < dayjs().subtract(24, 'month')
        )
      }
  }
}

const roomQuantitiesToPeopleList = (roomQuantities: RoomQuantity[]) => {
  const people = {
    adults: [],
    children: [],
    babies: [],
  } as any

  roomQuantities.forEach((roomQuantity, room) => {
    people.adults = [
      ...people.adults,
      ...quantityToArray(roomQuantity.adults, 'adult', room),
    ]
    people.children = [
      ...people.children,
      ...quantityToArray(roomQuantity.children, 'child', room),
    ]
    people.babies = [
      ...people.babies,
      ...quantityToArray(roomQuantity.babies, 'baby', room),
    ]
  })

  return people
}

const quantityToArray = (quantity: number, type: string, room: number) => {
  return new Array(quantity).fill('').map((_, index) => ({
    type,
    room,
    disabledDates: getDisabledDates(type, index === 0),
  }))
}

type Props = ContentProps<any>

export const People: FC<Props> = () => {
  const { formData, formInstance } = useCheckoutContext()

  const { t } = useTranslation(['checkout', 'common'])

  const peopleList = roomQuantitiesToPeopleList(
    formData.getRoomsQuantities() || [],
  )

  return (
    <div className="p-4 md:p-7 2xl:p-11">
      <h5 className="my-7 font-bold">{t('people.title')}</h5>
      {Object.entries(peopleList).map(([type, people]: any) =>
        people.map(
          (
            person: Person & { room: number; disabledDates: any },
            index: number,
          ) => {
            const isLast = index === peopleList.length - 1
            const personFieldIdentifier = [
              CHECKOUT_FORM_INPUT_NAMES.people,
              person.type,
              index,
            ]
            formInstance.setFieldValue(
              [...personFieldIdentifier, CHECKOUT_FORM_INPUT_NAMES.personRoom],
              person.room,
            )

            return (
              <>
                <h6 className="mb-6 font-bold">
                  {t(`people.${person.type}`, { count: index + 1 })}
                </h6>
                {index === 0 && (
                  <Caption Icon={AlertFillIcon} className="mb-8">
                    {t('people.caption')}
                  </Caption>
                )}
                <div className="flex flex-col gap-5 md:grid md:grid-cols-2 md:gap-8">
                  <Form.Item
                    name={[
                      ...personFieldIdentifier,
                      CHECKOUT_FORM_INPUT_NAMES.name,
                    ]}
                    label={t('people.name')}
                    rules={[
                      {
                        message: t('people.name-required'),
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      maxLength={50}
                      placeholder={t('people.insert-name')}
                      width="full"
                    />
                  </Form.Item>
                  <Form.Item
                    name={[
                      ...personFieldIdentifier,
                      CHECKOUT_FORM_INPUT_NAMES.lastName,
                    ]}
                    label={t('people.lastname')}
                    rules={[
                      {
                        message: t('people.lastname-required'),
                        required: true,
                      },
                    ]}
                  >
                    <Input
                      maxLength={50}
                      placeholder={t('people.insert-lastname')}
                      width="full"
                    />
                  </Form.Item>
                  <Form.Item
                    name={[
                      ...personFieldIdentifier,
                      CHECKOUT_FORM_INPUT_NAMES.document,
                    ]}
                    label={t('people.document')}
                    rules={[
                      {
                        validator: (_, values) =>
                          validateDocument(values.value, t, ValidateCPF),
                        validateTrigger: 'onChange',
                      },
                    ]}
                    tooltip={t('people.document-tooltip')}
                  >
                    <DocumentInput
                      width="full"
                      name={[...personFieldIdentifier, 'document']}
                      documentOptions={[
                        {
                          value: 'cpf',
                          label: 'document-input.cpf',
                          mask: '000.000.000-00',
                        },
                      ]}
                    />
                  </Form.Item>
                  <div className="flex flex-col gap-5 md:flex-row md:gap-8">
                    <Form.Item
                      name={[
                        ...personFieldIdentifier,
                        CHECKOUT_FORM_INPUT_NAMES.birthDate,
                      ]}
                      label={t('people.birth-date')}
                      rules={[
                        {
                          message: t('people.birth-date-required'),
                          required: true,
                        },
                      ]}
                      colon={false}
                    >
                      <DatePicker
                        className="w-full md:w-[15.75rem]"
                        disabledDate={person.disabledDates}
                      />
                    </Form.Item>
                  </div>
                </div>
                {!isLast && <Divider className="my-8 md:my-11" />}
              </>
            )
          },
        ),
      )}
    </div>
  )
}
