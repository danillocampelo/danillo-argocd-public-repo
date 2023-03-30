import React, { FC } from 'react'
import { Select as AntdSelect, SelectProps } from 'antd'
import { OpenArrowDownIcon } from '@assets/icons'
import styles from './Select.module.css'

interface Props extends SelectProps<string> {
  name?: string
}

export const Select: FC<Props> = ({ name, onSearch, ...rest }) => (
  <AntdSelect
    id={name}
    showSearch={!!onSearch}
    onSearch={onSearch}
    className={`w-full md:w-[34.625rem] ${styles['custom-select']}`}
    allowClear
    filterOption={() => true}
    suffixIcon={<OpenArrowDownIcon className="mr-6" />}
    dropdownStyle={{ borderRadius: 0 }}
    {...rest}
  />
)
