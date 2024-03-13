import React from 'react'
import MainTable from '@/components/Elements/MainTable'
import ActionMenu from './ActionMenu'
import { IPosition } from '@/types/oganizartion'

const Table: React.FC<{ items: IPosition[] }> = ({ items }) => {
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
      { children: '-', className: 'text-center' },
      {
        children: <ActionMenu items={position} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} />
}

export default Table
