import type { MultiSelectProps } from './types'
import { twMerge } from 'tailwind-merge'
import { InputWrapper } from '../input-wrapper'
import BaseMultiSelect from './BaseMultiSelect'

const MultiSelect: React.FC<MultiSelectProps> = (props) => {
  const { id, name, help, label, labelRequired, error, className, wrapperClassName, ...rest } = props

  return (
    <InputWrapper
      htmlFor={id || name}
      wrapperClassName={twMerge('relative mb-1', wrapperClassName)}
      label={label}
      labelRequired={labelRequired}
      error={error}
      className={className}
      help={help}
    >
      <BaseMultiSelect id={id || name} name={name} error={error} {...rest} />
    </InputWrapper>
  )
}

export default MultiSelect
