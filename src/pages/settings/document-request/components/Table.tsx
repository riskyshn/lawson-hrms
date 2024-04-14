import MainTable from '@/components/Elements/Tables/MainTable'
import React from 'react'
import ActionMenu from './ActionMenu'

type TableProps = {
  items: IDocumentRequest[]
  loading?: boolean
  setSelectedToUpdate?: (item: IDocumentRequest) => void
  onDeleted?: (oid: string) => void
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
      { children: <ActionMenu item={item} index={index} total={items.length} upSpace={items.length > 8 ? 3 : 0} {...props} /> },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

export default Table
