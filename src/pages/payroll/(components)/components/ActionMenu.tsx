import type { IBenefitComponent, IDeductionComponent } from '@/types'
import React from 'react'
import { useConfirm, useToast } from 'jobseeker-ui'
import { PenToolIcon, TrashIcon, UsersIcon } from 'lucide-react'
import * as Table from '@/components/Tables'
import { payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils'

interface ActionMenuProps {
  index: number
  item: IBenefitComponent | IDeductionComponent
  onRefresh?: () => void
  setSelectedToApply?: (item: IBenefitComponent | IDeductionComponent) => void
  setSelectedToEdit?: (item: IBenefitComponent | IDeductionComponent) => void
  total: number
  type: 'BENEFIT' | 'DEDUCTION'
  upSpace?: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  index,
  item,
  onRefresh,
  setSelectedToApply,
  setSelectedToEdit,
  total,
  type,
  upSpace = total > 8 ? 3 : 0,
}) => {
  const toast = useToast()
  const confirm = useConfirm()

  const actions = [
    {
      action: () => setSelectedToApply?.(item),
      icon: UsersIcon,
      text: 'Apply to',
    },
    {
      action: () => setSelectedToEdit?.(item),
      icon: PenToolIcon,
      text: 'Edit Component',
    },
    {
      action: async () => {
        const confirmed = await confirm({
          cancelBtnColor: 'primary',
          confirmBtnColor: 'error',
          text: 'Are you sure you want to delete this component?',
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
      icon: TrashIcon,
      iconClassName: 'text-error-600',
      text: 'Delete',
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
