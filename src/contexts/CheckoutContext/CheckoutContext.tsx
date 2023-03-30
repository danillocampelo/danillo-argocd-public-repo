import React, { createContext, FC, useContext, useState } from 'react'
import { Dayjs } from 'dayjs'

import { Form, FormInstance } from 'antd'
import { RoomQuantity } from '@views/booking/components/RoomQuantitySelection'
import { CHECKOUT_FORM_INPUT_NAMES } from '@utils/constants/formInputName'

export type PersonFormData = {
  document: {
    type: string
    value: string
  }
  name: string
  'last-name': string
  'birth-date': Dayjs
  'person-room': number
}

export type PeopleFormData = {
  adult: PersonFormData[]
  child: PersonFormData[]
  baby: PersonFormData[]
}

export type CheckoutFormData = {
  roomsQuantities?: RoomQuantity[]
  people?: PeopleFormData
  departureDate?: Dayjs
  returnDate?: Dayjs
  originId?: string
  originQuery?: string
  hotelId?: string
  departureFlightId?: string
  returnFlightId?: string
  roomsId?: string[]
}

export type CheckoutFormGetters = {
  getRoomsQuantities: () => RoomQuantity[] | undefined
  getPeople: () => PeopleFormData
  getDepartureDate: () => Dayjs
  getReturnDate: () => Dayjs
  getOriginId: () => string
  getOriginQuery: () => string
  getHotelId: () => string
  getDepartureFlightId: () => string
  getReturnFlightId: () => string
  getRoomIds: () => string[] | undefined
}

export type ContextValue = {
  formData: CheckoutFormGetters
  formInstance: FormInstance<CheckoutFormData>
  triggerRender: () => void
  bookingId: string
  setBookingId: React.Dispatch<React.SetStateAction<string>>
  totalAmount: number
  setTotalAmount: React.Dispatch<React.SetStateAction<number>>
  totalFees: number
  setTotalFees: React.Dispatch<React.SetStateAction<number>>
}

export const CheckoutContext = createContext<ContextValue>({} as any)

export const CheckoutProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [form] = Form.useForm<CheckoutFormData>()
  const [bookingId, setBookingId] = useState<string>('')
  const [totalAmount, setTotalAmount] = useState(0)
  const [totalFees, setTotalFees] = useState(0)
  const [, setShouldUpdate] = useState(false)

  const formData: CheckoutFormGetters = {
    getRoomsQuantities: () =>
      form.getFieldValue(CHECKOUT_FORM_INPUT_NAMES.roomQuantities),
    getPeople: () => form.getFieldValue(CHECKOUT_FORM_INPUT_NAMES.people),
    getDepartureDate: () =>
      form.getFieldValue(CHECKOUT_FORM_INPUT_NAMES.departureDate),
    getReturnDate: () =>
      form.getFieldValue(CHECKOUT_FORM_INPUT_NAMES.returnDate),
    getOriginId: () =>
      form.getFieldValue(CHECKOUT_FORM_INPUT_NAMES.originId) || '',
    getOriginQuery: () =>
      form.getFieldValue(CHECKOUT_FORM_INPUT_NAMES.originQuery) || '',
    getHotelId: () =>
      form.getFieldValue(CHECKOUT_FORM_INPUT_NAMES.hotelId) || '',
    getDepartureFlightId: () =>
      form.getFieldValue(CHECKOUT_FORM_INPUT_NAMES.departureFlightId) || '',
    getReturnFlightId: () =>
      form.getFieldValue(CHECKOUT_FORM_INPUT_NAMES.returnFlightId) || '',
    getRoomIds: () => form.getFieldValue(CHECKOUT_FORM_INPUT_NAMES.roomId),
  }

  return (
    <CheckoutContext.Provider
      value={{
        formData,
        formInstance: form,
        triggerRender: () => setShouldUpdate((prev) => !prev),
        bookingId,
        setBookingId,
        totalAmount,
        setTotalAmount,
        totalFees,
        setTotalFees,
      }}
    >
      {children}
    </CheckoutContext.Provider>
  )
}

export const useCheckoutContext = (): ContextValue => {
  return useContext(CheckoutContext)
}
