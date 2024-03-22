import MainTable from '@/components/Elements/MainTable'
import { Avatar, Badge } from 'jobseeker-ui'
import moment from 'moment'
import React from 'react'
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
            <Avatar name={item.name || ''} size={38} className="rounded-lg bg-primary-100 text-primary-700" />
            <div>
              <span className="block font-semibold">{item.name}</span>
              <span className="text-xs text-gray-500">{item.employeeId}</span>
            </div>
          </div>
        ),
      },
      {
        children: moment(item.lastdayAt).format('DD/MM/YYYY'),
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
      },
      {
        children: <ActionMenu item={item} index={index} total={items.length} upSpace={items.length > 8 ? 3 : 0} onRestored={onRestored} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

export default Table
