import React from 'react'
import MainTable from '@/components/Elements/MainTable'
import { Avatar } from 'jobseeker-ui'
import moment from 'moment'
import { twJoin } from 'tailwind-merge'
import ActionMenu from './ActionMenu'
import { Link } from 'react-router-dom'

const getStatus = (vacancy: IVacancy): { text: string; color: string } => {
  const statusMap: Record<string, { text: string; color: string }> = {
    active: { text: 'Active', color: 'bg-green-100 text-green-600' },
    inactive: { text: 'Inactive', color: 'bg-gray-100 text-gray-600' },
    draft: { text: 'Draft', color: 'bg-pink-100 text-pink-600' },
    expired: { text: 'Expired', color: 'bg-red-100 text-red-600' },
    fulfilled: { text: 'Fulfilled', color: 'bg-yellow-400 text-white' },
  }

  return statusMap[vacancy.status || ''] || { text: vacancy.status || 'Unknown', color: 'bg-gray-400 text-white' }
}

const Table: React.FC<{
  items: IVacancy[]
  loading?: boolean
  onVacancyUpdated?: (vacancy: IVacancy) => void
  onVacancyDeleted?: (id: string) => void
}> = ({ items, loading, onVacancyDeleted, onVacancyUpdated }) => {
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
        children: (
          <>
            <span className="block font-semibold">{vacancy.vacancyName}</span>
            {/* <span className="text-xs text-gray-500">{vacancy.rrNumber || '-'}</span> */}
          </>
        ),
      },
      { children: vacancy.department?.name || '-', className: 'text-center' },
      { children: vacancy.createdAt ? moment(vacancy.createdAt).format('D/M/Y') : '-', className: 'text-center' },
      {
        children: (
          <span className="flex items-center justify-center gap-2">
            <span className="flex">
              <Avatar name="John Doe" size={38} className="rounded-full bg-success-100 text-success-700" />
              <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-primary-100 text-primary-700" />
              <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-error-100 text-error-700" />
            </span>
            <Link to={`/candidates/management?vacancy=${vacancy.oid}`} className="text-primary-600">
              {vacancy.applicantCount}+
            </Link>
          </span>
        ),
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
            vacancy={vacancy}
            index={index}
            total={items.length}
            upSpace={items.length > 8 ? 3 : 0}
            onVacancyUpdated={onVacancyUpdated}
            onVacancyDeleted={onVacancyDeleted}
          />
        ),
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

export default Table
