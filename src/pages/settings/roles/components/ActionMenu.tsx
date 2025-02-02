import type { IRole } from '@/types'
import React from 'react'
import { useConfirm, useToast } from 'jobseeker-ui'
import { LockIcon, PenToolIcon, TrashIcon } from 'lucide-react'
import * as Table from '@/components/Tables'
import { useHasPermission } from '@/contexts'
import { authorityService } from '@/services'

type ActionMenuProps = {
  index: number
  onDeleted?: (oid: string) => void
  role: IRole
  setSelectedToUpdate?: (role: IRole) => void
  setSelectedToUpdatePermission?: (role: IRole) => void
  total: number
  upSpace?: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  index,
  onDeleted,
  role,
  setSelectedToUpdate,
  setSelectedToUpdatePermission,
  total,
  upSpace = total > 8 ? 3 : 0,
}) => {
  const toast = useToast()
  const confirm = useConfirm()
  const hasPermissions = useHasPermission()

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

  const menus = [
    hasPermissions('update_roles') && editRole,
    hasPermissions('update_roles') && editAccessPolice,
    hasPermissions('delete_roles') && deleteRole,
  ]

  return (
    <>
      <Table.ActionMenu up={index >= total - upSpace}>
        {menus.map((item, i) => (
          <React.Fragment key={i}>{item && <Table.ActionMenuItem {...item} />}</React.Fragment>
        ))}
      </Table.ActionMenu>
    </>
  )
}

export default ActionMenu
