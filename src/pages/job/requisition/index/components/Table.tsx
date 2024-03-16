import React from 'react'
import moment from 'moment'
import MainTable from '@/components/Elements/MainTable'
import ActionMenu from './ActionMenu'
import { IVacancy } from '@/types/vacancy'
import { twJoin } from 'tailwind-merge'

interface TableProps {
  items: IVacancy[]
  loading?: boolean
  setHistoryMadalData?: (vacancy: IVacancy) => void
  onVacancyUpdated?: (vacancy: IVacancy) => void
  onVacancyDeleted?: (id: string) => void
}

const getFlag = (vacancy: IVacancy) => {
  if (vacancy.flag === 1) return 1
  if (vacancy.canceledDate) return 'canceled'
  if (vacancy.canceledDate) return 'canceled'
  if (vacancy.approvals?.flag === 0) return 'approval'
  if (vacancy.approvals?.flag === 1) return 'approved'
  return vacancy.flag
}

const getApprovalCounter = (vacancy: IVacancy) => {
  if (vacancy.flag !== 6) return ''
  const total = vacancy.approvals?.users?.length || 0
  const approved = vacancy.approvals?.users?.filter((el) => el.flag === 1).length || 0
  return ` ${approved}/${total}`
}

const getStatus = (vacancy: IVacancy): { text: string; color: string } => {
  const flag = getFlag(vacancy)
  const statusMap: Record<number | string, { text: string; color: string }> = {
    1: { text: 'Posted', color: 'bg-green-100 text-green-600' },
    9: { text: 'Draft', color: 'bg-pink-100 text-pink-600' },
    13: { text: 'Fulfilled', color: 'bg-yellow-100 text-yellow-600' },
    approved: { text: 'Approved', color: 'bg-blue-100 text-blue-600' },
    approval: { text: 'Approval ' + getApprovalCounter(vacancy), color: 'bg-purple-100 text-purple-600' },
    canceled: { text: 'Canceled', color: 'bg-red-100 text-red-600' },
  }

  return (flag && statusMap[flag]) || { text: 'Unknown', color: 'bg-gray-400 text-white' }
}

const Table: React.FC<TableProps> = ({ items, loading, setHistoryMadalData, onVacancyDeleted, onVacancyUpdated }) => {
  const headerItems = [
    { children: 'Vacancy', className: 'text-left' },
    { children: 'Department' },
    { children: 'Posted Date' },
    { children: 'Status' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((vacancy, index) => ({
    items: [
      {
        children: (
          <>
            <span className="block font-semibold">{vacancy.vacancyName}</span>
            <span className="text-xs text-gray-500">{vacancy.rrNumber ? `#${vacancy.rrNumber}` : '-'}</span>
          </>
        ),
      },
      { children: vacancy.department?.name || '-', className: 'text-center' },
      { children: vacancy.publishDate ? moment(vacancy.publishDate).format('D/M/Y') : '-', className: 'text-center' },
      {
        children: (
          <span className={twJoin('rounded-lg px-2 py-1 text-sm font-semibold', getStatus(vacancy).color)}>{getStatus(vacancy).text}</span>
        ),
        className: 'text-center',
      },
      {
        children: (
          <ActionMenu
            vacancy={vacancy}
            index={index}
            total={items.length}
            setHistoryMadalData={setHistoryMadalData}
            upSpace={items.length > 8 ? 3 : 0}
            onVacancyDeleted={onVacancyDeleted}
            onVacancyUpdated={onVacancyUpdated}
          />
        ),
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

export default Table
