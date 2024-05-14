import type { TextareaProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import InputWrapper from '../input-wrapper/InputWrapper'
import { BaseTextarea } from './BaseInput'

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>((props, ref) => {
  const { id, name, help, label, labelRequired, error, className, textareaClassName, wrapperClassName, ...rest } = props
  const wrapperProps = { label, labelRequired, error, className, help }

  return (
    <InputWrapper htmlFor={id || name} wrapperClassName={twMerge('relative mb-1', wrapperClassName)} {...wrapperProps}>
      <BaseTextarea ref={ref} id={id || name} name={name} error={error} className={textareaClassName} {...rest} />
    </InputWrapper>
  )
})

Textarea.displayName = 'Textarea'

export default Textarea
