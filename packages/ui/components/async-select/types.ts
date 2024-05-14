import type { OptionProps } from '../../types'

export type ActionReturnType<T extends (...args: any[]) => any> = ReturnType<T>
export type BaseAction = (...args: any[]) => Promise<any>
export type Converter<T extends BaseAction> = (response: Awaited<ReturnType<T>>) => OptionProps[]

export declare function BaseAsyncSelectFn<T extends BaseAction>(props: BaseAsyncSelectProps<T>): JSX.Element
export interface BaseAsyncSelectProps<T extends BaseAction>
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children' | 'onChange' | 'value'> {
  action: T
  value?: OptionProps | null
  onValueChange?: (value: OptionProps) => void
  onChange?: (value: OptionProps) => void
  params?: Parameters<T>[0]
  converter: Converter<T>
  searchMinCharacter?: number
  error?: string
  name?: string
  disabled?: boolean
  placeholder?: string
  searchPlaceholder?: string
  toggleClassName?: string
  withReset?: boolean
  hideSearch?: boolean
  searchQueryKey?: string
  disableInfiniteScroll?: boolean
  limit?: number
  limitKey?: string
}

export declare function BaseAsyncMultiSelectFn<T extends BaseAction>(props: BaseAsyncMultiSelectProps<T>): JSX.Element
export interface BaseAsyncMultiSelectProps<T extends BaseAction>
  extends Omit<BaseAsyncSelectProps<T>, 'onValueChange' | 'onChange' | 'value'> {
  value?: OptionProps[]
  onValueChange?: (value: OptionProps[]) => void
  onChange?: (value: OptionProps[]) => void
}

export declare function CoreAsyncSelectFn<T extends BaseAction>(props: CoreAsyncSelectProps<T>): JSX.Element
export interface CoreAsyncSelectProps<T extends BaseAction> extends Omit<BaseAsyncSelectProps<T>, 'disabled' | 'name'> {
  open: boolean
}

export declare function CoreAsyncMultiSelectFn<T extends BaseAction>(props: CoreAsyncMultiSelectProps<T>): JSX.Element
export interface CoreAsyncMultiSelectProps<T extends BaseAction> extends Omit<BaseAsyncMultiSelectProps<T>, 'disabled' | 'name'> {
  open: boolean
}

export declare function AsyncSelectFn<T extends BaseAction>(props: AsyncSelectProps<T>): JSX.Element
export interface AsyncSelectProps<T extends BaseAction> extends BaseAsyncSelectProps<T> {
  help?: string
  label?: string
  labelRequired?: boolean
  wrapperClassName?: string
}

export declare function AsyncMultiSelectFn<T extends BaseAction>(props: AsyncMultiSelectProps<T>): JSX.Element
export interface AsyncMultiSelectProps<T extends BaseAction> extends BaseAsyncMultiSelectProps<T> {
  help?: string
  label?: string
  labelRequired?: boolean
  wrapperClassName?: string
}
