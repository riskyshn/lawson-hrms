import type { IComponentInEmployee } from '@/types'
import React from 'react'
import { Avatar } from 'jobseeker-ui'
import { MainTable } from '@/components'
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
            <Avatar className="rounded-lg bg-primary-100 text-primary-700" name={item.employee.name || ''} size={38} />
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
        children: <ActionMenu index={index} item={item} onRefresh={onRefresh} total={items.length} upSpace={items.length > 8 ? 3 : 0} />,
      },
    ],
  }))

  return <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
}

export default Table
