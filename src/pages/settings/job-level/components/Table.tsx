import React from 'react'
import MainTable from '@/components/Elements/MainTable'
import ActionMenu from './ActionMenu'
import { IJobLevel } from '@/types/oganizartion'

const Table: React.FC<{ items: IJobLevel[]; onSubmitSuccess: () => void }> = ({ items, onSubmitSuccess }) => {
  const headerItems = [
    { children: 'Job Level', className: 'text-left' },
    { children: 'Employees' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((jobLevel) => ({
    items: [
      {
        children: (
          <>
            <span className="block font-semibold">{jobLevel.name}</span>
          </>
        ),
      },
      { children: '-', className: 'text-center' },
      {
        children: <ActionMenu items={jobLevel} onSubmitSuccess={onSubmitSuccess} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} />
}

export default Table
