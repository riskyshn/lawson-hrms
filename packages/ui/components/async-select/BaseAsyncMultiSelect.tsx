import type { OptionProps } from '../../types'
import type { BaseAction, BaseAsyncMultiSelectFn, BaseAsyncMultiSelectProps } from './types'
import { Listbox } from '@headlessui/react'
import CoreAsyncMultiSelect from './CoreAsyncMultiSelect'

const BaseAsyncMultiSelect: React.FC<BaseAsyncMultiSelectProps<BaseAction>> = (props) => {
  const { name, disabled, onChange, onValueChange, ...rest } = props

  const handleChange = (value: OptionProps[]) => {
    onChange?.(value)
    onValueChange?.(value)
  }

  return (
    <Listbox multiple name={name} disabled={disabled} value={rest.value || []} by="value" onChange={handleChange}>
      {({ open }) => <CoreAsyncMultiSelect open={open} onChange={handleChange} {...rest} />}
    </Listbox>
  )
}

export default BaseAsyncMultiSelect as typeof BaseAsyncMultiSelectFn
