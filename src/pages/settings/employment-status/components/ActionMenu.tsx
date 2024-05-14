import type { IJobType } from '@/types'
import React from 'react'
import { useConfirm, useToast } from '@jshrms/ui'
import { PenToolIcon, TrashIcon } from 'lucide-react'
import * as Table from '@/components/Elements/Tables/MainTable'
import { organizationService } from '@/services'

type ActionMenuProps = {
  index: number
  item: IJobType
  onDeleted?: (oid: string) => void
  setSelectedToUpdate?: (item: IJobType) => void
  total: number
  upSpace: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, item, onDeleted, setSelectedToUpdate, total, upSpace }) => {
  const confirm = useConfirm()
  const toast = useToast()

  const editJobType: Table.ActionMenuItemProps = {
    action() {
      setSelectedToUpdate?.(item)
    },
    icon: PenToolIcon,
    text: 'Edit Employment Status',
  }

  // const viewEmployees: Table.ActionMenuItemProps = {
  //   action() {
  //     //
  //   },
  //   icon: UsersIcon,
  //   text: 'View Employees',
  // }

  const deleteJobType: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary',
        confirmBtnColor: 'error',
        text: 'Are you sure you want to delete this Employment Status?',
      })
      if (confirmed) {
        try {
          await organizationService.deleteJobType(item.oid)
          toast('Employment Status deleted successfully.', { color: 'success' })
          onDeleted?.(item.oid)
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    text: 'Delete Employment Status',
  }

  // const menus = [editJobType, viewEmployees, deleteJobType]
  const menus = [editJobType, deleteJobType]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menus.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
