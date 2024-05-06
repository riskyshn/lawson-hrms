import React from 'react'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenToolIcon, TrashIcon, UsersIcon } from 'lucide-react'
import * as Table from '@/components/Elements/Tables/MainTable'
import { organizationService } from '@/services'

type ActionMenuProps = {
  index: number
  item: IBranch
  onDeleted?: (oid: string) => void
  setSelectedToUpdate?: (item: IBranch) => void
  total: number
  upSpace: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, item, onDeleted, setSelectedToUpdate, total, upSpace }) => {
  const confirm = useConfirm()
  const toast = useToast()

  const editBranch: Table.ActionMenuItemProps = {
    action() {
      setSelectedToUpdate?.(item)
    },
    icon: PenToolIcon,
    text: 'Edit Branch',
  }

  const viewEmployees: Table.ActionMenuItemProps = {
    action() {
      //
    },
    icon: UsersIcon,
    text: 'View Employees',
  }

  const deleteBranch: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary',
        confirmBtnColor: 'error',
        text: 'Are you sure you want to delete this Branch?',
      })
      if (confirmed) {
        try {
          await organizationService.deleteBranch(item.oid)
          toast('Branch deleted successfully.', { color: 'success' })
          onDeleted?.(item.oid)
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    text: 'Delete Branch',
  }

  const menus = [editBranch, viewEmployees, deleteBranch]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menus.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
