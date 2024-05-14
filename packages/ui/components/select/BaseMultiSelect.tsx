import type { OptionProps } from '../../types'
import type { BaseMultiSelectProps } from './types'
import { useMemo } from 'react'
import { Listbox } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'
import ListboxButton from './ListboxButton'
import ListboxOptions from './ListboxOptions'

const BaseMultiSelect: React.FC<BaseMultiSelectProps> = (props) => {
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

  const selected = useMemo(() => {
    return (value?.map((el) => options.find((item) => item.value === el)).filter((el) => !!el) || []) as OptionProps[]
  }, [options, value])

  const handleReset: React.MouseEventHandler<HTMLSpanElement> = (e) => {
    e.preventDefault()
    onChange?.([])
    onValueChange?.([])
  }

  const listboxButtonProps = {
    id,
    error: !!error,
    className: toggleClassName,
    handleReset: withReset ? handleReset : undefined,
    value: `${(selected || []).map((el) => el.label).join(', ')}`,
    placeholder,
  }

  const listboxOptionsProps = {
    noResults,
    options,
    searchPlaceholder,
  }

  const handleChange = (value: OptionProps[]) => {
    const values = value.map((el) => el.value)
    onChange?.(values)
    onValueChange?.(values)
  }

  return (
    <Listbox name={name} disabled={disabled} value={selected || []} onChange={handleChange} multiple>
      {({ open }) => (
        <div className={twMerge('relative', className)} {...rest}>
          <ListboxButton open={open} {...listboxButtonProps} />
          <ListboxOptions open={open} hideSearch={hideSearch} {...listboxOptionsProps} />
        </div>
      )}
    </Listbox>
  )
}

export default BaseMultiSelect
