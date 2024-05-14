import type { InputTimeProps } from './types'
import { forwardRef } from 'react'
import InputWrapper from '../input-wrapper/InputWrapper'
import BaseInputTime from './BaseInputTime'

const InputTime = forwardRef<HTMLInputElement, InputTimeProps>((props, ref) => {
  const { id, name, help, label, labelRequired, error, className, inputClassName, leftChild, rightChild, ...rest } = props
  const wrapperProps = { label, labelRequired, error, className, help }

  return (
    <InputWrapper htmlFor={id || name} wrapperClassName="relative mb-1" {...wrapperProps}>
      {leftChild}
      <BaseInputTime ref={ref} id={id || name} name={name} error={error} className={inputClassName} {...rest} />
      {rightChild}
    </InputWrapper>
  )
})

InputTime.displayName = 'InputTime'

export default InputTime
