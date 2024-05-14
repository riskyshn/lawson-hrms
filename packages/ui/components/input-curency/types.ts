import React, { ElementType } from 'react'

type Overwrite<T, U> = Pick<T, Exclude<keyof T, keyof U>> & U

export type InputCurrencyOnChangeValues = {
  float: number | null
  formatted: string
  value: string
}

export type IntlConfig = {
  locale: string
  currency?: string
}

export type BaseInputCurrencyProps = Overwrite<
  React.ComponentPropsWithRef<'input'>,
  {
    allowDecimals?: boolean
    allowNegativeValue?: boolean
    id?: string
    maxLength?: number
    className?: string
    customInput?: ElementType
    decimalsLimit?: number
    decimalScale?: number
    defaultValue?: number | string
    disabled?: boolean
    fixedDecimalLength?: number
    onValueChange?: (value: string | undefined, name?: string, values?: InputCurrencyOnChangeValues) => void
    placeholder?: string
    prefix?: string
    suffix?: string
    step?: number
    decimalSeparator?: string
    groupSeparator?: string
    disableGroupSeparators?: boolean
    disableAbbreviations?: boolean
    intlConfig?: IntlConfig
    transformRawValue?: (rawValue: string) => string

    error?: string
  }
>

export type InputCurrencyProps = BaseInputCurrencyProps & {
  help?: string
  label?: string
  labelRequired?: boolean
  inputClassName?: string
  wrapperClassName?: string
  startChildren?: React.ReactNode
  endChildren?: React.ReactNode
}
