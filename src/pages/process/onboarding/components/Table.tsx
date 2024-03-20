import React from 'react'
import { Avatar } from 'jobseeker-ui'
import MainTable from '@/components/Elements/MainTable'
import ActionMenu from './ActionMenu'

const total = 20

const Table: React.FC = () => {
  const candidates = Array.from(Array(total)).map((_, i) => {
    const applyDate = new Date(2024, 2, i + 1)
    const formattedApplyDate = applyDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

    return {
      name: `Candidate ${i + 1}`,
      email: `candidate${i + 1}@email.com`,
      vacancy: `Last Position ${i + 1}`,
      vacancyId: `#${i + 1}`,
      stage: 'Interview HR 1',
      status: 'Waiting To Join',
      interviewDate: formattedApplyDate,
    }
  })

  const bodyItems = candidates.map((candidate) => ({
    items: [
      {
        children: (
          <div className="flex gap-3">
            <div>
              <Avatar name={candidate.name} size={38} className="static rounded-lg bg-primary-100 text-primary-700" />
            </div>
            <div>
              <span className="block font-semibold">{candidate.name}</span>
              <p>{candidate.email}</p>
            </div>
          </div>
        ),
      },
      {
        children: (
          <>
            <span className="block font-semibold">{candidate.vacancy}</span>
            <span className="text-xs text-gray-500">{candidate.vacancyId}</span>
          </>
        ),
      },
      {
        children: (() => {
          return <span className="rounded-lg bg-violet-100 px-2 py-1 text-sm font-semibold text-violet-600">{candidate.status}</span>
        })(),
        className: 'text-center',
      },
      { children: candidate.interviewDate, className: 'text-center' },
      {
        children: (() => {
          return <ActionMenu options={['Add as Employee', 'Edit Join Date', 'View History', 'Blacklist', 'Reject']} />
        })(),
      },
    ],
  }))

  return (
    <>
      <MainTable
        headerItems={[
          { children: 'Candidate', className: 'text-left' },
          { children: 'Vacancy', className: 'text-left' },
          { children: 'Status' },
          { children: 'Join Date' },
          { children: 'Action', className: 'w-24' },
        ]}
        bodyItems={bodyItems}
      />
    </>
  )
}

export default Table
