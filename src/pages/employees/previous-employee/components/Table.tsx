import React from 'react'
import MainTable from '@/components/Elements/MainTable'
import ActionMenu from './ActionMenu'
import { Avatar } from 'jobseeker-ui'

type Employee = {
  name: string
  email?: string
  lastDay?: string
  status?: string
  reason?: string
}

type TableProps = {
  items: Employee[]
}

const Table: React.FC<TableProps> = ({ items }) => {
  const headerItems = [
    { children: 'Employee', className: 'text-left' },
    { children: 'Last Day', className: 'text-left' },
    { children: 'Status', className: 'text-left' },
    { children: 'Reason', className: 'text-left' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item) => ({
    items: [
      {
        children: (
          <div className="flex gap-3">
            <div>
              <Avatar name={item.name} size={38} className="static rounded-lg bg-primary-100 text-primary-700" />
            </div>
            <div>
              <span className="block font-semibold">{item.name}</span>
              <span className="text-xs text-gray-500">{item.email}</span>
            </div>
          </div>
        ),
      },
      {
        children: item.lastDay,
      },
      {
        children: item.status,
      },
      {
        children: item.reason,
      },
      {
        children: <ActionMenu options={['Blacklist']} items={item} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} />
}

export default Table
