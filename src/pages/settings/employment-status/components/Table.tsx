import React from 'react'
import MainTable from '@/components/Elements/MainTable'
import ActionMenu from './ActionMenu'
import { IJobType } from '@/types/oganizartion'
import { Avatar } from 'jobseeker-ui'

const Table: React.FC<{ items: IJobType[]; onSubmitSuccess: () => void }> = ({ items, onSubmitSuccess }) => {
  const headerItems = [
    { children: 'Employment Status', className: 'text-left' },
    { children: 'Employees' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((employmentStatus) => ({
    items: [
      {
        children: (
          <>
            <span className="block font-semibold">{employmentStatus.name}</span>
          </>
        ),
      },
      {
        children: (
          <span className="flex items-center justify-center gap-2">
            <span className="flex">
              <Avatar name="John Doe" size={38} className="rounded-full bg-success-100 text-success-700" />
              <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-primary-100 text-primary-700" />
              <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-error-100 text-error-700" />
            </span>
            <a href="#" className="text-primary-600">
              {employmentStatus?.totalEmployee ?? 0}+
            </a>
          </span>
        ),
        className: 'text-center',
      },
      {
        children: <ActionMenu items={employmentStatus} onSubmitSuccess={onSubmitSuccess} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} />
}

export default Table
