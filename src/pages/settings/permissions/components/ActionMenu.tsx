import * as Table from '@/components/Elements/MainTable'
import { authorityService } from '@/services'
import { useConfirm, useToast } from 'jobseeker-ui'
import { LockIcon, PenToolIcon, TrashIcon } from 'lucide-react'
import React from 'react'

type ActionMenuProps = {
  permission: IPermission
  index: number
  total: number
  upSpace: number
  setSelectedToUpdate?: (permission: IPermission) => void
  onDeleted?: (oid: string) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ permission, index, total, upSpace, setSelectedToUpdate, onDeleted }) => {
  const toast = useToast()
  const confirm = useConfirm()

  const editPermission: Table.ActionMenuItemProps = {
    text: 'Edit Permission',
    icon: PenToolIcon,
    action() {
      setSelectedToUpdate?.(permission)
    },
  }

  const deletePermission: Table.ActionMenuItemProps = {
    text: 'Delete Permission',
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    action: async () => {
      const confirmed = await confirm({
        text: 'Are you sure you want to delete this permission?',
        confirmBtnColor: 'error',
        cancelBtnColor: 'primary',
      })
      if (confirmed) {
        try {
          await authorityService.deletePermission(permission.oid)
          toast('Permission deleted successfully.', { color: 'success' })
          onDeleted?.(permission.oid)
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
  }

  const menus = [editPermission, deletePermission]

  return (
    <>
      <Table.ActionMenu up={index >= total - upSpace}>
        {menus.map((item, i) => (
          <Table.ActionMenuItem key={i} {...item} />
        ))}
      </Table.ActionMenu>
    </>
  )
}

export default ActionMenu
