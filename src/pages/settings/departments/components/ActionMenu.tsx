import * as Table from '@/components/Elements/MainTable'
import { organizationService } from '@/services'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenToolIcon, TrashIcon, UsersIcon } from 'lucide-react'
import React from 'react'

type ActionMenuProps = {
  item: IDepartment
  index: number
  total: number
  upSpace: number
  setSelectedToUpdate?: (item: IDepartment) => void
  onDeleted?: (oid: string) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ item, index, total, upSpace, setSelectedToUpdate, onDeleted }) => {
  const confirm = useConfirm()
  const toast = useToast()

  const editDepartment: Table.ActionMenuItemProps = {
    text: 'Edit Department',
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

  const deleteDepartment: Table.ActionMenuItemProps = {
    text: 'Delete Department',
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    action: async () => {
      const confirmed = await confirm({
        text: 'Are you sure you want to delete this Department?',
        confirmBtnColor: 'error',
        cancelBtnColor: 'primary',
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
  }

  const menus = [editDepartment, viewEmployees, deleteDepartment]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menus.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
