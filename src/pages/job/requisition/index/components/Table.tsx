import type { IVacancy } from '@/types'
import React from 'react'
import moment from 'moment'
import { twJoin } from 'tailwind-merge'
import { MainTable } from '@/components'
import ActionMenu from './ActionMenu'

interface TableProps {
  items: IVacancy[]
  loading?: boolean
  onRefresh?: () => void
  setSelectedToShowHistoryModal?: (vacancy: IVacancy) => void
}

const getApprovalCounter = (vacancy: IVacancy) => {
  if (vacancy.flag !== 6) return ''
  const total = vacancy.approvals?.users?.length || 0
  const approved = vacancy.approvals?.users?.filter((el) => el.flag === 1).length || 0
  return ` ${approved}/${total}`
}

const getStatus = (vacancy: IVacancy): { color: string; text: string } => {
  const statusMap: Record<string, { color: string; text: string }> = {
    approved: { color: 'bg-blue-100 text-blue-600', text: 'Approved' },
    canceled: { color: 'bg-red-100 text-red-600', text: 'Canceled' },
    draft: { color: 'bg-gray-100 text-gray-600', text: 'Draft' },
    progress: { color: 'bg-purple-100 text-purple-600', text: 'Approval ' + getApprovalCounter(vacancy) },
    published: { color: 'bg-green-100 text-green-600', text: 'Posted' },
    rejected: { color: 'bg-red-100 text-red-600', text: 'Rejected' },
  }

  return statusMap[vacancy.status || ''] || { color: 'bg-gray-400 text-white', text: vacancy.status || 'Unknown' }
}

const Table: React.FC<TableProps> = ({ items, loading, onRefresh, setSelectedToShowHistoryModal }) => {
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
            <span className="text-xs text-gray-500">{vacancy.rrNumber || '-'}</span>
          </>
        ),
      },
      { children: vacancy.department?.name || '-', className: 'text-center' },
      { children: vacancy.publishDate ? moment.utc(vacancy.publishDate).local().format('D/M/Y') : '-', className: 'text-center' },
      {
        children: (
          <span className={twJoin('rounded-lg px-2 py-1 text-sm font-semibold capitalize', getStatus(vacancy).color)}>
            {getStatus(vacancy).text}
          </span>
        ),
        className: 'text-center',
      },
      {
        children: (
          <ActionMenu
            index={index}
            onRefresh={onRefresh}
            setSelectedToShowHistoryModal={setSelectedToShowHistoryModal}
            total={items.length}
            vacancy={vacancy}
          />
        ),
      },
    ],
  }))

  return <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
}

export default Table
