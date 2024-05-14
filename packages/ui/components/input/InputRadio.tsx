import type { RadioCheckboxProps } from './types'
import { forwardRef } from 'react'
import { Circle } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

const InputRadio = forwardRef<HTMLInputElement, RadioCheckboxProps>((props, ref) => {
  const { children, className, ...rest } = props
  return (
    <div className={twMerge('flex items-center', className)}>
      <input ref={ref} type="radio" className="peer hidden" {...rest} />
      <label
        htmlFor={props.id}
        className="flex cursor-pointer items-center gap-2 text-xs peer-checked:[&>.box]:border-primary-600 peer-checked:[&>.box]:bg-primary-600 peer-checked:[&>.box]:text-white"
      >
        <span className="box flex h-4 w-4 items-center justify-center rounded-full border border-gray-300 text-transparent transition-colors">
          <Circle className="block h-1.5 w-1.5" fill="currentColor" strokeWidth={4} />
        </span>
        {children}
      </label>
    </div>
  )
})

InputRadio.displayName = 'InputRadio'

export default InputRadio
