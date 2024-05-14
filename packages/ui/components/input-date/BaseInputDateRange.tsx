import type { BaseInputDateRangeProps } from './types'
import Datepicker from 'react-tailwindcss-datepicker'
import { CalendarDaysIcon, XIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

const BaseInputDate: React.FC<BaseInputDateRangeProps> = (props) => {
  const { value, error, inputClassName, toggleClassName, popoverDirection = 'down', className, onValueChange, onChange, ...rest } = props

  const handleChange: BaseInputDateRangeProps['onChange'] = (value, event) => {
    onChange?.(value, event)

    const startDate = value?.startDate && new Date(value.startDate)
    const endDate = value?.endDate && new Date(value.endDate)

    if (startDate && endDate) {
      onValueChange?.({ startDate, endDate })
    } else {
      // @ts-expect-error
      onValueChange?.(undefined)
    }
  }

  return (
    <Datepicker
      containerClassName={twMerge('relative w-full', className)}
      inputClassName={twMerge(
        'block h-10 w-full rounded-lg border px-2 text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none',
        error ? 'border-error-600 bg-error-50 focus:bg-white' : 'border-gray-300 bg-white focus:border-primary-600',
        inputClassName,
      )}
      toggleClassName={twMerge('absolute bottom-0 right-0 top-0 flex items-center justify-center px-2 text-gray-400', toggleClassName)}
      toggleIcon={(open) => (open ? <CalendarDaysIcon size={16} /> : <XIcon size={18} />)}
      popoverDirection={popoverDirection}
      value={value || { startDate: null, endDate: null }}
      onChange={handleChange}
      {...rest}
    />
  )
}

export default BaseInputDate
