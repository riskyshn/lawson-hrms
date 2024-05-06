import React, { useState } from 'react'
import { Card, CardFooter } from 'jobseeker-ui'
import { ImageIcon, MapPinIcon } from 'lucide-react'
import moment from 'moment'
import MapsPreviewerModal from '@/components/Elements/Modals/MapsPreviewerModal'
import MainTable from '@/components/Elements/Tables/MainTable'
import { usePreviewImage } from '@/contexts/MediaPreviewerContext'
import useAsyncSearch from '@/core/hooks/use-async-search'
import usePagination from '@/core/hooks/use-pagination'
import { attendanceService } from '@/services'

const AttendanceTable: React.FC<{ employee: IEmployee }> = ({ employee }) => {
  const [selectedLocation, setSelectedLocation] = useState<[[number, number] | null, [number, number] | null]>([null, null])
  const previewImage = usePreviewImage()

  const { isLoading, pageData } = useAsyncSearch(
    (params: Parameters<typeof attendanceService.fetchEmployeeAttendanceHistories>[1]) =>
      attendanceService.fetchEmployeeAttendanceHistories(employee.oid, params),
    {
      attendance_group: 'clock',
      limit: 30,
    },
  )

  const pagination = usePagination({
    params: { tab: 'attendance' },
    pathname: `/employees/employee-management/${employee.oid}`,
    totalPage: pageData?.totalPages,
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
              <span className="block capitalize" key={i}>
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
              <span className="block" key={i}>
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
              <span className="block capitalize" key={i}>
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
                className="flex cursor-pointer items-center justify-center text-primary-600 hover:text-primary-700"
                key={i}
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
                className="flex cursor-pointer items-center justify-center text-primary-600 hover:text-primary-700"
                key={i}
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
    <Card className="overflow-x-auto">
      <MapsPreviewerModal
        coordinates={selectedLocation[0]}
        onClose={() => setSelectedLocation([null, null])}
        radius={100}
        radiusCoordinates={selectedLocation[1]}
      />
      <MainTable bodyItems={bodyItems || []} headerItems={headerItems} loading={isLoading} />
      <CardFooter className="justify-center">{pagination.render()}</CardFooter>
    </Card>
  )
}

export default AttendanceTable
