import * as Table from '@/components/Elements/MainTable'
import { authorityService } from '@/services'
import { useConfirm, useToast } from 'jobseeker-ui'
import { LockIcon, PenToolIcon, TrashIcon } from 'lucide-react'
import React from 'react'

type ActionMenuProps = {
  role: IRole
  index: number
  total: number
  upSpace: number
  setSelectedToUpdate?: (role: IRole) => void
  setSelectedToUpdatePermission?: (role: IRole) => void
  onDeleted?: (oid: string) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  role,
  index,
  total,
  upSpace,
  setSelectedToUpdate,
  setSelectedToUpdatePermission,
  onDeleted,
}) => {
  const toast = useToast()
  const confirm = useConfirm()

  const editRole: Table.ActionMenuItemProps = {
    text: 'Edit Role',
    icon: PenToolIcon,
    action() {
      setSelectedToUpdate?.(role)
    },
  }

  const editAccessPolice: Table.ActionMenuItemProps = {
    text: 'Edit Access',
    icon: LockIcon,
    action() {
      setSelectedToUpdatePermission?.(role)
    },
  }

  const deleteRole: Table.ActionMenuItemProps = {
    text: 'Delete Role',
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    action: async () => {
      const confirmed = await confirm({
        text: 'Are you sure you want to delete this role?',
        confirmBtnColor: 'error',
        cancelBtnColor: 'primary',
      })
      if (confirmed) {
        try {
          await authorityService.deleteRole(role.oid)
          toast('Role deleted successfully.', { color: 'success', position: 'top-right' })
          onDeleted?.(role.oid)
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error', position: 'top-right' })
        }
      }
    },
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
