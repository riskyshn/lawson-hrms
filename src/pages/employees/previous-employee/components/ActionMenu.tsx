import * as Table from '@/components/Elements/MainTable'
import { PowerIcon } from 'lucide-react'
import React from 'react'

type ActionMenuProps = {
  item: IEmployee
  index: number
  total: number
  upSpace: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, total, upSpace }) => {
  const blacklist: Table.ActionMenuItemProps = {
    text: 'Blacklist',
    icon: PowerIcon,
  }

  const menuItems = [blacklist]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menuItems.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
