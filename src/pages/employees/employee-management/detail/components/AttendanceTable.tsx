import type { IEmployee } from '@jshrms/shared/types'
import React, { useState } from 'react'
import MapsPreviewerModal from '@jshrms/shared/components/Elements/Modals/MapsPreviewerModal'
import MainTable from '@jshrms/shared/components/Elements/Tables/MainTable'
import { useAsyncSearch, usePagination } from '@jshrms/shared/hooks'
import { attendanceService } from '@jshrms/shared/services'
import { Card, CardFooter, usePreviewImage } from '@jshrms/ui'
import { ImageIcon, MapPinIcon } from 'lucide-react'

const AttendanceTable: React.FC<{ employee: IEmployee }> = ({ employee }) => {
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null)
  const [branchLocation, setBranchLocation] = useState<[number, number] | null>(null)
  const previewImage = usePreviewImage()

  const { isLoading, pageData } = useAsyncSearch(
    (params: Parameters<typeof attendanceService.fetchAttendanceManagement>[0]) => attendanceService.fetchAttendanceManagement(params),
    {
      log_type: '',
      employee_id: employee.oid,
      limit: 20,
    },
  )

  const handlePinClick = (lat: number, lng: number, latLng?: [number, number]) => {
    setSelectedLocation([lat, lng])
    setBranchLocation(latLng || null)
  }

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
        children: formatDate(item.date),
        className: 'text-center',
      },
      {
        children: (item.attendanceData ?? []).map((record, index) => {
          const modifiedAttendanceType = record.attendanceType
            .replace(/_/g, ' ')
            .toLowerCase()
            .replace(/(?:^|\s)\S/g, function (a: string) {
              return a.toUpperCase()
            })

          return (
            <div key={index}>
              <span className="font-semibold">{modifiedAttendanceType}</span>
            </div>
          )
        }),
        className: 'text-center',
      },
      {
        children: (item.attendanceData ?? [])
          .map((record: any, index: number) => {
            const modifiedAttendanceType = `${record?.timezoneTime?.split(' ')[1]} ${item?.employee?.employment?.schedule?.timezone?.title}`

            return (
              <div key={index}>
                <span className="font-semibold">{modifiedAttendanceType}</span>
              </div>
            )
          })
          .reduce((acc: JSX.Element[], cur: JSX.Element, index: number, array: JSX.Element[]) => {
            if (index % 2 === 0) {
              acc.push(
                <div className="flex h-16 flex-col items-center justify-center" key={index / 2}>
                  {cur}
                  {array[index + 1]}
                </div>,
              )
            }
            return acc
          }, []),
        className: 'text-center',
      },
      { children: item.status.replace(/\b\w/g, (char) => char.toUpperCase()), className: 'text-center' },
      {
        children: (item.attendanceData ?? [])
          .map((record, index) => {
            return (
              <div key={index}>
                <button
                  className={'text-primary-600 hover:text-primary-700 focus:outline-none'}
                  onClick={() =>
                    handlePinClick(
                      record?.coordinate?.coordinates?.[0] || 0,
                      record?.coordinate?.coordinates?.[1] || 0,
                      item.employee?.employment?.branch?.coordinate?.coordinates,
                    )
                  }
                  title="Maps"
                >
                  <MapPinIcon size={15} />
                </button>
              </div>
            )
          })
          .reduce((acc: JSX.Element[], cur: JSX.Element, index: number, array: JSX.Element[]) => {
            if (index % 2 === 0) {
              acc.push(
                <div className="flex h-16 flex-col items-center justify-center" key={index / 2}>
                  {cur}
                  {array[index + 1]}
                </div>,
              )
            }
            return acc
          }, []),
        className: 'text-center',
      },
      {
        children: (item.attendanceData ?? [])
          .map((record, index) => {
            return (
              <div key={index}>
                <button
                  className="text-primary-600 hover:text-primary-700 focus:outline-none"
                  onClick={() => previewImage(record.photo)}
                  title="Image"
                >
                  <ImageIcon size={15} />
                </button>
              </div>
            )
          })
          .reduce((acc: JSX.Element[], cur: JSX.Element, index: number, array: JSX.Element[]) => {
            if (index % 2 === 0) {
              acc.push(
                <div className="flex h-16 flex-col items-center justify-center" key={index / 2}>
                  {cur}
                  {array[index + 1]}
                </div>,
              )
            }
            return acc
          }, []),
        className: 'text-center',
      },
    ],
  }))

  return (
    <Card className="overflow-x-auto">
      <MapsPreviewerModal
        coordinates={selectedLocation}
        onClose={() => {
          setSelectedLocation(null)
          setBranchLocation(null)
        }}
        radius={100}
        radiusCoordinates={branchLocation}
      />
      <MainTable bodyItems={bodyItems || []} headerItems={headerItems} loading={isLoading} />
      <CardFooter className="justify-center">{pagination.render()}</CardFooter>
    </Card>
  )
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()
  return `${day}/${month}/${year}`
}

export default AttendanceTable
