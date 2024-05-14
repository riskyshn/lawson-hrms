import type { BaseInputProps, InputProps } from '../input/types'

export type BaseInputTimeProps = Omit<BaseInputProps, 'type' | 'onChange'> & {
  onValueChange?: (value: string) => void
}

export type InputTimeProps = Omit<InputProps, 'type' | 'onChange'> & {
  onValueChange?: (value: string) => void
}
