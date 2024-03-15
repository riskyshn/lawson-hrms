import React from 'react'
import MainTable from '@/components/Elements/MainTable'
import ActionMenu from './ActionMenu'

type DocumentRequest = {
  document?: string
  fileType?: string[]
}

type TableProps = {
  items: DocumentRequest[]
  onSubmitSuccess: () => void
}

const Table: React.FC<TableProps> = ({ items, onSubmitSuccess }) => {
  const headerItems = [
    { children: 'Document', className: 'text-left' },
    { children: 'File Type', className: 'text-left' },
    { children: 'Action', className: 'w-24' },
  ]

  const bodyItems = items.map((documentRequest, index) => ({
    items: [
      {
        children: (
          <>
            <span className="block">{documentRequest.document}</span>
          </>
        ),
      },
      {
        children: <span className="block">{documentRequest.fileType?.join(', ')}</span>,
      },
      {
        children: <ActionMenu key={index} items={documentRequest} onSubmitSuccess={onSubmitSuccess} />,
      },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} />
}

export default Table
