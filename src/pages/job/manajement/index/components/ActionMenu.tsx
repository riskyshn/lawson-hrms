import React from 'react'
import { EyeIcon, PenToolIcon, PowerIcon, TrashIcon, UsersIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { IVacancy } from '@/types/vacancy'
import * as Table from '@/components/Elements/MainTable'
import { vacancyService } from '@/services'
import { useConfirm, useToast } from 'jobseeker-ui'

type ActionMenuProps = {
  vacancy: IVacancy
  index: number
  total: number
  upSpace: number
  onVacancyUpdated?: (vacancy: IVacancy) => void
  onVacancyDeleted?: (id: string) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ vacancy, index, total, upSpace, onVacancyDeleted, onVacancyUpdated }) => {
  const navigate = useNavigate()
  const toast = useToast()
  const confirm = useConfirm()

  const viewDetail: Table.ActionMenuItemProps = {
    text: 'View Detail',
    icon: EyeIcon,
    action() {
      navigate(`/job/management/${vacancy.id}`)
    },
  }

  const viewCandidates: Table.ActionMenuItemProps = {
    text: 'View Candidates',
    icon: UsersIcon,
  }

  const editVacancy: Table.ActionMenuItemProps = {
    text: 'Edit Vacancy',
    icon: PenToolIcon,
    action() {
      navigate(`/job/management/${vacancy.id}/edit`)
    },
  }

  const deactivate: Table.ActionMenuItemProps = {
    text: 'Deactivate',
    icon: PowerIcon,
    iconClassName: 'text-error-600',
    action: async () => {
      try {
        await vacancyService.updateVacancyStatus(vacancy.id, 'inactive')
        toast('Success fully reactive vacancy.', { color: 'success', position: 'top-right' })
        onVacancyUpdated?.({ ...vacancy, flag: 4 })
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
        await vacancyService.updateVacancyStatus(vacancy.id, 'active')
        toast('Success fully reactive vacancy.', { color: 'success', position: 'top-right' })
        onVacancyUpdated?.({ ...vacancy, flag: 1 })
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
          await vacancyService.deleteDraftVacancy(vacancy.id)
          toast('Draft vacancy deleted successfully.', { color: 'success', position: 'top-right' })
          onVacancyDeleted?.(vacancy.id)
        } catch (e: any) {
          toast(e.response?.data?.meta?.message || e.message, { color: 'error', position: 'top-right' })
        }
      }
    },
  }

  const menuItems = [
    { code: 1, items: [viewDetail, viewCandidates, editVacancy, deactivate] },
    { code: 4, items: [reactivate, viewDetail, viewCandidates, editVacancy] },
    { code: 9, items: [viewDetail, deleteDraft] },
    { code: 13, items: [viewDetail, viewCandidates] },
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
