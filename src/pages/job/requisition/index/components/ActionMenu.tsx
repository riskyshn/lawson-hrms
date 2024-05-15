import type { IVacancy } from '@/types'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useConfirm, useToast } from 'jobseeker-ui'
import { EyeIcon, GlobeIcon, PenToolIcon, PowerIcon, TrashIcon, UsersIcon } from 'lucide-react'
import * as Table from '@/components/Tables'
import { vacancyService } from '@/services'
import { useAuthStore } from '@/store'

type ActionMenuProps = {
  index: number
  onRefresh?: () => void
  setSelectedToShowHistoryModal?: (vacancy: IVacancy) => void
  total: number
  upSpace: number
  vacancy: IVacancy
}

const ActionMenu: React.FC<ActionMenuProps> = ({ index, onRefresh, setSelectedToShowHistoryModal, total, upSpace, vacancy }) => {
  const navigate = useNavigate()
  const toast = useToast()
  const confirm = useConfirm()
  const { user } = useAuthStore()

  const goToJobManagement: Table.ActionMenuItemProps = {
    action() {
      navigate(`/job/management?search=${vacancy.vacancyName}`)
    },
    icon: EyeIcon,
    text: 'Go to Job Management',
  }

  const reviewRequisition: Table.ActionMenuItemProps = {
    action() {
      navigate(`/job/requisition/${vacancy.oid}`)
    },
    icon: EyeIcon,
    text: 'Review Requisition',
  }

  const viewCandidates: Table.ActionMenuItemProps = {
    action() {
      navigate(`/candidates/management?vacancy=${vacancy.oid}`)
    },
    icon: UsersIcon,
    text: 'View Candidates',
  }

  const sendReminder: Table.ActionMenuItemProps = {
    action: async () => {
      const approval = vacancy.approvals?.users?.find((el) => el.flag === 0)
      if (!approval) return

      if (user?.employee?.oid === approval.oid) return toast('You cannot send a reminder to yourself!', { color: 'error' })

      const confirmed = await confirm(`Are you sure you want to send a reminder to ${approval.name}?`)
      if (confirmed) {
        try {
          await vacancyService.sendReminder(vacancy.oid)
          toast('Reminder sent successfully.', { color: 'success' })
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
    icon: UsersIcon,
    text: 'Send Reminder',
  }

  const viewHistory: Table.ActionMenuItemProps = {
    action: () => {
      setSelectedToShowHistoryModal?.(vacancy)
    },
    icon: UsersIcon,
    text: 'View History',
  }

  const editRequisition: Table.ActionMenuItemProps = {
    action() {
      navigate(`/job/requisition/${vacancy.oid}/edit`)
    },
    icon: PenToolIcon,
    text: 'Edit Requisition',
  }

  const cancelRequisition: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary',
        confirmBtnColor: 'error',
        text: 'Are you sure you want to cancel this requisition?',
      })
      if (confirmed) {
        try {
          await vacancyService.cancelRequisition(vacancy.oid)
          toast('Requisition canceled successfully.', { color: 'success' })
          onRefresh?.()
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
    icon: PowerIcon,
    iconClassName: 'text-error-600',
    text: 'Cancel Requisition',
  }

  const postVacancy: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm('Are you sure you want to post this vacancy?')
      if (confirmed) {
        try {
          await vacancyService.publishRequisition(vacancy.oid)
          toast('Vacancy posted successfully.', { color: 'success' })
          onRefresh?.()
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
    icon: PowerIcon,
    text: 'Post Vacancy',
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

  const activateVacancy: Table.ActionMenuItemProps = {
    action: async () => {
      const confirmed = await confirm({
        cancelBtnColor: 'primary',
        confirmBtnColor: 'error',
        text: 'Are you sure you want to request approval?',
      })
      if (confirmed) {
        try {
          await vacancyService.progressRequisition(vacancy.oid)
          toast('Success fully update job requisition.', { color: 'success' })
          onRefresh?.()
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
    icon: GlobeIcon,
    text: 'Request Approval ',
  }

  const menuItems: Record<string, Table.ActionMenuItemProps[]> = {
    approved: [postVacancy, reviewRequisition, viewHistory],
    canceled: [reviewRequisition, viewHistory],
    draft: [activateVacancy, editRequisition, deleteDraft],
    progress: [reviewRequisition, sendReminder, editRequisition, viewHistory, cancelRequisition],
    published: [goToJobManagement, viewCandidates],
    rejected: [reviewRequisition, viewHistory],
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
