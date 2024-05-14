import type { IDocumentRequest } from '@jshrms/shared/types'
import React from 'react'
import * as Table from '@jshrms/shared/components/Elements/Tables/MainTable'
import { organizationService } from '@jshrms/shared/services'
import { useConfirm, useToast } from '@jshrms/ui'
import { PenToolIcon, TrashIcon } from 'lucide-react'

type ActionMenuProps = {
  index: number
  item: IDocumentRequest
  onDeleted?: (oid: string) => void
  setSelectedToUpdate?: (item: IDocumentRequest) => void
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
    text: 'Edit item',
  }

  const deleteJobType: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary',
        confirmBtnColor: 'error',
        text: 'Are you sure you want to delete this item?',
      })
      if (confirmed) {
        try {
          await organizationService.deleteDocumentRequest(item.oid)
          toast('Document Request deleted successfully.', { color: 'success' })
          onDeleted?.(item.oid)
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    text: 'Delete item',
  }

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
