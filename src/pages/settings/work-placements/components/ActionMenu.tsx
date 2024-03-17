import * as Table from '@/components/Elements/MainTable'
import { organizationService } from '@/services'
import { IWorkplacement } from '@/types/oganizartion'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenToolIcon, TrashIcon, UsersIcon } from 'lucide-react'
import React from 'react'

type ActionMenuProps = {
  item: IWorkplacement
  index: number
  total: number
  upSpace: number
  setSelectedToUpdate?: (item: IWorkplacement) => void
  onDeleted?: (oid: string) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ item, index, total, upSpace, setSelectedToUpdate, onDeleted }) => {
  const confirm = useConfirm()
  const toast = useToast()

  const editWorkPlacement: Table.ActionMenuItemProps = {
    text: 'Edit Work Placement',
    icon: PenToolIcon,
    action() {
      setSelectedToUpdate?.(item)
    },
  }

  const viewCandidates: Table.ActionMenuItemProps = {
    text: 'View Candidates',
    icon: UsersIcon,
    action() {
      //
    },
  }

  const deleteWorkPlacement: Table.ActionMenuItemProps = {
    text: 'Delete Work Placement',
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    action: async () => {
      const confirmed = await confirm({
        text: 'Are you sure you want to delete this Work Placement?',
        confirmBtnColor: 'error',
        cancelBtnColor: 'primary',
      })
      if (confirmed) {
        try {
          await organizationService.deleteWorkplacement(item.oid)
          toast('Role deleted successfully.', { color: 'success', position: 'top-right' })
          onDeleted?.(item.oid)
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error', position: 'top-right' })
        }
      }
    },
  }

  const menus = [editWorkPlacement, viewCandidates, deleteWorkPlacement]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menus.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
