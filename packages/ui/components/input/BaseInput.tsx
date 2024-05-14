import type { BaseInputProps, BaseTexareaProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(({ error, className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={twMerge(
        'peer block h-10 w-full rounded-lg border px-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none disabled:bg-gray-50',
        props.type === 'number' && '[&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
        error ? 'border-error-600 bg-error-50 focus:bg-white' : 'border-gray-300 bg-white focus:border-primary-600',
        className,
      )}
      onWheel={(e) => {
        if (props.type === 'number') {
          e.currentTarget.blur()
        }
      }}
      {...props}
    />
  )
})

BaseInput.displayName = 'BaseInput'

export const BaseTextarea = forwardRef<HTMLTextAreaElement, BaseTexareaProps>(({ error, className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={twMerge(
        'peer block w-full rounded-lg border p-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none  disabled:bg-gray-50',
        error ? 'border-error-600 bg-error-50 focus:bg-white' : 'border-gray-300 bg-white focus:border-primary-600',
        className,
      )}
      {...props}
    />
  )
})

BaseTextarea.displayName = 'BaseTextarea'
