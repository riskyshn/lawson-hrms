import MainTable from '@/components/Elements/Tables/MainTable'
import MapsPreviewerModal from '@/components/Elements/Modals/MapsPreviewerModal'
import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import { Avatar } from 'jobseeker-ui'
import { ImageIcon, MapPinIcon } from 'lucide-react'
import { useState } from 'react'

type PropTypes = {
  items: any
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
    { children: 'Time', className: 'text-center' },
    { children: 'Location', className: 'text-center' },
    { children: 'In Office', className: 'text-center' },
  ]

  const bodyItems = items.map((item: any) => ({
    items: [
      {
        children: (
          <div className="flex gap-3 whitespace-nowrap">
            <div>
              <Avatar
                name={item.records?.[0]?.employee?.name || '-'}
                size={38}
                className="static rounded-lg bg-primary-100 text-primary-700"
              />
            </div>
            <div>
              <span className="block font-semibold">{item.records?.[0]?.employee?.name}</span>
              <span className="text-xs text-gray-500">{item.records?.[0].employee?.employeeCode}</span>
            </div>
          </div>
        ),
      },
      { children: item.records?.[0]?.employee?.employment?.branch?.name },
      {
        children: (item.records ?? [])
          .map((record: any, index: number) => {
            const modifiedAttendanceType = record?.attendanceType
              ?.replace(/_/g, ' ')
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
          .reduce((acc: JSX.Element[], cur: JSX.Element, index: number, array: JSX.Element[]) => {
            if (index % 2 === 0) {
              acc.push(
                <div key={index} className="flex h-16 flex-col items-center justify-center">
                  {cur}
                  {array[index + 1]}
                </div>,
              )
            }
            return acc
          }, []),
      },
      {
        children: (item.records ?? [])
          .map((record: any, index: any) => {
            const modifiedAttendanceType = `${record?.timezoneTime?.split(' ')[1]} ${record?.employee?.employment?.schedule?.timezone?.title}`

            return (
              <div key={index}>
                <span className="font-semibold">{modifiedAttendanceType}</span>
              </div>
            )
          })
          .reduce((acc: any, cur: any, index: any, array: any) => {
            if (index % 2 === 0) {
              acc.push(
                <div key={index / 2} className="flex h-16 flex-col items-center justify-center">
                  {cur}
                  {array[index + 1]}
                </div>,
              )
            }
            return acc
          }, [] as JSX.Element[]),
      },
      {
        children: (item.records ?? [])
          .map((record: any, index: any) => {
            return (
              <div key={index}>
                <button
                  title="Maps"
                  className="text-primary-600 hover:text-primary-700 focus:outline-none"
                  onClick={() =>
                    handlePinClick(record.lat || 0, record.lng || 0, record.employee?.employment?.branch?.coordinate?.coordinates)
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
        children: (item.records ?? [])
          .map((record: any, index: any) => {
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

export default DetailsTable
