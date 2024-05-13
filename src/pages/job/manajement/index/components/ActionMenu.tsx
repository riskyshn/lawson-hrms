import type { IVacancy } from '@/types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useConfirm, useToast } from 'jobseeker-ui'
import { EyeIcon, GlobeIcon, PenToolIcon, PowerIcon, TrashIcon, UsersIcon } from 'lucide-react'
import * as Table from '@/components/Elements/Tables/MainTable'
import { vacancyService } from '@/services'

type ActionMenuProps = {
  index: number
  onRefresh?: () => void
  total: number
  upSpace: number
  vacancy: IVacancy
  setSelectedExpiredToReactive?: (item: IVacancy) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, onRefresh, total, upSpace, vacancy, setSelectedExpiredToReactive }) => {
  const navigate = useNavigate()
  const toast = useToast()
  const confirm = useConfirm()

  const viewDetail: Table.ActionMenuItemProps = {
    action() {
      navigate(`/job/management/${vacancy.oid}`)
    },
    icon: EyeIcon,
    text: 'View Detail',
  }

  const viewCandidates: Table.ActionMenuItemProps = {
    action() {
      navigate(`/candidates/management?vacancy=${vacancy.oid}`)
    },
    icon: UsersIcon,
    text: 'View Candidates',
  }

  const editVacancy: Table.ActionMenuItemProps = {
    action() {
      navigate(`/job/management/${vacancy.oid}/edit`)
    },
    icon: PenToolIcon,
    text: 'Edit Vacancy',
  }

  const deactivate: Table.ActionMenuItemProps = {
    action: async () => {
      try {
        await vacancyService.updateVacancyStatus(vacancy.oid, 'inactive')
        toast('Success fully reactive vacancy.', { color: 'success' })
        onRefresh?.()
      } catch (e: any) {
        toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
      }
    },
    icon: PowerIcon,
    iconClassName: 'text-error-600',
    text: 'Deactivate',
  }

  const reactivate: Table.ActionMenuItemProps = {
    action: async () => {
      try {
        await vacancyService.updateVacancyStatus(vacancy.oid, 'active')
        toast('Success fully reactive vacancy.', { color: 'success' })
        onRefresh?.()
      } catch (e: any) {
        toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
      }
    },
    icon: PowerIcon,
    text: 'Reactivate',
  }

  const expiredToActive: Table.ActionMenuItemProps = {
    action: () => {
      setSelectedExpiredToReactive?.(vacancy)
    },
    icon: PowerIcon,
    text: 'Reactivate',
  }

  const deleteDraft: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary',
        confirmBtnColor: 'error',
        text: 'Are you sure you want to delete this draft vacancy?',
      })
      if (confirmed) {
        try {
          await vacancyService.deleteDraftVacancy(vacancy.oid)
          toast('Draft vacancy deleted successfully.', { color: 'success' })
          onRefresh?.()
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
    icon: TrashIcon,
    iconClassName: 'text-error-600',
    text: 'Delete Draft',
  }

  const postVacancy: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary',
        confirmBtnColor: 'error',
        text: 'Are you sure you want to post vacancy?',
      })
      if (confirmed) {
        try {
          await vacancyService.updateVacancyStatus(vacancy.oid, 'active')
          toast('Success fully post vacancy.', { color: 'success' })
          onRefresh?.()
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
    icon: GlobeIcon,
    text: 'Post Vacancy',
  }

  const menuItems: Record<string, Table.ActionMenuItemProps[]> = {
    active: [viewDetail, viewCandidates, editVacancy, deactivate],
    draft: [viewDetail, postVacancy, editVacancy, deleteDraft],
    expired: [expiredToActive, viewDetail, viewCandidates, editVacancy],
    fulfilled: [viewDetail, viewCandidates],
    inactive: [reactivate, viewDetail, viewCandidates, editVacancy],
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
