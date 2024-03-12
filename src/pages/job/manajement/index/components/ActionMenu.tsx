import React from 'react'
import { EyeIcon, PenToolIcon, PowerIcon, TrashIcon, UsersIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { IVacancy } from '@/types/vacancy'
import * as Table from '@/components/Elements/MainTable'

type ActionMenuProps = {
  vacancy: IVacancy
  index: number
  total: number
  upSpace?: number
}

const ActionMenu: React.FC<ActionMenuProps> = ({ vacancy, index, total, upSpace }) => {
  const navigate = useNavigate()

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
  }

  const reactivate: Table.ActionMenuItemProps = {
    text: 'Reactivate',
    icon: PowerIcon,
  }

  const deleteDraft: Table.ActionMenuItemProps = {
    text: 'Delete Draft',
    icon: TrashIcon,
    iconClassName: 'text-error-600',
  }

  const menuItems = [
    { code: 1, items: [viewDetail, viewCandidates, editVacancy, deactivate] },
    { code: 4, items: [reactivate, viewDetail, viewCandidates, editVacancy] },
    { code: 9, items: [viewDetail, deleteDraft] },
  ]

  const menu = menuItems.find((el) => el.code == vacancy.flag)
  if (!menu) return null

  return (
    <>
      <Table.ActionMenu up={index >= total - (upSpace || 3)}>
        {menu.items.map((item, i) => (
          <Table.ActionMenuItem key={i} {...item} />
        ))}
      </Table.ActionMenu>
    </>
  )
}

export default ActionMenu
