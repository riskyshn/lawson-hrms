import React from 'react'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenToolIcon, TrashIcon, UsersIcon } from 'lucide-react'
import * as Table from '@/components/Elements/Tables/MainTable'
import { organizationService } from '@/services'

type ActionMenuProps = {
  index: number
  item: IPosition
  onDeleted?: (oid: string) => void
  setSelectedToUpdate?: (item: IPosition) => void
  total: number
  upSpace: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, item, onDeleted, setSelectedToUpdate, total, upSpace }) => {
  const confirm = useConfirm()
  const toast = useToast()

  const editPosition: Table.ActionMenuItemProps = {
    action() {
      setSelectedToUpdate?.(item)
    },
    icon: PenToolIcon,
    text: 'Edit Position',
  }

  const viewEmployees: Table.ActionMenuItemProps = {
    action() {
      //
    },
    icon: UsersIcon,
    text: 'View Employees',
  }

  const deletePosition: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary',
        confirmBtnColor: 'error',
        text: 'Are you sure you want to delete this Position?',
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
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    text: 'Delete Position',
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
