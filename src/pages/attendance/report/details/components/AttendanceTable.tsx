import MapsPreviewerModal from '@/components/Elements/Modals/MapsPreviewerModal'
import MainTable from '@/components/Elements/Tables/MainTable'
import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import { Avatar } from 'jobseeker-ui'
import { ImageIcon, MapPinIcon } from 'lucide-react'
import { useState } from 'react'

type PropTypes = {
  items: IEmployeeHistoryAttendance[]
  loading?: boolean
}

const AttendanceTable: React.FC<PropTypes> = ({ items, loading }) => {
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null)
  const [branchLocation, setBranchLocation] = useState<[number, number] | null>(null)
  const previewImage = usePreviewImage()

  const handlePinClick = (lat: number, lng: number, latLng?: [number, number]) => {
    setSelectedLocation([lat, lng])
    setBranchLocation(latLng || null)
  }

  const headerItems = [
    { children: 'Employee', className: 'text-left' },
    { children: 'Branch', className: 'text-left' },
    { children: 'Status', className: 'text-center' },
    { children: 'Type', className: 'text-center' },
    { children: 'Time', className: 'text-center' },
    { children: 'Location', className: 'text-center' },
    { children: 'In Office', className: 'text-center' },
    { children: 'Reason', className: 'text-center' },
  ]

  const bodyItems = items.map((item) => ({
    items: [
      {
        children: (
          <div className="flex gap-3 whitespace-nowrap">
            <div>
              <Avatar name={item.employee.name || '-'} size={38} className="static rounded-lg bg-primary-100 text-primary-700" />
            </div>
            <div>
              <span className="block font-semibold">{item.employee.name}</span>
              <span className="text-xs text-gray-500">{item.employee.employeeCode}</span>
            </div>
          </div>
        ),
      },
      { children: item.employee.employment?.branch?.name },
      { children: item.logType.replace(/\b\w/g, (char) => char.toUpperCase()), className: 'text-center' },
      {
        children:
          item.logType === 'absent' ? (
            '-'
          ) : item.leaveData !== null ? (
            // Render leave data
            <>
              <span className="font-semibold">{item.leaveData.leaveType.title}</span>
            </>
          ) : (
            // Render attendance data
            (item.attendanceData ?? []).map((record, index) => {
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
            })
          ),
        className: 'text-center',
      },
      {
        children:
          item.logType === 'absent'
            ? '-'
            : item.leaveData !== null
              ? '-'
              : (item.attendanceData ?? [])
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
                        <div key={index / 2} className="flex h-16 flex-col items-center justify-center">
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
        children:
          item.logType === 'absent'
            ? '-'
            : item.leaveData !== null
              ? '-'
              : (item.attendanceData ?? [])
                  .map((record, index) => {
                    return (
                      <div key={index}>
                        <button
                          title="Maps"
                          className="text-primary-600 hover:text-primary-700 focus:outline-none"
                          onClick={() =>
                            handlePinClick(
                              record?.coordinate?.coordinates?.[0] || 0,
                              record?.coordinate?.coordinates?.[1] || 0,
                              item.employee?.employment?.branch?.coordinate?.coordinates,
                            )
                          }
                        >
                          <MapPinIcon size={15} />
                        </button>
                      </div>
                    )
                  })
                  .reduce((acc: JSX.Element[], cur: JSX.Element, index: number, array: JSX.Element[]) => {
                    if (index % 2 === 0) {
                      acc.push(
                        <div key={index / 2} className="flex h-16 flex-col items-center justify-center">
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
        children:
          item.logType === 'absent'
            ? '-'
            : item.leaveData !== null
              ? '-'
              : (item.attendanceData ?? [])
                  .map((record, index) => {
                    return (
                      <div key={index}>
                        <button
                          title="Image"
                          className="text-primary-600 hover:text-primary-700 focus:outline-none"
                          onClick={() => previewImage(record.photo)}
                        >
                          <ImageIcon size={15} />
                        </button>
                      </div>
                    )
                  })
                  .reduce((acc: JSX.Element[], cur: JSX.Element, index: number, array: JSX.Element[]) => {
                    if (index % 2 === 0) {
                      acc.push(
                        <div key={index / 2} className="flex h-16 flex-col items-center justify-center">
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
        children:
          item.logType === 'absent'
            ? '-'
            : item.leaveData !== null
              ? item.leaveData.rejectedReason || '-'
              : (item.attendanceData ?? [])
                  .map((record, index) => {
                    return <div key={index}>{record.rejectedReason || '-'}</div>
                  })
                  .reduce((acc: JSX.Element[], cur: JSX.Element, index: number, array: JSX.Element[]) => {
                    if (index % 2 === 0) {
                      acc.push(
                        <div key={index / 2} className="flex h-16 flex-col items-center justify-center">
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
    <>
      <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
      {selectedLocation && (
        <MapsPreviewerModal
          coordinates={selectedLocation}
          radiusCoordinates={branchLocation}
          radius={100}
          onClose={() => {
            setSelectedLocation(null)
            setBranchLocation(null)
          }}
        />
      )}
    </>
  )
}

export default AttendanceTable
