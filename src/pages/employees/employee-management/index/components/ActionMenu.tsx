import * as Table from '@/components/Elements/MainTable'
import { EyeIcon, PenToolIcon, PowerIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type ActionMenuProps = {
  item: IDataTableEmployee
  index: number
  total: number
  upSpace: number
  setSelectedTerminate?: (item: IDataTableEmployee) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ item, index, total, upSpace, setSelectedTerminate }) => {
  const navigate = useNavigate()

  const viewItem: Table.ActionMenuItemProps = {
    text: 'View Employee',
    icon: EyeIcon,
    action() {
      navigate(`/employees/employee-management/${item.oid}`)
    },
  }

  const editItem: Table.ActionMenuItemProps = {
    text: 'Edit Employee',
    icon: PenToolIcon,
    action() {
      navigate(`/employees/employee-management/${item.oid}/edit`)
    },
  }

  const resignTerminate: Table.ActionMenuItemProps = {
    text: 'Resign/Terminate',
    icon: PowerIcon,
    iconClassName: 'text-error-600',
    action: () => setSelectedTerminate?.(item),
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
