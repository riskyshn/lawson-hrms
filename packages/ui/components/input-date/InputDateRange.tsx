import type { InputDateRangeProps } from './types'
import { twMerge } from 'tailwind-merge'
import InputWrapper from '../input-wrapper/InputWrapper'
import BaseInputDateRange from './BaseInputDateRange'

const InputDateRange: React.FC<InputDateRangeProps> = (props) => {
  const { id, name, label, labelRequired, error, className, wrapperClassName, ...rest } = props
  const wrapperProps = { label, labelRequired, error, className }

  return (
    <InputWrapper htmlFor={id || name} wrapperClassName={twMerge('relative mb-1', wrapperClassName)} {...wrapperProps}>
      <BaseInputDateRange inputId={id || name} inputName={name} error={error} {...rest} />
    </InputWrapper>
  )
}

export default InputDateRange
