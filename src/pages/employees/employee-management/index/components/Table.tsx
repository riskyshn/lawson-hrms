import MainTable from '@/components/Elements/MainTable'
import React from 'react'
import ActionMenu from './ActionMenu'
import { Avatar } from 'jobseeker-ui'

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
          <div className="flex gap-3 whitespace-nowrap">
            <Avatar name={item.name || ''} size={38} className="rounded-lg bg-primary-100 text-primary-700" />
            <div>
              <span className="block font-semibold">{item.name}</span>
              <span className="text-xs text-gray-500">{item.employeeId}</span>
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
        children: (
          <ActionMenu
            item={item}
            index={index}
            total={items.length}
            upSpace={items.length > 8 ? 3 : 0}
            setSelectedTerminate={setSelectedTerminate}
          />
        ),
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

export default Table
