import type { IPermission } from '@jshrms/shared/types'
import React from 'react'
import MainTable from '@jshrms/shared/components/Elements/Tables/MainTable'
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
        children: <ActionMenu index={index} permission={permission} total={items.length} upSpace={items.length > 8 ? 3 : 0} {...props} />,
      },
    ],
  }))

  return <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
}

export default Table
