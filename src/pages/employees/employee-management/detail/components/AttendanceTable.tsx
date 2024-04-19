import MapsPreviewerModal from '@/components/Elements/Modals/MapsPreviewerModal'
import MainTable from '@/components/Elements/Tables/MainTable'
import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import useAsyncSearch from '@/hooks/use-async-search'
import usePagination from '@/hooks/use-pagination'
import { attendanceService } from '@/services'
import { Card, CardFooter } from 'jobseeker-ui'
import { ImageIcon, MapPinIcon } from 'lucide-react'
import moment from 'moment'
import React, { useState } from 'react'

const AttendanceTable: React.FC<{ employee: IEmployee }> = ({ employee }) => {
  const [selectedLocation, setSelectedLocation] = useState<[[number, number] | null, [number, number] | null]>([null, null])
  const previewImage = usePreviewImage()

  const { pageData } = useAsyncSearch(
    (params: Parameters<typeof attendanceService.fetchEmployeeAttendanceHistories>[1]) =>
      attendanceService.fetchEmployeeAttendanceHistories(employee.oid, params),
    {
      attendance_group: 'clock',
      limit: 30,
    },
  )

  const pagination = usePagination({
    pathname: '/employees/employee-management',
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
                  if (el.lat && el.lng)
                    setSelectedLocation([[el.lat, el.lng], el.employee?.employment?.branch?.coordinate?.coordinates || null])
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
      <MainTable headerItems={headerItems} bodyItems={bodyItems || []} loading={!pageData} />
      <CardFooter className="justify-center">{pagination.render()}</CardFooter>
    </Card>
  )
}

export default AttendanceTable
