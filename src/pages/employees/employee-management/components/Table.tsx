import React from 'react'
import MainTable from '@/components/Elements/MainTable'
import ActionMenu from './ActionMenu'

type Employee = {
  id: string
  name?: string
  branch?: string
  department?: string
  position?: string
  jobLevel?: string
  employmentStatus?: string
}

type TableProps = {
  items: Employee[]
}

const Table: React.FC<TableProps> = ({ items }) => {
  const headerItems = [
    { children: 'Employee', className: 'text-left' },
    { children: 'Branch', className: 'text-left' },
    { children: 'Department', className: 'text-left' },
    { children: 'Position', className: 'text-left' },
    { children: 'Job Level', className: 'text-left' },
    { children: 'Employee Status', className: 'text-left' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item) => ({
    items: [
      {
        children: (
          <>
            <span className="block font-semibold">{item.name}</span>
            <span className="text-xs text-gray-500">{item.id}</span>
          </>
        ),
      },
      {
        children: item.branch,
      },
      {
        children: item.department,
      },
      {
        children: item.position,
      },
      {
        children: item.jobLevel,
      },
      {
        children: item.employmentStatus,
      },
      {
        children: <ActionMenu items={item} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} />
}

export default Table
