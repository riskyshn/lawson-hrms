import React from 'react'
import MainTable from '@/components/Elements/MainTable'
import ActionMenu from './ActionMenu'
import { IDepartment } from '@/types/oganizartion'

const Table: React.FC<{ items: IDepartment[] }> = ({ items }) => {
  const headerItems = [
    { children: 'Department', className: 'text-left' },
    { children: 'Employees' },
    { children: 'Number of Vacancies' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((department) => ({
    items: [
      {
        children: (
          <>
            <span className="block font-semibold">{department.name}</span>
          </>
        ),
      },
      { children: '-', className: 'text-center' },
      { children: '-', className: 'text-center' },
      {
        children: <ActionMenu items={department} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} />
}

export default Table
