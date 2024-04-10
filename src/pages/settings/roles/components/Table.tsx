import React from 'react'
import MainTable from '@/components/Elements/Tables/MainTable'
import ActionMenu from './ActionMenu'

type TableProps = {
  items: IRole[]
  loading?: boolean
  setSelectedToUpdate?: (role: IRole) => void
  setSelectedToUpdatePermission?: (role: IRole) => void
  onDeleted?: (oid: string) => void
}

const Table: React.FC<TableProps> = ({ items, loading, ...props }) => {
  const headerItems = [
    { children: 'Name', className: 'text-left' },
    { children: 'Code' },
    { children: 'Description' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((role, index) => ({
    items: [
      {
        children: <span className="font-semibold">{role.name}</span>,
      },
      { children: role.code, className: 'text-center' },
      { children: role.description, className: 'text-center' },
      {
        children: <ActionMenu role={role} index={index} total={items.length} upSpace={items.length > 8 ? 3 : 0} {...props} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

export default Table
