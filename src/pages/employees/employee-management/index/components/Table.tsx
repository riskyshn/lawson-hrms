import type { IDataTableEmployee } from '@/types'
import React from 'react'
import { Avatar } from 'jobseeker-ui'
import { MainTable } from '@/components'
import ActionMenu from './ActionMenu'

type PropTypes = {
  items: IDataTableEmployee[]
  loading?: boolean
  setSelectedTerminate?: (item: IDataTableEmployee) => void
}

const Table: React.FC<PropTypes> = ({ items, loading, setSelectedTerminate }) => {
  const headerItems = [
    { children: 'Employee', className: 'text-left' },
    { children: 'Branch', className: 'text-left' },
    { children: 'Department', className: 'text-left' },
    { children: 'Position', className: 'text-left' },
    { children: 'Job Level', className: 'text-left' },
    { children: 'Employee Status', className: 'text-left' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item, index) => ({
    items: [
      {
        children: (
          <div className="flex gap-3">
            <Avatar src={item.photoProfile} className="rounded-lg bg-primary-100 text-primary-700" name={item.name || ''} size={38} />
            <div>
              <span className="block font-semibold">{item.name}</span>
              <span className="text-xs text-gray-500">{item.employeeCode}</span>
            </div>
          </div>
        ),
      },
      { children: item.branch?.name || '-' },
      { children: item.department?.name || '-' },
      { children: item.position?.name || '-' },
      { children: item.jobLevel?.name || '-' },
      { children: item.jobType?.name || '-' },
      {
        children: <ActionMenu index={index} item={item} setSelectedTerminate={setSelectedTerminate} total={items.length} />,
      },
    ],
  }))

  return <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
}

export default Table
