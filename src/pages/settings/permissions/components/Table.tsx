import React from 'react'
import MainTable from '@/components/Elements/Tables/MainTable'
import ActionMenu from './ActionMenu'

type TableProps = {
  items: IPermission[]
  loading?: boolean
  setSelectedToUpdate?: (permission: IPermission) => void
  onDeleted?: (oid: string) => void
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
        children: <ActionMenu permission={permission} index={index} total={items.length} upSpace={items.length > 8 ? 3 : 0} {...props} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

export default Table
