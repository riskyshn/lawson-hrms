import * as Table from '@/components/Elements/MainTable'
import { organizationService } from '@/services'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenToolIcon, TrashIcon } from 'lucide-react'
import React from 'react'

type ActionMenuProps = {
  item: IDocumentRequest
  index: number
  total: number
  upSpace: number
  setSelectedToUpdate?: (item: IDocumentRequest) => void
  onDeleted?: (oid: string) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ item, index, total, upSpace, setSelectedToUpdate, onDeleted }) => {
  const confirm = useConfirm()
  const toast = useToast()

  const editJobType: Table.ActionMenuItemProps = {
    text: 'Edit item',
    icon: PenToolIcon,
    action() {
      setSelectedToUpdate?.(item)
    },
  }

  const deleteJobType: Table.ActionMenuItemProps = {
    text: 'Delete item',
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    action: async () => {
      const confirmed = await confirm({
        text: 'Are you sure you want to delete this item?',
        confirmBtnColor: 'error',
        cancelBtnColor: 'primary',
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
