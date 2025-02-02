import type { IPermission } from '@/types'
import React from 'react'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenToolIcon, TrashIcon } from 'lucide-react'
import * as Table from '@/components/Tables'
import { useHasPermission } from '@/contexts'
import { authorityService } from '@/services'

type ActionMenuProps = {
  index: number
  onDeleted?: (oid: string) => void
  permission: IPermission
  setSelectedToUpdate?: (permission: IPermission) => void
  total: number
  upSpace?: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  index,
  onDeleted,
  permission,
  setSelectedToUpdate,
  total,
  upSpace = total > 8 ? 3 : 0,
}) => {
  const toast = useToast()
  const confirm = useConfirm()
  const hasPermissions = useHasPermission()

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

  const menus = [hasPermissions('update_permissions') && editPermission, hasPermissions('delete_permissions') && deletePermission]

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
