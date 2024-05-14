import type { RadioCheckboxProps } from './types'
import { forwardRef } from 'react'
import { Check } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

const InputCheckbox = forwardRef<HTMLInputElement, RadioCheckboxProps>((props, ref) => {
  const { children, className, ...rest } = props
  return (
    <div className={twMerge('flex items-center', className)}>
      <input ref={ref} type="checkbox" className="peer hidden" {...rest} />
      <label
        htmlFor={props.id}
        className="flex cursor-pointer items-center gap-2 text-xs peer-checked:[&>.box]:border-primary-600 peer-checked:[&>.box]:bg-primary-600 peer-checked:[&>.box]:text-white"
      >
        <span className="box flex h-4 w-4 items-center justify-center rounded border border-gray-300 text-transparent transition-colors">
          <Check className="block h-2 w-2" strokeWidth={5} />
        </span>
        {children}
      </label>
    </div>
  )
})

InputCheckbox.displayName = 'InputCheckbox'

export default InputCheckbox
