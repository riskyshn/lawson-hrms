import React from 'react'
import MainTable from '@/components/Elements/MainTable'
import ActionMenu from './ActionMenu'
import { IPosition } from '@/types/oganizartion'

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
      { children: '-', className: 'text-center' },
      {
        children: <ActionMenu items={position} onSubmitSuccess={onSubmitSuccess} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} />
}

export default Table
