import type { OptionProps } from '../../types'
import type { BaseAction, BaseAsyncSelectFn, BaseAsyncSelectProps } from './types'
import { Listbox } from '@headlessui/react'
import CoreAsyncSelect from './CoreAsyncSelect'

const BaseAsyncSelect: React.FC<BaseAsyncSelectProps<BaseAction>> = (props) => {
  const { name, disabled, onChange, onValueChange, ...rest } = props

  const handleChange = (value: OptionProps) => {
    onChange?.(value)
    onValueChange?.(value)
  }

  return (
    <Listbox name={name} disabled={disabled} value={rest.value || null} by="value" onChange={handleChange}>
      {({ open }) => <CoreAsyncSelect open={open} onChange={handleChange} {...rest} />}
    </Listbox>
  )
}

export default BaseAsyncSelect as typeof BaseAsyncSelectFn
