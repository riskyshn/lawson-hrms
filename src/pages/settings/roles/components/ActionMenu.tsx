import type { IRole } from '@jshrms/shared/types'
import React from 'react'
import * as Table from '@jshrms/shared/components/Elements/Tables/MainTable'
import { authorityService } from '@jshrms/shared/services'
import { useConfirm, useToast } from '@jshrms/ui'
import { LockIcon, PenToolIcon, TrashIcon } from 'lucide-react'

type ActionMenuProps = {
  index: number
  onDeleted?: (oid: string) => void
  role: IRole
  setSelectedToUpdate?: (role: IRole) => void
  setSelectedToUpdatePermission?: (role: IRole) => void
  total: number
  upSpace: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  index,
  onDeleted,
  role,
  setSelectedToUpdate,
  setSelectedToUpdatePermission,
  total,
  upSpace,
}) => {
  const toast = useToast()
  const confirm = useConfirm()

  const editRole: Table.ActionMenuItemProps = {
    action() {
      setSelectedToUpdate?.(role)
    },
    icon: PenToolIcon,
    text: 'Edit Role',
  }

  const editAccessPolice: Table.ActionMenuItemProps = {
    action() {
      setSelectedToUpdatePermission?.(role)
    },
    icon: LockIcon,
    text: 'Edit Access',
  }

  const deleteRole: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary',
        confirmBtnColor: 'error',
        text: 'Are you sure you want to delete this role?',
      })
      if (confirmed) {
        try {
          await authorityService.deleteRole(role.oid)
          toast('Role deleted successfully.', { color: 'success' })
          onDeleted?.(role.oid)
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    text: 'Delete Role',
  }

  const menus = [editRole, editAccessPolice, deleteRole]

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
