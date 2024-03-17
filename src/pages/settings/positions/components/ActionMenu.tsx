import * as Table from '@/components/Elements/MainTable'
import { organizationService } from '@/services'
import { IPosition } from '@/types/oganizartion'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenToolIcon, TrashIcon, UsersIcon } from 'lucide-react'
import React from 'react'

type ActionMenuProps = {
  item: IPosition
  index: number
  total: number
  upSpace: number
  setSelectedToUpdate?: (item: IPosition) => void
  onDeleted?: (oid: string) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ item, index, total, upSpace, setSelectedToUpdate, onDeleted }) => {
  const confirm = useConfirm()
  const toast = useToast()

  const editPosition: Table.ActionMenuItemProps = {
    text: 'Edit Position',
    icon: PenToolIcon,
    action() {
      setSelectedToUpdate?.(item)
    },
  }

  const viewEmployees: Table.ActionMenuItemProps = {
    text: 'View Employees',
    icon: UsersIcon,
    action() {
      //
    },
  }

  const deletePosition: Table.ActionMenuItemProps = {
    text: 'Delete Position',
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    action: async () => {
      const confirmed = await confirm({
        text: 'Are you sure you want to delete this Position?',
        confirmBtnColor: 'error',
        cancelBtnColor: 'primary',
      })
      if (confirmed) {
        try {
          await organizationService.deletePosition(item.oid)
          toast('Position deleted successfully.', { color: 'success' })
          onDeleted?.(item.oid)
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
  }

  const menus = [editPosition, viewEmployees, deletePosition]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menus.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
