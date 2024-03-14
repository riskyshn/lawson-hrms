import React from 'react'
import MainTable from '@/components/Elements/MainTable'
import ActionMenu from './ActionMenu'
import { IPosition } from '@/types/oganizartion'
import { Avatar } from 'jobseeker-ui'

type TableProps = {
  items: IPosition[]
  onSubmitSuccess: () => void
}

const Table: React.FC<TableProps> = ({ items, onSubmitSuccess }) => {
  const headerItems = [
    { children: 'Position', className: 'text-left' },
    { children: 'Employees' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((position) => ({
    items: [
      {
        children: (
          <>
            <span className="block font-semibold">{position.name}</span>
          </>
        ),
      },
      {
        children: (
          <span className="flex items-center justify-center gap-2">
            <span className="flex">
              <Avatar name="John Doe" size={38} className="rounded-full bg-success-100 text-success-700" />
              <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-primary-100 text-primary-700" />
              <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-error-100 text-error-700" />
            </span>
            <a href="#" className="text-primary-600">
              {position.totalEmployee ?? 0}+
            </a>
          </span>
        ),
        className: 'text-center',
      },
      {
        children: <ActionMenu items={position} onSubmitSuccess={onSubmitSuccess} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} />
}

export default Table
