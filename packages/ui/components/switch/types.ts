import { SwitchProps as BaseSwitchProps } from '@headlessui/react'

export type SwitchColors = 'default' | 'primary' | 'warning' | 'error'

export declare function SwitchFn<TTag extends React.ElementType = 'button'>(
  props: Omit<BaseSwitchProps<TTag>, 'className' | 'children' | 'value'> & {
    className?: string
    toggleclassName?: string
    value?: boolean
    srOnly?: string
    color?: SwitchColors
  },
  ref: React.Ref<HTMLButtonElement>,
): JSX.Element

export type SwitchProps = Omit<BaseSwitchProps<'button'>, 'className' | 'children' | 'value'> & {
  className?: string
  toggleclassName?: string
  value?: boolean
  srOnly?: string
  color?: SwitchColors
}
