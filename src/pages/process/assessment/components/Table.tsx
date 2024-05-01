import MainTable from '@/components/Elements/Tables/MainTable'
import { Avatar } from 'jobseeker-ui'
import React from 'react'

import ActionMenu from './ActionMenu'

const total = 20

const Table: React.FC = () => {
  const candidates = Array.from(Array(total)).map((_, i) => {
    const applyDate = new Date(2024, 2, i + 1)
    const formattedApplyDate = applyDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

    return {
      email: `candidate${i + 1}@email.com`,
      id: i + 1,
      interviewDate: formattedApplyDate,
      name: `Candidate ${i + 1}`,
      stage: 'Interview HR 1',
      status: ['Passed', 'Process', 'Failed'][Math.floor(Math.random() * 3)],
      vacancy: `Last Position ${i + 1}`,
      vacancyId: `#${i + 1}`,
    }
  })

  const bodyItems = candidates.map((candidate) => ({
    items: [
      {
        children: (
          <div className="flex gap-3 whitespace-nowrap">
            <div>
              <Avatar className="static rounded-lg bg-primary-100 text-primary-700" name={candidate.name} size={38} />
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
      { children: candidate.stage, className: 'text-center' },
      {
        children: (() => {
          if (candidate.status === 'Passed') {
            return <span className="rounded-lg bg-green-100 px-2 py-1 text-sm font-semibold text-green-600">{candidate.status}</span>
          } else if (candidate.status === 'Process') {
            return <span className="rounded-lg bg-blue-100 px-2 py-1 text-sm font-semibold text-blue-600">{candidate.status}</span>
          } else {
            return <span className="rounded-lg bg-red-100 px-2 py-1 text-sm font-semibold text-red-600">{candidate.status}</span>
          }
        })(),
        className: 'text-center',
      },
      { children: candidate.interviewDate, className: 'text-center' },
      {
        children: (() => {
          if (candidate.status === 'Passed') {
            return (
              <ActionMenu
                items={candidate}
                options={['Process', 'Offering Letter', 'Move to Another Vacancy', 'View History', 'Blacklist', 'Reject']}
              />
            )
          } else if (candidate.status === 'Process') {
            return (
              <ActionMenu items={candidate} options={['Update Result', 'Move to Another Vacancy', 'View History', 'Blacklist', 'Reject']} />
            )
          } else if (candidate.status === 'Failed') {
            return (
              <ActionMenu items={candidate} options={['Process', 'Offering Letter', 'Move to Another Vacancy', 'Blacklist', 'Reject']} />
            )
          }
        })(),
      },
    ],
  }))

  return (
    <>
      <MainTable
        bodyItems={bodyItems}
        headerItems={[
          { children: 'Candidate', className: 'text-left' },
          { children: 'Vacancy', className: 'text-left' },
          { children: 'Stage' },
          { children: 'Status' },
          { children: 'Interview Date' },
          { children: 'Action', className: 'w-24' },
        ]}
      />
    </>
  )
}

export default Table
