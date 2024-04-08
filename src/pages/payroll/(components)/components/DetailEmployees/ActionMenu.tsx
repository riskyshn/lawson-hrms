import * as Table from '@/components/Elements/MainTable'
import { axiosErrorMessage } from '@/utils/axios'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenIcon, TrashIcon } from 'lucide-react'
import React from 'react'

type ActionMenuProps = {
  item: IComponentInEmployee
  index: number
  total: number
  upSpace: number
  onRefresh?: () => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, total, upSpace, onRefresh }) => {
  const confirm = useConfirm()
  const toast = useToast()

  const editComponent: Table.ActionMenuItemProps = {
    text: 'Edit',
    icon: PenIcon,
  }

  const deleteComponent: Table.ActionMenuItemProps = {
    text: 'Delete',
    icon: TrashIcon,
    action: async () => {
      const confirmed = await confirm({
        text: 'Are you sure you want to delete this component from this employee?',
        confirmBtnColor: 'error',
        cancelBtnColor: 'primary',
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
