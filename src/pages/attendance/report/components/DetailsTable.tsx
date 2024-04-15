import MapsPreviewerModal from '@/components/Elements/Modals/MapsPreviewerModal'
import MainTable from '@/components/Elements/Tables/MainTable'
import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import { ImageIcon, MapPinIcon } from 'lucide-react'
import { useState } from 'react'

type PropTypes = {
  items: any
  loading?: boolean
  onDataChange?: (data: string) => void
}

const DetailsTable: React.FC<PropTypes> = ({ items, loading }) => {
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null)

  const handlePinClick = (lat: number, lng: number) => {
    setSelectedLocation([lng, lat])
  }

  const previewImage = usePreviewImage()

  const headerItems = [
    { children: 'Date', className: 'text-left' },
    { children: 'Branch', className: 'text-left' },
    { children: 'Scheduled Check In', className: 'text-left' },
    { children: 'Scheduled Check Out', className: 'text-left' },
    { children: 'Clock In', className: 'text-left' },
    { children: 'Clock Out', className: 'text-left' },
    { children: 'Client Visit In', className: 'text-left' },
    { children: 'Client Visit Out', className: 'text-left' },
    { children: 'Overtime In', className: 'text-left' },
    { children: 'Overtime Out', className: 'text-left' },
    { children: 'Total Overtime', className: 'text-left' },
    { children: 'Location', className: 'text-left' },
    { children: 'Attachment', className: 'text-left' },
  ]

  const bodyItems = items.map((item: any) => ({
    items: [
      { children: item.employee?.attendance?.date, className: 'text-center' },
      { children: item.employee?.attendance?.branch, className: 'text-center' },
      { children: item.employee?.attendance?.schedule?.checkin, className: 'text-center' },
      { children: item.employee?.attendance?.schedule?.checkout, className: 'text-center' },
      { children: item.employee?.attendance?.clockin, className: 'text-center' },
      { children: item.employee?.attendance?.clockout, className: 'text-center' },
      { children: item.employee?.attendance?.clientvisitin, className: 'text-center' },
      { children: item.employee?.attendance?.clientvisitout, className: 'text-center' },
      { children: item.employee?.attendance?.overtimein, className: 'text-center' },
      { children: item.employee?.attendance?.overtimeout, className: 'text-center' },
      { children: item.employee?.attendance?.totalovertime, className: 'text-center' },
      {
        children: (
          <button
            title="View on Maps"
            className="text-primary-600 hover:text-primary-700 focus:outline-none"
            onClick={() => handlePinClick(item.employee?.attendance?.location.lng || 0, item.employee?.attendance?.location.lat || 0)}
          >
            <MapPinIcon size={15} />
          </button>
        ),
        className: 'text-center',
      },
      {
        children: (
          <span className="mb-1 flex items-center justify-center gap-2">
            <button
              title="Image"
              className={`text-${item.attachment ? 'primary' : 'gray'}-600 hover:text-${item.employee?.attendance?.attachment ? 'primary' : 'gray'}-700 focus:outline-none`}
              onClick={() => previewImage(item.employee?.attendance?.attachment)}
              aria-label="View Image"
              disabled={!item.employee?.attendance?.attachment}
            >
              <ImageIcon size={18} />
            </button>
          </span>
        ),
        className: 'text-center',
      },
    ],
  }))

  return (
    <>
      <div className="overflow-x-auto">
        <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
      </div>
      {selectedLocation && <MapsPreviewerModal coordinates={selectedLocation} radius={100} onClose={() => setSelectedLocation(null)} />}
    </>
  )
}

export default DetailsTable
