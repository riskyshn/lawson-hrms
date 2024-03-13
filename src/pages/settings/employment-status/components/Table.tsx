import React from 'react'
import MainTable from '@/components/Elements/MainTable'
import ActionMenu from './ActionMenu'
import { IJobType } from '@/types/oganizartion'

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
      { children: '-', className: 'text-center' },
      {
        children: <ActionMenu items={employmentStatus} onSubmitSuccess={onSubmitSuccess} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} />
}

export default Table
