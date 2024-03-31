import * as Table from '@/components/Elements/MainTable'
import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenToolIcon, TrashIcon, UsersIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type ActionMenuProps = {
  item: IDeductionComponent
  index: number
  total: number
  upSpace: number
  onRefresh?: () => void
  setSelectedToEdit?: (item: IDeductionComponent) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ item, index, total, upSpace, setSelectedToEdit, onRefresh }) => {
  const navigate = useNavigate()
  const toast = useToast()
  const confirm = useConfirm()

  const applyTo: Table.ActionMenuItemProps = {
    text: 'Apply to',
    icon: UsersIcon,
    action() {
      navigate(`/payroll/apply-to/deduction/${item.oid}`)
    },
  }

  const editComponent: Table.ActionMenuItemProps = {
    text: 'Edit Component',
    icon: PenToolIcon,
    action() {
      setSelectedToEdit?.(item)
    },
  }

  const deleteComponent: Table.ActionMenuItemProps = {
    text: 'Delete',
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    action: async () => {
      const confirmed = await confirm({
        text: 'Are you sure you want to delete this component?',
        confirmBtnColor: 'error',
        cancelBtnColor: 'primary',
      })
      if (confirmed) {
        try {
          await payrollService.deleteDeductionComponent(item.oid)
          toast('Deduction component deleted successfully.', { color: 'success' })
          onRefresh?.()
        } catch (e) {
          toast(axiosErrorMessage(e), { color: 'error' })
        }
      }
    },
  }

  const menu = [applyTo, editComponent, deleteComponent]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menu.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
