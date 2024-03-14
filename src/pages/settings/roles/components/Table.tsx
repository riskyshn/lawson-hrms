import React from 'react'
import MainTable from '@/components/Elements/MainTable'
import ActionMenu from './ActionMenu'
import { IPosition } from '@/types/oganizartion'

type TableProps = {
  items: IPosition[]
  loading?: boolean
  onSubmitSuccess: () => void
}

const Table: React.FC<TableProps> = ({ items, loading, onSubmitSuccess }) => {
  const headerItems = [
    { children: 'Role name', className: 'text-left' },
    { children: 'Code' },
    { children: 'Description' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((position) => ({
    items: [
      {
        children: <span className="block font-semibold">{position.name}</span>,
      },
      { children: '-', className: 'text-center' },
      {
        children: <ActionMenu items={position} onSubmitSuccess={onSubmitSuccess} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

export default Table
