import type { AsyncSelectFn, AsyncSelectProps, BaseAction } from './types'
import { twMerge } from 'tailwind-merge'
import { InputWrapper } from '../input-wrapper'
import BaseAsyncSelect from './BaseAsyncSelect'

const AsyncSelect: React.FC<AsyncSelectProps<BaseAction>> = (props) => {
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
      <BaseAsyncSelect id={id || name} name={name} error={error} {...rest} />
    </InputWrapper>
  )
}

export default AsyncSelect as typeof AsyncSelectFn
