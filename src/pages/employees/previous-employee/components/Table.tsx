import MainTable from '@/components/Elements/MainTable'
import { Avatar, Badge } from 'jobseeker-ui'
import moment from 'moment'
import React from 'react'
import ActionMenu from './ActionMenu'

type PropTypes = {
  items: IEmployee[]
  loading?: boolean
}

const Table: React.FC<PropTypes> = ({ items, loading }) => {
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
            <div>
              <Avatar name={item.name || ''} size={38} className="static rounded-lg bg-primary-100 text-primary-700" />
            </div>
            <div>
              <span className="block font-semibold">{item.name}</span>
              <span className="text-xs text-gray-500">mail@example.com</span>
            </div>
          </div>
        ),
      },
      {
        children: moment().format('dd/mm/YYYY'),
      },
      {
        children: (
          <Badge color="error" size="small">
            Resign
          </Badge>
        ),
      },
      {
        children: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit.',
      },
      {
        children: <ActionMenu item={item} index={index} total={items.length} upSpace={items.length > 8 ? 3 : 0} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

export default Table
