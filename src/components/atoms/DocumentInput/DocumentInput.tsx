import React, { FC, useEffect, useState } from 'react'
import { MaskedInput } from 'antd-mask-input'
import { Select } from 'antd'
import { useTranslation } from 'next-i18next'
import { OpenArrowDownIcon } from '@assets/icons'
import Divider from '../Divider'
import { useCheckoutContext } from '@contexts/CheckoutContext'

const widthClasses = {
  small: 'w-full md:w-[15rem]',
  medium: 'w-full md:w-[34rem]',
  full: 'w-full',
}

type DocumentOption = {
  value: string
  label: string
  mask: string
}

type DocumentValues = {
  type: string
  value: string
}

type Props = {
  className?: string
  name: (string | number)[]
  width?: 'small' | 'medium' | 'full'
  documentOptions?: DocumentOption[]
  onChange?: (input: { type: string; value: string }) => void
}

const findOption = (value: string, options: DocumentOption[]) => {
  return options.find((option) => option.value === value)
}

const inputHasErrors = (name: (string | number)[], fieldsData: any[]) => {
  const fieldData = fieldsData?.find(
    (fieldData) => fieldData.name.join('.') === name?.join('.'),
  )

  return fieldData?.errors?.length > 0
}

export const DocumentInput: FC<Props> = ({
  className,
  width = 'medium',
  documentOptions = [
    {
      value: 'rg',
      label: 'document-input.rg',
      mask: '00.000.000-0',
    },
    {
      value: 'cpf',
      label: 'document-input.cpf',
      mask: '000.000.000-00',
    },
    {
      value: 'passport',
      label: 'document-input.passport',
      mask: '00000000',
    },
  ],
  onChange,
  name,
}) => {
  const { t } = useTranslation(['common'])
  const { formInstance } = useCheckoutContext()
  const hasErrors = inputHasErrors(name, formInstance.getFieldsError())

  const [documentValues, setDocumentValues] = useState<DocumentValues>(
    formInstance.getFieldValue(name) || {
      type: documentOptions[0].value,
      value: undefined,
    },
  )

  const currentDocumentOption = findOption(documentValues.type, documentOptions)

  useEffect(() => {
    onChange?.(documentValues)
  }, [documentValues])

  return (
    <div
      id={name?.join('_')}
      style={{ display: 'flex' }}
      className={`h-11 border-2 p-5 transition-all duration-300 ${
        widthClasses[width]
      } ${
        hasErrors
          ? 'border-feedback-negative'
          : 'border-gray-20 focus-within:border-primary hover:border-primary'
      } ${className}`}
    >
      <Select
        bordered={false}
        dropdownMatchSelectWidth={false}
        options={documentOptions.map((option) => ({
          value: option.value,
          label: t(option.label),
        }))}
        dropdownStyle={{ borderRadius: 0 }}
        suffixIcon={<OpenArrowDownIcon />}
        onSelect={(type) => setDocumentValues({ type, value: '' })}
        className="self-center"
        style={{ width: '72px' }}
        value={documentValues.type}
      />
      <Divider isHorizontal className="bg-gray-20" width="2px" />
      <MaskedInput
        mask={currentDocumentOption ? currentDocumentOption.mask : ''}
        placeholder={t('document-input.insert-document')}
        bordered={false}
        onChange={(e) =>
          setDocumentValues((prev) => ({ ...prev, value: e.target.value }))
        }
        value={documentValues.value}
      />
    </div>
  )
}
