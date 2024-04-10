import MainTable from '@/components/Elements/Tables/MainTable'
import { Avatar } from 'jobseeker-ui'
import React from 'react'
import ActionMenu from './ActionMenu'

type PropTypes = {
  items: IComponentInEmployee[]
  loading?: boolean
  onRefresh?: () => void
}

const Table: React.FC<PropTypes> = ({ items, loading, onRefresh }) => {
  const headerItems = [
    { children: 'Employee', className: 'text-left' },
    { children: 'Component', className: 'text-left' },
    { children: 'Amount type', className: 'text-left' },
    { children: 'Amount', className: 'text-left' },
    { children: 'Max. Cap', className: 'text-left' },
    { children: 'Application Type', className: 'text-left' },
    { children: 'Tax type', className: 'text-left' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item, index) => ({
    items: [
      {
        children: (
          <div className="flex gap-3">
            <Avatar name={item.employee.name || ''} size={38} className="rounded-lg bg-primary-100 text-primary-700" />
            <div>
              <span className="block font-semibold">{item.employee.name}</span>
              <span className="text-xs text-gray-500">{item.employee.employeeCode}</span>
            </div>
          </div>
        ),
      },
      { children: item.employee.oid },
      { children: item.employee.oid },
      { children: item.employee.oid },
      { children: item.employee.oid },
      { children: item.employee.oid },
      { children: item.employee.oid },
      {
        children: <ActionMenu item={item} index={index} total={items.length} upSpace={items.length > 8 ? 3 : 0} onRefresh={onRefresh} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

export default Table
