import type { AsyncMultiSelectFn, AsyncMultiSelectProps, BaseAction } from './types'
import { twMerge } from 'tailwind-merge'
import { InputWrapper } from '../input-wrapper'
import BaseAsyncMultiSelect from './BaseAsyncMultiSelect'

const AsyncMultiSelect: React.FC<AsyncMultiSelectProps<BaseAction>> = (props) => {
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
      <BaseAsyncMultiSelect id={id || name} name={name} error={error} {...rest} />
    </InputWrapper>
  )
}

export default AsyncMultiSelect as typeof AsyncMultiSelectFn
