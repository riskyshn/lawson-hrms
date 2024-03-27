import React from 'react'
import * as Table from '@/components/Elements/MainTable'
import { HistoryIcon, LucideIcon, RepeatIcon, SendToBackIcon, UserPlusIcon, UserXIcon, XCircleIcon } from 'lucide-react'
import { ModalType } from '../types'

type ActionMenuProps = {
  item: IDataTableApplicant
  index: number
  total: number
  upSpace: number
  onVacancyUpdated?: (item: IVacancy) => void
  onVacancyDeleted?: (id: string) => void
  setSelected: (selected: { item: IDataTableApplicant; type: ModalType }) => void
}

const ActionMenu: React.FC<ActionMenuProps> = ({ item, index, total, upSpace, setSelected }) => {
  const createMenuItem = (text: string, icon: LucideIcon, type: ModalType, iconClassName?: string): Table.ActionMenuItemProps => ({
    text,
    icon,
    action: () => setSelected({ item, type }),
    iconClassName,
  })

  const process = createMenuItem('Process', RepeatIcon, 'PROCESS')
  const updateResult = createMenuItem('Update Result', UserPlusIcon, 'UPDATE RESULT')
  const offeringLetter = createMenuItem('Offering Letter', RepeatIcon, 'OFFERING LETTER')
  const moveToAnotherVacancy = createMenuItem('Move to Another Vacancy', SendToBackIcon, 'MOVE TO ANOTHER VACANCY')
  const viewHistory = createMenuItem('View History', HistoryIcon, 'VIEW HISTORY')
  const blacklist = createMenuItem('Blacklist', UserXIcon, 'BLACKLIST')
  const reject = createMenuItem('Reject', XCircleIcon, 'REJECT', 'text-error-600')

  const menuItems: Record<string, Table.ActionMenuItemProps[]> = {
    '0': [updateResult, moveToAnotherVacancy, viewHistory, blacklist, reject],
    '1': [process, offeringLetter, moveToAnotherVacancy, viewHistory, blacklist, reject],
    '2': [process, offeringLetter, moveToAnotherVacancy, blacklist, reject],
  }

  const menu = menuItems[item.status?.oid || '0']

  if (!menu) return null

  return (
    <Table.ActionMenu up={index >= total - upSpace}>
      {menu.map((menuItem, i) => (
        <Table.ActionMenuItem key={i} {...menuItem} />
      ))}
    </Table.ActionMenu>
  )
}

export default ActionMenu
