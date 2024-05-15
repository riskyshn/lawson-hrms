import type { IJobLevel } from '@/types'
import React from 'react'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenToolIcon, TrashIcon } from 'lucide-react'
import * as Table from '@/components/Tables'
import { organizationService } from '@/services'

type ActionMenuProps = {
  index: number
  item: IJobLevel
  onDeleted?: (oid: string) => void
  setSelectedToUpdate?: (item: IJobLevel) => void
  total: number
  upSpace?: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, item, onDeleted, setSelectedToUpdate, total, upSpace = total > 8 ? 3 : 0 }) => {
  const confirm = useConfirm()
  const toast = useToast()

  const editJobLevel: Table.ActionMenuItemProps = {
    action() {
      setSelectedToUpdate?.(item)
    },
    icon: PenToolIcon,
    text: 'Edit Job Level',
  }

  // const viewEmployees: Table.ActionMenuItemProps = {
  //   action() {
  //     //
  //   },
  //   icon: UsersIcon,
  //   text: 'View Employees',
  // }

  const deleteJobLevel: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary',
        confirmBtnColor: 'error',
        text: 'Are you sure you want to delete this Job Level?',
      })
      if (confirmed) {
        try {
          await organizationService.deleteJobLevel(item.oid)
          toast('Job Level deleted successfully.', { color: 'success' })
          onDeleted?.(item.oid)
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    text: 'Delete Job Level',
  }

  // const menus = [editJobLevel, viewEmployees, deleteJobLevel]
  const menus = [editJobLevel, deleteJobLevel]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menus.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
