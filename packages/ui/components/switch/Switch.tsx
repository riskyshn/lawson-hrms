import { forwardRef } from 'react'
import { Switch as BaseSwitch } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import { variants } from '../../utils'
import { SwitchFn, SwitchProps } from './types'

const Switch = forwardRef<any, SwitchProps>((props, ref) => {
  const { className, value, color, srOnly, toggleclassName, ...rest } = props
  return (
    <BaseSwitch
      ref={ref}
      checked={value}
      className={twMerge(
        'relative inline-flex h-6 w-10 items-center rounded-full shadow-inner transition-colors',
        value ? colorStyles(color) : 'bg-gray-300',
        className,
      )}
      {...rest}
    >
      <span
        className={twMerge(
          'block h-4 w-4 transform rounded-full bg-white transition',
          value ? 'translate-x-5' : 'translate-x-1',
          toggleclassName,
        )}
      />
      {srOnly && <span className="sr-only">{srOnly}</span>}
    </BaseSwitch>
  )
})

const colorStyles = variants({
  default: 'bg-gray-600',
  primary: 'bg-primary-600',
  warning: 'bg-warning-600',
  error: 'bg-error-600',
})

Switch.displayName = 'Switch'

export default Switch as typeof SwitchFn
