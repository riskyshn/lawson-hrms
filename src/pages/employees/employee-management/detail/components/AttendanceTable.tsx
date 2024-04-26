import MapsPreviewerModal from '@/components/Elements/Modals/MapsPreviewerModal'
import MainTable from '@/components/Elements/Tables/MainTable'
import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import { attendanceService } from '@/services'
import { Card, CardFooter, useAsyncSearch, usePagination } from 'jobseeker-ui'
import { ImageIcon, MapPinIcon } from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'

const AttendanceTable: React.FC<{ employee: IEmployee }> = ({ employee }) => {
  const [selectedLocation, setSelectedLocation] = useState<[[number, number] | null, [number, number] | null]>([null, null])
  const previewImage = usePreviewImage()

  const { pageData, isLoading } = useAsyncSearch(
    (params: Parameters<typeof attendanceService.fetchEmployeeAttendanceHistories>[1]) =>
      attendanceService.fetchEmployeeAttendanceHistories(employee.oid, params),
    {
      attendance_group: 'clock',
      limit: 30,
    },
  )

  const pagination = usePagination({
    pathname: `/employees/employee-management/${employee.oid}`,
    totalPage: pageData?.totalPages,
    params: { tab: 'attendance' },
  })

  const headerItems = [
    { children: 'Date', className: 'text-left' },
    { children: 'Type', className: 'text-left' },
    { children: 'Time', className: 'text-left' },
    { children: 'Status', className: 'text-left' },
    { children: 'Location' },
    { children: 'Attachment' },
  ]

  const bodyItems = pageData?.content.map((item) => ({
    items: [
      {
        children: <>{item.date}</>,
      },
      {
        children: (
          <>
            {item.records?.map((el, i) => (
              <span key={i} className="block capitalize">
                {el.attendanceType?.replace('_', ' ')}
              </span>
            ))}
          </>
        ),
      },
      {
        children: (
          <>
            {item.records?.map((el, i) => (
              <span key={i} className="block">
                {moment(el.timezoneTime).format('HH:mm')}
              </span>
            ))}
          </>
        ),
      },
      {
        children: (
          <>
            {item.records?.map((el, i) => (
              <span key={i} className="block capitalize">
                {el.status}
              </span>
            ))}
          </>
        ),
      },
      {
        children: (
          <>
            {item.records?.map((el, i) => (
              <span
                key={i}
                className="flex cursor-pointer items-center justify-center text-primary-600 hover:text-primary-700"
                onClick={() => {
                  if (el.coordinate?.coordinates?.[0] && el.coordinate?.coordinates?.[1])
                    setSelectedLocation([
                      [el.coordinate?.coordinates?.[0], el.coordinate?.coordinates?.[1]],
                      el.employee?.employment?.branch?.coordinate?.coordinates || null,
                    ])
                }}
              >
                <MapPinIcon size={14} />
              </span>
            ))}
          </>
        ),
      },
      {
        children: (
          <>
            {item.records?.map((el, i) => (
              <span
                key={i}
                className="flex cursor-pointer items-center justify-center text-primary-600 hover:text-primary-700"
                onClick={() => previewImage(el.photo)}
              >
                <ImageIcon size={14} />
              </span>
            ))}
          </>
        ),
      },
    ],
  }))

  return (
    <Card>
      <MapsPreviewerModal
        coordinates={selectedLocation[0]}
        radiusCoordinates={selectedLocation[1]}
        radius={100}
        onClose={() => setSelectedLocation([null, null])}
      />
      <MainTable headerItems={headerItems} bodyItems={bodyItems || []} loading={isLoading} />
      <CardFooter className="justify-center">{pagination.render()}</CardFooter>
    </Card>
  )
}

export default AttendanceTable
