import * as Table from '@/components/Elements/MainTable'
import { organizationService } from '@/services'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenToolIcon, TrashIcon, UsersIcon } from 'lucide-react'
import React from 'react'

type ActionMenuProps = {
  item: IJobLevel
  index: number
  total: number
  upSpace: number
  setSelectedToUpdate?: (item: IJobLevel) => void
  onDeleted?: (oid: string) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ item, index, total, upSpace, setSelectedToUpdate, onDeleted }) => {
  const confirm = useConfirm()
  const toast = useToast()

  const editJobLevel: Table.ActionMenuItemProps = {
    text: 'Edit Job Level',
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

  const deleteJobLevel: Table.ActionMenuItemProps = {
    text: 'Delete Job Level',
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    action: async () => {
      const confirmed = await confirm({
        text: 'Are you sure you want to delete this Job Level?',
        confirmBtnColor: 'error',
        cancelBtnColor: 'primary',
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
  }

  const menus = [editJobLevel, viewEmployees, deleteJobLevel]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menus.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu