import React from 'react'
import { Color, Variant } from '../../types'

export type ConfirmIconType = 'primary' | 'warning' | 'error'

export type ConfirmProps = {
  isShow?: boolean

  title?: string
  text?: string
  icon?: ConfirmIconType

  confirmBtnClass?: string
  confirmBtnText?: string
  confirmBtnVariant?: Variant
  confirmBtnColor?: Color

  cancelBtnClass?: string
  cancelBtnText?: string
  cancelBtnVariant?: Variant
  cancelBtnColor?: Color

  onConfirm?: React.MouseEventHandler<HTMLButtonElement>
  onCancel?: React.MouseEventHandler<HTMLButtonElement>
}
