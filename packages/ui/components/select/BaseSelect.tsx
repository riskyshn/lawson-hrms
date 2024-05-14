import type { OptionProps } from '../../types'
import type { BaseSelectProps } from './types'
import { useMemo } from 'react'
import { Listbox } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import ListboxButton from './ListboxButton'
import ListboxOptions from './ListboxOptions'

const BaseSelect: React.FC<BaseSelectProps> = (props) => {
  const {
    className,
    error,
    id,
    name,
    noResults,
    onChange,
    onValueChange,
    options,
    placeholder,
    searchPlaceholder,
    toggleClassName,
    value,
    withReset,
    hideSearch,
    disabled,
    ...rest
  } = props

  const selected = useMemo(() => options.find((item) => item.value === value), [options, value])

  const handleReset: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.preventDefault()
    onChange?.('')
    onValueChange?.('')
  }

  const listboxButtonProps = {
    id,
    error: !!error,
    className: toggleClassName,
    handleReset: withReset ? handleReset : undefined,
    value: selected?.label || selected?.value,
    placeholder,
  }

  const listboxOptionsProps = {
    noResults,
    options,
    searchPlaceholder,
  }

  const handleChange = (v: OptionProps) => {
    onChange?.(v.value)
    onValueChange?.(v.value)
  }

  return (
    <Listbox name={name} disabled={disabled} value={selected || null} onChange={handleChange}>
      {({ open }) => (
        <div className={twMerge('relative', className)} {...rest}>
          <ListboxButton open={open} {...listboxButtonProps} />
          <ListboxOptions isSingle open={open} hideSearch={hideSearch} {...listboxOptionsProps} />
        </div>
      )}
    </Listbox>
  )
}

export default BaseSelect
