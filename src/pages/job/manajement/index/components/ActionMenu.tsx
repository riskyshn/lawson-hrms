import React from 'react'
import { EyeIcon, PenToolIcon, PowerIcon, TrashIcon, UsersIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import * as Table from '@/components/Elements/Tables/MainTable'
import { vacancyService } from '@/services'
import { useConfirm, useToast } from 'jobseeker-ui'

type ActionMenuProps = {
  vacancy: IVacancy
  index: number
  total: number
  upSpace: number
  onRefresh?: () => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ vacancy, index, total, upSpace, onRefresh }) => {
  const navigate = useNavigate()
  const toast = useToast()
  const confirm = useConfirm()

  const viewDetail: Table.ActionMenuItemProps = {
    text: 'View Detail',
    icon: EyeIcon,
    action() {
      navigate(`/job/management/${vacancy.oid}`)
    },
  }

  const viewCandidates: Table.ActionMenuItemProps = {
    text: 'View Candidates',
    icon: UsersIcon,
    action() {
      navigate(`/candidates/management?vacancy=${vacancy.oid}`)
    },
  }

  const editVacancy: Table.ActionMenuItemProps = {
    text: 'Edit Vacancy',
    icon: PenToolIcon,
    action() {
      navigate(`/job/management/${vacancy.oid}/edit`)
    },
  }

  const deactivate: Table.ActionMenuItemProps = {
    text: 'Deactivate',
    icon: PowerIcon,
    iconClassName: 'text-error-600',
    action: async () => {
      try {
        await vacancyService.updateVacancyStatus(vacancy.oid, 'inactive')
        toast('Success fully reactive vacancy.', { color: 'success', position: 'top-right' })
        onRefresh?.()
      } catch (e: any) {
        toast(e.response?.data?.meta?.message || e.message, { color: 'error', position: 'top-right' })
      }
    },
  }

  const reactivate: Table.ActionMenuItemProps = {
    text: 'Reactivate',
    icon: PowerIcon,
    action: async () => {
      try {
        await vacancyService.updateVacancyStatus(vacancy.oid, 'active')
        toast('Success fully reactive vacancy.', { color: 'success', position: 'top-right' })
        onRefresh?.()
      } catch (e: any) {
        toast(e.response?.data?.meta?.message || e.message, { color: 'error', position: 'top-right' })
      }
    },
  }

  const deleteDraft: Table.ActionMenuItemProps = {
    text: 'Delete Draft',
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    action: async () => {
      const confirmed = await confirm({
        text: 'Are you sure you want to delete this draft vacancy?',
        confirmBtnColor: 'error',
        cancelBtnColor: 'primary',
      })
      if (confirmed) {
        try {
          await vacancyService.deleteDraftVacancy(vacancy.oid)
          toast('Draft vacancy deleted successfully.', { color: 'success', position: 'top-right' })
          onRefresh?.()
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error', position: 'top-right' })
        }
      }
    },
  }

  const menuItems: Record<string, Table.ActionMenuItemProps[]> = {
    active: [viewDetail, viewCandidates, editVacancy, deactivate],
    inactive: [reactivate, viewDetail, viewCandidates, editVacancy],
    draft: [viewDetail, deleteDraft],
    fulfilled: [viewDetail, viewCandidates],
    expired: [reactivate, viewDetail, viewCandidates, editVacancy],
  }

  const menu = menuItems[vacancy.status || '']
  if (!menu) return null

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menu.map((item, i) => (
        <Table.ActionMenuItem key={i} {...item} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
