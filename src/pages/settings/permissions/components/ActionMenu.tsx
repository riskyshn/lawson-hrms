import type { IPermission } from '@jshrms/shared/types'
import React from 'react'
import * as Table from '@jshrms/shared/components/Elements/Tables/MainTable'
import { authorityService } from '@jshrms/shared/services'
import { useConfirm, useToast } from '@jshrms/ui'
import { PenToolIcon, TrashIcon } from 'lucide-react'

type ActionMenuProps = {
  index: number
  onDeleted?: (oid: string) => void
  permission: IPermission
  setSelectedToUpdate?: (permission: IPermission) => void
  total: number
  upSpace: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, onDeleted, permission, setSelectedToUpdate, total, upSpace }) => {
  const toast = useToast()
  const confirm = useConfirm()

  const editPermission: Table.ActionMenuItemProps = {
    action() {
      setSelectedToUpdate?.(permission)
    },
    icon: PenToolIcon,
    text: 'Edit Permission',
  }

  const deletePermission: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary',
        confirmBtnColor: 'error',
        text: 'Are you sure you want to delete this permission?',
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
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    text: 'Delete Permission',
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
