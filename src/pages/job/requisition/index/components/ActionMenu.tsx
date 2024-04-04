import * as Table from '@/components/Elements/MainTable'
import { vacancyService } from '@/services'
import { useAuthStore } from '@/store'
import { useConfirm, useToast } from 'jobseeker-ui'
import { EyeIcon, PenToolIcon, PowerIcon, TrashIcon, UsersIcon } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

type ActionMenuProps = {
  vacancy: IVacancy
  index: number
  total: number
  upSpace: number
  onRefresh?: () => void
  setSelectedToShowHistoryModal?: (vacancy: IVacancy) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ vacancy, index, total, upSpace, onRefresh, setSelectedToShowHistoryModal }) => {
  const navigate = useNavigate()
  const toast = useToast()
  const confirm = useConfirm()
  const { user } = useAuthStore()

  const goToJobManagement: Table.ActionMenuItemProps = {
    text: 'Go to Job Management',
    icon: EyeIcon,
    action() {
      navigate(`/job/management?search=${vacancy.vacancyName}`)
    },
  }

  const reviewRequisition: Table.ActionMenuItemProps = {
    text: 'Review Requisition',
    icon: EyeIcon,
    action() {
      navigate(`/job/requisition/${vacancy.oid}`)
    },
  }

  const viewCandidates: Table.ActionMenuItemProps = {
    text: 'View Candidates',
    icon: UsersIcon,
    action() {
      navigate(`/candidates/management?vacancy=${vacancy.oid}`)
    },
  }

  const sendReminder: Table.ActionMenuItemProps = {
    text: 'Send Reminder',
    icon: UsersIcon,
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
  }

  const viewHistory: Table.ActionMenuItemProps = {
    text: 'View History',
    icon: UsersIcon,
    action: () => {
      setSelectedToShowHistoryModal?.(vacancy)
    },
  }

  const editRequisition: Table.ActionMenuItemProps = {
    text: 'Edit Requisition',
    icon: PenToolIcon,
    action() {
      navigate(`/job/requisition/${vacancy.oid}/edit`)
    },
  }

  const cancelRequisition: Table.ActionMenuItemProps = {
    text: 'Cancel Requisition',
    icon: PowerIcon,
    iconClassName: 'text-error-600',
    action: async () => {
      const confirmed = await confirm({
        text: 'Are you sure you want to cancel this requisition?',
        confirmBtnColor: 'error',
        cancelBtnColor: 'primary',
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
  }

  const postVacancy: Table.ActionMenuItemProps = {
    text: 'Post Vacancy',
    icon: PowerIcon,
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
          toast('Draft vacancy deleted successfully.', { color: 'success' })
          onRefresh?.()
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
  }

  const menuItems: Record<string, Table.ActionMenuItemProps[]> = {
    published: [goToJobManagement, viewCandidates],
    draft: [reviewRequisition, editRequisition, deleteDraft],
    rejected: [reviewRequisition, editRequisition, viewHistory],
    approved: [postVacancy, reviewRequisition, viewHistory],
    progress: [reviewRequisition, sendReminder, editRequisition, viewHistory, cancelRequisition],
    canceled: [reviewRequisition, viewHistory],
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
