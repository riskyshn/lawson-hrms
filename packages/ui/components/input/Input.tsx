import type { InputProps } from './types'
import { forwardRef, useState } from 'react'
import { Eye } from 'lucide-react'
import { twJoin, twMerge } from 'tailwind-merge'
import InputWrapper from '../input-wrapper/InputWrapper'
import { BaseInput } from './BaseInput'

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const { id, name, type, help, label, labelRequired, error, className, inputClassName, wrapperClassName, leftChild, rightChild, ...rest } =
    props
  const wrapperProps = { label, labelRequired, error, className, help }

  const [showPassword, setShowPassword] = useState<boolean>(false)

  return (
    <InputWrapper htmlFor={id || name} wrapperClassName={twMerge('relative mb-1', wrapperClassName)} {...wrapperProps}>
      {leftChild}

      <BaseInput
        ref={ref}
        id={id || name}
        type={showPassword ? 'text' : type}
        name={name}
        error={error}
        className={twMerge(type === 'password' && 'pr-8', inputClassName)}
        {...rest}
      />

      {type === 'password' && (
        <button
          type="button"
          className={twJoin(
            'absolute bottom-0 right-0 top-0 flex items-center justify-center px-2',
            showPassword ? 'text-primary-600' : 'text-gray-400',
          )}
          onClick={() => setShowPassword((showPassword) => !showPassword)}
        >
          <Eye size={18} />
        </button>
      )}

      {rightChild}
    </InputWrapper>
  )
})

Input.displayName = 'Input'

export default Input
