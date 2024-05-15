import type { IPermission } from '@/types'
import React from 'react'
import { MainTable } from '@/components'
import ActionMenu from './ActionMenu'

type TableProps = {
  items: IPermission[]
  loading?: boolean
  onDeleted?: (oid: string) => void
  setSelectedToUpdate?: (permission: IPermission) => void
}

const Table: React.FC<TableProps> = ({ items, loading, ...props }) => {
  const headerItems = [
    { children: 'Name', className: 'text-left' },
    { children: 'Method' },
    { children: 'Group' },
    { children: 'Path' },
    { children: 'Trigger' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((permission, index) => ({
    items: [
      {
        children: <span className="font-semibold">{permission.name}</span>,
      },
      { children: permission.method, className: 'text-center' },
      { children: permission.groupName, className: 'text-center' },
      { children: permission.path, className: 'text-center' },
      { children: permission.action, className: 'text-center' },
      {
        children: <ActionMenu index={index} permission={permission} total={items.length} {...props} />,
      },
    ],
  }))

  return <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
}

export default Table
