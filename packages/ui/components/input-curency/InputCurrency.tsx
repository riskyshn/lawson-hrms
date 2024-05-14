import type { InputCurrencyProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import InputWrapper from '../input-wrapper/InputWrapper'
import BaseInputCurrency from './BaseInputCurrency'

const InputCurrency = forwardRef<HTMLInputElement, InputCurrencyProps>((props, ref) => {
  const { id, name, help, label, labelRequired, error, className, inputClassName, wrapperClassName, ...rest } = props
  const wrapperProps = { label, labelRequired, error, className, help }

  return (
    <InputWrapper htmlFor={id || name} wrapperClassName={twMerge('relative mb-1', wrapperClassName)} {...wrapperProps}>
      <BaseInputCurrency ref={ref} id={id || name} name={name} error={error} className={inputClassName} {...rest} />
    </InputWrapper>
  )
})

InputCurrency.displayName = 'InputCurrency'

export default InputCurrency
