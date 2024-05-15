import type { IDepartment } from '@/types'
import React from 'react'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenToolIcon, TrashIcon } from 'lucide-react'
import * as Table from '@/components/Tables'
import { organizationService } from '@/services'

type ActionMenuProps = {
  index: number
  item: IDepartment
  onDeleted?: (oid: string) => void
  setSelectedToUpdate?: (item: IDepartment) => void
  total: number
  upSpace?: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, item, onDeleted, setSelectedToUpdate, total, upSpace = total > 8 ? 3 : 0 }) => {
  const confirm = useConfirm()
  const toast = useToast()

  const editDepartment: Table.ActionMenuItemProps = {
    action() {
      setSelectedToUpdate?.(item)
    },
    icon: PenToolIcon,
    text: 'Edit Department',
  }

  // const viewEmployees: Table.ActionMenuItemProps = {
  //   action() {
  //     //
  //   },
  //   icon: UsersIcon,
  //   text: 'View Employees',
  // }

  const deleteDepartment: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary',
        confirmBtnColor: 'error',
        text: 'Are you sure you want to delete this Department?',
      })
      if (confirmed) {
        try {
          await organizationService.deleteDepartment(item.oid)
          toast('Department deleted successfully.', { color: 'success' })
          onDeleted?.(item.oid)
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    text: 'Delete Department',
  }

  // const menus = [editDepartment, viewEmployees, deleteDepartment]
  const menus = [editDepartment, deleteDepartment]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menus.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
