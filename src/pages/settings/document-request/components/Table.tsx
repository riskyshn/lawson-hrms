import type { IDocumentRequest } from '@/types'
import React from 'react'
import MainTable from '@/components/Elements/Tables/MainTable'
import ActionMenu from './ActionMenu'

type TableProps = {
  items: IDocumentRequest[]
  loading?: boolean
  onDeleted?: (oid: string) => void
  setSelectedToUpdate?: (item: IDocumentRequest) => void
}

const Table: React.FC<TableProps> = ({ items, loading, ...props }) => {
  const headerItems = [
    { children: 'Document', className: 'text-left' },
    { children: 'Allowed File Types', className: 'text-left' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((item, index) => ({
    items: [
      { children: <span className="block font-semibold">{item.name}</span> },
      { children: item.allowedFileTypes.join(', ') },
      { children: <ActionMenu index={index} item={item} total={items.length} upSpace={items.length > 8 ? 3 : 0} {...props} /> },
    ],
  }))

  return <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
}

export default Table
