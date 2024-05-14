import {
  _internal_ComponentSwitchDescription,
  _internal_ComponentSwitchLabel,
  Switch as BaseSwitch,
  SwitchGroupProps,
} from '@headlessui/react'

export { default as Switch } from './Switch'
export type { SwitchColors, SwitchProps } from './types'

export type {
  _internal_ComponentSwitchDescription as SwitchDescriptionProps,
  SwitchGroupProps,
  _internal_ComponentSwitchLabel as SwitchLabelProps,
}
export const SwitchLabel = BaseSwitch.Label
export const SwitchDescription = BaseSwitch.Description
export const SwitchGroup = BaseSwitch.Group
