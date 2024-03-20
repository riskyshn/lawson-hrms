import MainTable from '@/components/Elements/MainTable'
import { ImageIcon } from 'lucide-react'
import React, { useState } from 'react'
import PreviewImageModal from '../../previous-employee/components/PreviewImageModal'

type TableItem = {
  requestDate: string
  startDate: string
  endDate: string
  requestType: string
  department: string
  branch: string
  attachment: string
  notes: string
  status: string
}

type TableProps = {
  items: TableItem[]
}

const LeaveTable: React.FC<TableProps> = ({ items }) => {
  const [selectedAttachment, setSelectedAttachment] = useState<string | null>(null)

  const handleView = (status: string, attachment: string | null) => {
    if (status == 'image') {
      setSelectedAttachment(attachment)
    }
  }

  const headerItems = [
    { children: 'Request Date', className: 'text-left' },
    { children: 'Start Date', className: 'text-left' },
    { children: 'End Date', className: 'text-left' },
    { children: 'Request Type', className: 'text-left' },
    { children: 'Department', className: 'text-left' },
    { children: 'Branch', className: 'text-left' },
    { children: 'Attachment', className: 'text-left' },
    { children: 'Notes', className: 'text-left' },
    { children: 'Status', className: 'text-left' },
  ]

  const bodyItems = items.map((item) => ({
    items: [
      {
        children: item.requestDate,
      },
      {
        children: item.startDate,
      },
      {
        children: item.endDate,
      },
      {
        children: item.requestType,
      },
      {
        children: item.department,
      },
      {
        children: item.branch,
      },
      {
        children: (
          <span className="flex gap-2">
            <button
              title="Maps"
              className="text-primary-600 hover:text-primary-700 focus:outline-none"
              onClick={() => handleView('image', item.attachment)}
            >
              <ImageIcon size={18} />
            </button>
          </span>
        ),
      },
      {
        children: item.notes,
      },
      {
        children: item.status,
      },
    ],
  }))

  return (
    <>
      <MainTable headerItems={headerItems} bodyItems={bodyItems} />
      {selectedAttachment && <PreviewImageModal imageUrl={selectedAttachment} onClose={() => setSelectedAttachment(null)} />}
    </>
  )
}

export default LeaveTable
