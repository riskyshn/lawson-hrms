import type { IPreviousEmployee } from '@jshrms/shared/types'
import React from 'react'
import MainTable from '@jshrms/shared/components/Elements/Tables/MainTable'
import { Avatar, Badge } from '@jshrms/ui'
import moment from 'moment'
import ActionMenu from './ActionMenu'

type PropTypes = {
  items: IPreviousEmployee[]
  loading?: boolean
  onRestored?: () => void
}

const Table: React.FC<PropTypes> = ({ items, loading, onRestored }) => {
  const headerItems = [
    { children: 'Employee', className: 'text-left' },
    { children: 'Last Day', className: 'text-left' },
    { children: 'Status', className: 'text-left' },
    { children: 'Reason', className: 'text-left' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item, index) => ({
    items: [
      {
        children: (
          <div className="flex gap-3">
            <Avatar className="rounded-lg bg-primary-100 text-primary-700" name={item.name || ''} size={38} />
            <div>
              <span className="block font-semibold">{item.name}</span>
              <span className="text-xs text-gray-500">{item.employeeCode}</span>
            </div>
          </div>
        ),
      },
      {
        children: moment.utc(item.lastdayAt).local().format('DD/MM/YYYY'),
      },
      {
        children: (
          <Badge color="error" size="small">
            {item.jobType?.name}
          </Badge>
        ),
      },
      {
        children: item.reasonInactive,
        className: 'whitespace-normal',
      },
      {
        children: <ActionMenu index={index} item={item} onRestored={onRestored} total={items.length} upSpace={items.length > 8 ? 3 : 0} />,
      },
    ],
  }))

  return <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
}

export default Table
