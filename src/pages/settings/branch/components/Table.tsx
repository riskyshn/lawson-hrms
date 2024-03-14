import React from 'react'
import MainTable from '@/components/Elements/MainTable'
import { Avatar } from 'jobseeker-ui'
import ActionMenu from './ActionMenu'
import { IBranch } from '@/types/oganizartion'

type TableProps = {
  items: IBranch[]
  onSubmitSuccess: () => void
}

const Table: React.FC<TableProps> = ({ items, onSubmitSuccess }) => {
  const headerItems = [
    { children: 'Branch', className: 'text-left' },
    { children: 'Address', className: 'text-left' },
    { children: 'Longitude-Latitude' },
    { children: 'Employees' },
    { children: 'Range' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((branch) => ({
    items: [
      {
        children: (
          <>
            <span className="block font-semibold">{branch.name}</span>
          </>
        ),
      },
      {
        children: branch.address,
      },
      // { children: branch?.longlat || '-', className: 'text-center' },
      { children: '-', className: 'text-center' },
      {
        children: (
          <span className="flex items-center justify-center gap-2">
            <span className="flex">
              <Avatar name="John Doe" size={38} className="rounded-full bg-success-100 text-success-700" />
              <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-primary-100 text-primary-700" />
              <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-error-100 text-error-700" />
            </span>
            <a href="#" className="text-primary-600">
              {branch.totalEmployee}+
            </a>
          </span>
        ),
        className: 'text-center',
      },
      // { children: branch?.range || '-', className: 'text-center' },
      { children: '-', className: 'text-center' },
      {
        children: <ActionMenu items={branch} onSubmitSuccess={onSubmitSuccess} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} />
}

export default Table
