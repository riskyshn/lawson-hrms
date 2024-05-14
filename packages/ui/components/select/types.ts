import type { OptionProps } from '../../types'

export interface BaseSelectProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange'> {
  value?: string
  options: Array<OptionProps>
  onValueChange?: (value: string) => void
  onChange?: (value: string) => void

  error?: string
  name?: string
  disabled?: boolean
  noResults?: string
  placeholder?: string
  searchPlaceholder?: string
  toggleClassName?: string
  withReset?: boolean
  hideSearch?: boolean
}

export type BaseMultiSelectProps = Omit<BaseSelectProps, 'value' | 'onChange' | 'onValueChange'> & {
  value?: Array<string>
  onChange?: (value: Array<string>) => void
  onValueChange?: (value: Array<string>) => void
}

export interface SelectProps extends BaseSelectProps {
  help?: string
  label?: string
  labelRequired?: boolean
  wrapperClassName?: string
}

export type MultiSelectProps = BaseMultiSelectProps & {
  help?: string
  label?: string
  labelRequired?: boolean
  wrapperClassName?: string
}
