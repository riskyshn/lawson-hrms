import React from 'react'
import { LucideIcon } from 'lucide-react'

export type MainTableProps = {
  bodyItems: Array<
    {
      checkItem?: string
      items?: Array<JSX.IntrinsicElements['td']>
    } & JSX.IntrinsicElements['tr']
  >
  headerItems: Array<JSX.IntrinsicElements['th']>
  loading?: boolean
  checkedItems?: string[]
  areAllChecked?: boolean
  setCheckedItems?: (items: string[]) => void
  toggleCheckAll?: (check: boolean) => void
} & Omit<JSX.IntrinsicElements['table'], 'children'>

export type ActionMenuProps = {
  loading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  text?: string
  up?: boolean
  children?: JSX.Element[]
}

export type ActionMenuItemProps = {
  action?: React.MouseEventHandler<HTMLButtonElement>
  icon: LucideIcon
  iconClassName?: string
  text: string
}
