import React from 'react'
import { EyeIcon, PenToolIcon, PowerIcon, TrashIcon, UsersIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import * as Table from '@/components/Elements/MainTable'
import { vacancyService } from '@/services'
import { useConfirm, useToast } from 'jobseeker-ui'
import moment from 'moment'
import { useAuthStore } from '@/store'

type ActionMenuProps = {
  vacancy: IVacancy
  index: number
  total: number
  upSpace: number
  setHistoryMadalData?: (vacancy: IVacancy) => void
  onVacancyUpdated?: (vacancy: IVacancy) => void
  onVacancyDeleted?: (id: string) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({
  vacancy,
  index,
  total,
  upSpace,
  setHistoryMadalData,
  onVacancyDeleted,
  onVacancyUpdated,
}) => {
  const navigate = useNavigate()
  const toast = useToast()
  const confirm = useConfirm()
  const { user } = useAuthStore()

  const goToJobManagement: Table.ActionMenuItemProps = {
    text: 'Go to Job Management',
    icon: EyeIcon,
    action() {
      navigate(`/job/management/${vacancy.id}`)
    },
  }

  const reviewRequisition: Table.ActionMenuItemProps = {
    text: 'Review Requisition',
    icon: EyeIcon,
    action() {
      navigate(`/job/requisition/${vacancy.id}`)
    },
  }

  const viewCandidates: Table.ActionMenuItemProps = {
    text: 'View Candidates',
    icon: UsersIcon,
  }

  const sendReminder: Table.ActionMenuItemProps = {
    text: 'Send Reminder',
    icon: UsersIcon,
    action: async () => {
      const approval = vacancy.approvals?.users?.find((el) => el.flag === 0)
      if (!approval) return

      if (user?.employee?.oid === approval.id) return toast('You cannot send a reminder to yourself!', { color: 'error' })

      const confirmed = await confirm(`Are you sure you want to send a reminder to ${approval.name}?`)
      if (confirmed) {
        try {
          await vacancyService.sendReminder(vacancy.id)
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
      setHistoryMadalData?.(vacancy)
    },
  }

  const editRequisition: Table.ActionMenuItemProps = {
    text: 'Edit Requisition',
    icon: PenToolIcon,
    action() {
      navigate(`/job/requisition/${vacancy.id}/edit`)
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
          await vacancyService.cancelRequisition(vacancy.id)
          toast('Requisition canceled successfully.', { color: 'success' })
          onVacancyUpdated?.({ ...vacancy, canceledDate: moment.now().toString() })
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
          await vacancyService.publishRequisition(vacancy.id)
          toast('Vacancy posted successfully.', { color: 'success' })
          onVacancyUpdated?.({ ...vacancy, flag: 1 })
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
          await vacancyService.deleteDraftVacancy(vacancy.id)
          toast('Draft vacancy deleted successfully.', { color: 'success' })
          onVacancyDeleted?.(vacancy.id)
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
        }
      }
    },
  }

  const menuItems = [
    { code: 1, items: [goToJobManagement, viewCandidates] },
    {
      code: 6,
      items:
        vacancy.approvals?.flag == 1
          ? [postVacancy, reviewRequisition, viewHistory]
          : [reviewRequisition, sendReminder, editRequisition, viewHistory, cancelRequisition],
    },
    { code: 9, items: [reviewRequisition, editRequisition, deleteDraft] },
    { code: 13, items: [viewCandidates, editRequisition, viewHistory] },
  ]

  const menu = menuItems.find((el) => el.code == vacancy.flag)
  if (!menu) return null

  return (
    <>
      <Table.ActionMenu up={index >= total - upSpace}>
        {menu.items.map((item, i) => (
          <Table.ActionMenuItem key={i} {...item} />
        ))}
      </Table.ActionMenu>
    </>
  )
}

export default ActionMenu
