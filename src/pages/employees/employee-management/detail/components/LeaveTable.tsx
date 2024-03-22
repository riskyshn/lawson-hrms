import MainTable from '@/components/Elements/MainTable'
import { ImageIcon } from 'lucide-react'
import React, { useState } from 'react'
import PreviewImageModal from './PreviewImageModal'
import { Card } from 'jobseeker-ui'

const dummyLeave = [
  {
    requestDate: '18/03/2024',
    startDate: '20/03/2024',
    endDate: '21/03/2024',
    requestType: 'Annual Leave',
    department: 'IT',
    branch: 'Kantor Jobseeker Bali',
    attachment: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
    notes: 'Cuti Lebaran',
    status: 'Waiting',
  },
]

const LeaveTable: React.FC<{ employee: IEmployee }> = () => {
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

  const bodyItems = dummyLeave.map((item) => ({
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
    <Card>
      <MainTable headerItems={headerItems} bodyItems={bodyItems} />
      {selectedAttachment && <PreviewImageModal imageUrl={selectedAttachment} onClose={() => setSelectedAttachment(null)} />}
    </Card>
  )
}

export default LeaveTable
