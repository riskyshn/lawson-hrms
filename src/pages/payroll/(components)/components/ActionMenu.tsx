import * as Table from '@/components/Elements/Tables/MainTable'
import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenToolIcon, TrashIcon, UsersIcon } from 'lucide-react'
import React from 'react'

interface ActionMenuProps {
  item: IBenefitComponent | IDeductionComponent
  type: 'BENEFIT' | 'DEDUCTION'
  index: number
  total: number
  upSpace: number
  onRefresh?: () => void
  setSelectedToEdit?: (item: IBenefitComponent | IDeductionComponent) => void
  setSelectedToApply?: (item: IBenefitComponent | IDeductionComponent) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ type, item, index, total, upSpace, setSelectedToEdit, setSelectedToApply, onRefresh }) => {
  const toast = useToast()
  const confirm = useConfirm()

  const actions = [
    {
      text: 'Apply to',
      icon: UsersIcon,
      action: () => setSelectedToApply?.(item),
    },
    {
      text: 'Edit Component',
      icon: PenToolIcon,
      action: () => setSelectedToEdit?.(item),
    },
    {
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
            const deleteFn = type === 'BENEFIT' ? payrollService.deleteBenefitComponent : payrollService.deleteDeductionComponent
            await deleteFn(item.oid)
            toast('Component deleted successfully.', { color: 'success' })
            onRefresh?.()
          } catch (e) {
            toast(axiosErrorMessage(e), { color: 'error' })
          }
        }
      },
    },
  ]

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {actions.map((action, i) => (
        <Table.ActionMenuItem key={i} {...action} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
