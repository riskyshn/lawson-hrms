import type { Editor as MCE } from '@tinymce/tinymce-react'
import type { EditorProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import InputWrapper from '../input-wrapper/InputWrapper'
import BaseEditor from './BaseEditor'

const Editor: React.ForwardRefRenderFunction<MCE, EditorProps> = (props, ref) => {
  const { id, name, help, label, labelRequired, error, wrapperClassName, className, ...rest } = props
  const wrapperProps = { label, labelRequired, error, className, help }

  return (
    <InputWrapper htmlFor={id || name} wrapperClassName={twMerge('relative mb-1', wrapperClassName)} {...wrapperProps}>
      <BaseEditor ref={ref} id={id || name} name={name} error={error} {...rest} />
    </InputWrapper>
  )
}

export default forwardRef(Editor)
