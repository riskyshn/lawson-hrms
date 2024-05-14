import type { InputDateProps } from './types'
import { twMerge } from 'tailwind-merge'
import InputWrapper from '../input-wrapper/InputWrapper'
import BaseInputDate from './BaseInputDate'

const InputDate: React.FC<InputDateProps> = (props) => {
  const { id, name, label, labelRequired, error, className, wrapperClassName, ...rest } = props
  const wrapperProps = { label, labelRequired, error, className }

  return (
    <InputWrapper htmlFor={id || name} wrapperClassName={twMerge('relative mb-1', wrapperClassName)} {...wrapperProps}>
      <BaseInputDate inputId={id || name} inputName={name} error={error} {...rest} />
    </InputWrapper>
  )
}

export default InputDate
