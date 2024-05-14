import type { InputFileProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import InputWrapper from '../input-wrapper/InputWrapper'
import { BaseInputFile } from './BaseInputFile'

const InputFile = forwardRef<HTMLInputElement, InputFileProps>((props, ref) => {
  const { id, name, label, labelRequired, error, className, inputClassName, wrapperClassName, ...rest } = props
  const wrapperProps = { label, labelRequired, error, className }

  return (
    <InputWrapper htmlFor={id || name} wrapperClassName={twMerge('relative mb-1', wrapperClassName)} {...wrapperProps}>
      <BaseInputFile ref={ref} id={id || name} name={name} error={error} className={inputClassName} {...rest} />
    </InputWrapper>
  )
})

InputFile.displayName = 'InputFile'

export default InputFile
