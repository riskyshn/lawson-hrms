import type { IDataTableEmployee } from '@/types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { EyeIcon, PenToolIcon, PowerIcon } from 'lucide-react'
import * as Table from '@/components/Tables'

type ActionMenuProps = {
  index: number
  item: IDataTableEmployee
  setSelectedTerminate?: (item: IDataTableEmployee) => void
  total: number
  upSpace: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, item, setSelectedTerminate, total, upSpace }) => {
  const navigate = useNavigate()

  const viewItem: Table.ActionMenuItemProps = {
    action() {
      navigate(`/employees/employee-management/${item.oid}`)
    },
    icon: EyeIcon,
    text: 'View Employee',
  }

  const editItem: Table.ActionMenuItemProps = {
    action() {
      navigate(`/employees/employee-management/${item.oid}/edit`)
    },
    icon: PenToolIcon,
    text: 'Edit Employee',
  }

  const resignTerminate: Table.ActionMenuItemProps = {
    action: () => setSelectedTerminate?.(item),
    icon: PowerIcon,
    iconClassName: 'text-error-600',
    text: 'Resign/Terminate',
  }

  const menuItems = [viewItem, editItem, resignTerminate]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menuItems.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
