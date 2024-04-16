import MainTable from '@/components/Elements/Tables/MainTable'
import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import useAsyncSearch from '@/hooks/use-async-search'
import { attendanceService } from '@/services'
import { Card } from 'jobseeker-ui'
import { ImageIcon } from 'lucide-react'
import React from 'react'

const LeaveTable: React.FC<{ employee: IEmployee }> = () => {
  const previewImage = usePreviewImage()

  const { pageData } = useAsyncSearch(attendanceService.fetchEmployeeLeave)

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

  const bodyItems = pageData?.map((item) => ({
    items: [
      {
        children: item.createdAt || '',
      },
      {
        children: item.startDate || '',
      },
      {
        children: item.endDate || '',
      },
      {
        children: item.leaveType?.title || '',
      },
      {
        children: item.employee?.employment?.department?.name || '',
      },
      {
        children: item.employee?.employment?.branch?.name || '',
      },
      {
        children: (
          <span className="flex gap-2">
            <button
              title="Maps"
              className="text-primary-600 hover:text-primary-700 focus:outline-none"
              onClick={() => previewImage(item.attachment)}
            >
              <ImageIcon size={18} />
            </button>
          </span>
        ),
      },
      {
        children: item.note || '',
      },
      {
        children: item.status || '',
      },
    ],
  }))

  return (
    <Card>
      <MainTable headerItems={headerItems} bodyItems={bodyItems || []} loading={!pageData} />
    </Card>
  )
}

export default LeaveTable
