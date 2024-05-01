import * as Table from '@/components/Elements/Tables/MainTable'
import { organizationService } from '@/services'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenToolIcon, TrashIcon, UsersIcon } from 'lucide-react'
import React from 'react'

type ActionMenuProps = {
  index: number
  item: IWorkplacement
  onDeleted?: (oid: string) => void
  setSelectedToUpdate?: (item: IWorkplacement) => void
  total: number
  upSpace: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, item, onDeleted, setSelectedToUpdate, total, upSpace }) => {
  const confirm = useConfirm()
  const toast = useToast()

  const editWorkPlacement: Table.ActionMenuItemProps = {
    action() {
      setSelectedToUpdate?.(item)
    },
    icon: PenToolIcon,
    text: 'Edit Work Placement',
  }

  const viewEmployees: Table.ActionMenuItemProps = {
    action() {
      //
    },
    icon: UsersIcon,
    text: 'View Employees',
  }

  const deleteWorkPlacement: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary',
        confirmBtnColor: 'error',
        text: 'Are you sure you want to delete this Work Placement?',
      })
      if (confirmed) {
        try {
          await organizationService.deleteWorkplacement(item.oid)
          toast('Work Plecement deleted successfully.', { color: 'success' })
          onDeleted?.(item.oid)
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    text: 'Delete Work Placement',
  }

  const menus = [editWorkPlacement, viewEmployees, deleteWorkPlacement]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menus.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
