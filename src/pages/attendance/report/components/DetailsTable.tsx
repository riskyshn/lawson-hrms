import MapsPreviewerModal from '@/components/Elements/Modals/MapsPreviewerModal'
import MainTable from '@/components/Elements/Tables/MainTable'
import { usePreviewImage } from '@/contexts/MediaPreviewerContext'
import { Avatar } from 'jobseeker-ui'
import { ImageIcon, MapPinIcon } from 'lucide-react'
import { useState } from 'react'

type PropTypes = {
  items: IEmployeeHistoryAttendance[]
  loading?: boolean
}

const DetailsTable: React.FC<PropTypes> = ({ items, loading }) => {
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null)
  const previewImage = usePreviewImage()
  const [branchLocation, setBranchLocation] = useState<[number, number] | null>(null)

  const handlePinClick = (lat: number, lng: number, latLng?: [number, number]) => {
    setSelectedLocation([lat, lng])
    setBranchLocation(latLng || null)
  }

  const headerItems = [
    { children: 'Employee', className: 'text-left' },
    { children: 'Branch', className: 'text-left' },
    { children: 'Type', className: 'text-center' },
    { children: 'Date', className: 'text-center' },
    { children: 'Time', className: 'text-center' },
    { children: 'Location', className: 'text-center' },
    { children: 'In Office', className: 'text-center' },
    { children: 'Status', className: 'text-center' },
    { children: 'Reason', className: 'text-center' },
  ]

  const bodyItems = items?.map((item) => ({
    items: [
      {
        children: (
          <div className="flex gap-3 whitespace-nowrap">
            <div>
              <Avatar className="static rounded-lg bg-primary-100 text-primary-700" name={item.employee.name || '-'} size={38} />
            </div>
            <div>
              <span className="block font-semibold">{item.employee.name}</span>
              <span className="text-xs text-gray-500">{item.employee.employeeCode}</span>
            </div>
          </div>
        ),
      },
      { children: item.employee.employment?.branch?.name },
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
        children: formatDate(item.date),
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
      { children: item.status.replace(/\b\w/g, (char) => char.toUpperCase()), className: 'text-center' },
      {
        children: (item.attendanceData ?? [])
          .map((record, index) => {
            if (!record.rejectedReason) {
              return (
                <div key={index}>
                  <span>-</span>
                </div>
              )
            } else {
              const modifiedAttendanceType = record?.rejectedReason
                ?.replace(/_/g, ' ')
                .toLowerCase()
                .replace(/(?:^|\s)\S/g, function (a: string) {
                  return a.toUpperCase()
                })

              return (
                <div key={index}>
                  <span>{modifiedAttendanceType}</span>
                </div>
              )
            }
          })
          .reduce((acc: any, cur: any, index: number, array: any) => {
            if (index % 2 === 0) {
              acc.push(
                <div className="flex h-16 flex-col items-center justify-center" key={index / 2}>
                  {cur}
                  {array[index + 1]}
                </div>,
              )
            }
            return acc
          }, [] as JSX.Element[]),
      },
    ],
  }))

  return (
    <>
      <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
      {selectedLocation && (
        <MapsPreviewerModal
          coordinates={selectedLocation}
          onClose={() => {
            setSelectedLocation(null)
            setBranchLocation(null)
          }}
          radius={100}
          radiusCoordinates={branchLocation}
        />
      )}
    </>
  )
}

const formatDate = (dateString: string): string => {
  const date = new Date(dateString)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()
  return `${day}/${month}/${year}`
}

export default DetailsTable
