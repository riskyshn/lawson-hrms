import type { IRole } from '@jshrms/shared/types'
import React from 'react'
import MainTable from '@jshrms/shared/components/Elements/Tables/MainTable'
import ActionMenu from './ActionMenu'

type TableProps = {
  items: IRole[]
  loading?: boolean
  onDeleted?: (oid: string) => void
  setSelectedToUpdate?: (role: IRole) => void
  setSelectedToUpdatePermission?: (role: IRole) => void
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
        children: <ActionMenu index={index} role={role} total={items.length} upSpace={items.length > 8 ? 3 : 0} {...props} />,
      },
    ],
  }))

  return <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
}

export default Table
