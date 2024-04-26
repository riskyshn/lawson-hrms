import MainTable from '@/components/Elements/Tables/MainTable'
import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import { attendanceService } from '@/services'
import { Card, CardFooter, useAsyncSearch, usePagination } from 'jobseeker-ui'
import { ImageIcon } from 'lucide-react'
import React from 'react'

const LeaveTable: React.FC<{ employee: IEmployee }> = ({ employee }) => {
  const previewImage = usePreviewImage()

  const { pageData, isLoading } = useAsyncSearch(attendanceService.fetchEmployeeLeave, {
    employee_id: employee.oid,
    limit: 30,
  })

  const pagination = usePagination({
    pathname: `/employees/employee-management/${employee.oid}`,
    totalPage: pageData?.totalPages,
    params: { tab: 'leave-request' },
  })

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

  const bodyItems = pageData?.content.map((item) => ({
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
      <MainTable headerItems={headerItems} bodyItems={bodyItems || []} loading={isLoading} />
      <CardFooter className="justify-center">{pagination.render()}</CardFooter>
    </Card>
  )
}

export default LeaveTable
