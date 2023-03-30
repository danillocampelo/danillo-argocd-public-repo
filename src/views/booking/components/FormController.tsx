import { FC, useEffect, useState } from 'react'
import { Form } from 'antd'
import { ValidateErrorEntity } from 'rc-field-form/lib/interface'

import { useCheckoutContext } from '@contexts/CheckoutContext'

export type Props = {
  validateOnMount?: boolean
  setNextStepDisabled: (value: boolean) => void
  children: React.ReactNode
}

export const FormController: FC<Props> = ({
  validateOnMount = false,
  setNextStepDisabled,
  children,
}) => {
  const [formErrors, setFormErrors] = useState<string[]>([])
  const { formInstance } = useCheckoutContext()

  useEffect(() => {
    if (validateOnMount) formInstance.validateFields()
  }, [validateOnMount])

  useEffect(() => {
    if (formErrors.length > 0) {
      document
        .getElementById(formErrors[0])
        ?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [formErrors])

  const handleFinish = (e: any) => {
    setFormErrors([])
  }

  const handleFinishFailed = (e: ValidateErrorEntity<any>) => {
    setFormErrors(e.errorFields.map((error) => error.name.join()))
  }

  const handleFormChange = (_: any, allFieldsData: any[]) => {
    let hasUnfilledFields = false

    const fieldsWithError = allFieldsData.reduce(
      (errorArray: string[], field: any) => {
        if (field.errors.length > 0) {
          errorArray.push(field.name.join('_'))
        }

        if (field.value === undefined || field.value === null)
          hasUnfilledFields = true

        return errorArray
      },
      [],
    )

    if (fieldsWithError.length > 0 || hasUnfilledFields) {
      setNextStepDisabled(true)
      setFormErrors(fieldsWithError)
    } else setNextStepDisabled(false)
  }

  return (
    <Form
      form={formInstance}
      className="flex min-h-screen flex-col justify-between"
      onFinish={handleFinish}
      onFinishFailed={handleFinishFailed}
      onFieldsChange={handleFormChange}
      requiredMark={false}
      colon={false}
      validateTrigger={['onSubmit', 'onChange']}
    >
      {children}
    </Form>
  )
}
