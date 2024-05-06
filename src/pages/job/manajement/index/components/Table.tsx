import MainTable from '@/components/Elements/Tables/MainTable'
import NumberOfEmployeeLink from '@/components/Elements/UI/NumberOfEmployeeLink'
import moment from 'moment'
import React, { useState } from 'react'
import { twJoin } from 'tailwind-merge'

import ActionMenu from './ActionMenu'
import ReactiveExpiredModal from './ReactiveExpiredModal'

const getStatus = (vacancy: IVacancy): { color: string; text: string } => {
  const statusMap: Record<string, { color: string; text: string }> = {
    active: { color: 'bg-green-100 text-green-600', text: 'Active' },
    draft: { color: 'bg-pink-100 text-pink-600', text: 'Draft' },
    expired: { color: 'bg-red-100 text-red-600', text: 'Expired' },
    fulfilled: { color: 'bg-yellow-100 text-yellow-700', text: 'Fulfilled' },
    inactive: { color: 'bg-gray-100 text-gray-600', text: 'Inactive' },
  }

  return statusMap[vacancy.status || ''] || { color: 'bg-gray-400 text-white', text: vacancy.status || 'Unknown' }
}

const Table: React.FC<{
  items: IVacancy[]
  loading?: boolean
  onRefresh?: () => void
}> = ({ items, loading, onRefresh }) => {
  const [selectedExpiredToReactive, setSelectedExpiredToReactive] = useState<IVacancy | null>(null)

  const headerItems = [
    { children: 'Vacancy', className: 'text-left' },
    { children: 'Department' },
    { children: 'Posted Date' },
    { children: 'Number of Applicant' },
    { children: 'Status' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((vacancy, index) => ({
    items: [
      {
        children: <span className="block font-semibold">{vacancy.vacancyName}</span>,
      },
      { children: vacancy.department?.name || '-', className: 'text-center' },
      { children: vacancy.createdAt ? moment.utc(vacancy.createdAt).local().format('D/M/Y') : '-', className: 'text-center' },
      {
        children: <NumberOfEmployeeLink count={vacancy.applicantCount} to={`/candidates/management?vacancy=${vacancy.oid}`} />,
        className: 'text-center',
      },
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
            total={items.length}
            upSpace={items.length > 8 ? 3 : 0}
            vacancy={vacancy}
            setSelectedExpiredToReactive={setSelectedExpiredToReactive}
          />
        ),
      },
    ],
  }))

  return (
    <>
      <ReactiveExpiredModal item={selectedExpiredToReactive} onRefresh={onRefresh} onClose={() => setSelectedExpiredToReactive(null)} />
      <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
    </>
  )
}

export default Table
