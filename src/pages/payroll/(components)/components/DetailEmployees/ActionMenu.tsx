import type { IComponentInEmployee } from '@jshrms/shared/types'
import React from 'react'
import * as Table from '@jshrms/shared/components/Elements/Tables/MainTable'
import { axiosErrorMessage } from '@jshrms/shared/utils'
import { useConfirm, useToast } from '@jshrms/ui'
import { PenIcon, TrashIcon } from 'lucide-react'

type ActionMenuProps = {
  index: number
  item: IComponentInEmployee
  onRefresh?: () => void
  total: number
  upSpace: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, onRefresh, total, upSpace }) => {
  const confirm = useConfirm()
  const toast = useToast()

  const editComponent: Table.ActionMenuItemProps = {
    icon: PenIcon,
    text: 'Edit',
  }

  const deleteComponent: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary',
        confirmBtnColor: 'error',
        text: 'Are you sure you want to delete this component from this employee?',
      })

      if (confirmed) {
        try {
          throw new Error('Endpoint api belum ada.')
          toast('Employee component deleted successfully.', { color: 'success' })
          onRefresh?.()
        } catch (e) {
          toast(axiosErrorMessage(e), { color: 'error' })
        }
      }
    },
    icon: TrashIcon,
    text: 'Delete',
  }

  const menuItems = [editComponent, deleteComponent]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menuItems.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
