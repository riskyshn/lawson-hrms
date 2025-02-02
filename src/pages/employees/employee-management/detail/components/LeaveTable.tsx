import type { IEmployee } from '@/types'
import React from 'react'
import { Card, CardFooter, usePreviewImage } from 'jobseeker-ui'
import { ImageIcon } from 'lucide-react'
import { MainTable } from '@/components'
import { useAsyncSearch, usePagination } from '@/hooks'
import { attendanceService } from '@/services'

const LeaveTable: React.FC<{ employee: IEmployee }> = ({ employee }) => {
  const previewImage = usePreviewImage()

  const { isLoading, pageData } = useAsyncSearch(attendanceService.fetchEmployeeLeave, {
    employee_id: employee.oid,
    limit: 30,
  })

  const pagination = usePagination({
    params: { tab: 'leave-request' },
    pathname: `/employees/employee-management/${employee.oid}`,
    totalPage: pageData?.totalPages,
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
        children: formatDate(item.createdAt || '') || '',
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
              className="text-primary-600 hover:text-primary-700 focus:outline-none"
              onClick={() => previewImage(item.attachment)}
              title="Maps"
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
    <Card className="overflow-x-auto">
      <MainTable bodyItems={bodyItems || []} headerItems={headerItems} loading={isLoading} />
      <CardFooter className="justify-center">{pagination.render()}</CardFooter>
    </Card>
  )
}

function formatDate(inputDate: string): string {
  if (!inputDate) {
    return ''
  }

  const date = new Date(inputDate)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
}

export default LeaveTable
