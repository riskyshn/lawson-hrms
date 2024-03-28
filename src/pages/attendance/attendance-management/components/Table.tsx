import MainTable from '@/components/Elements/MainTable'
import { Avatar, Button } from 'jobseeker-ui'
import { useState } from 'react'
import { CheckIcon, ImageIcon, MapPinIcon, XIcon } from 'lucide-react'
import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import MapsPreviewer from '@/components/Elements/MapsPreviewer'
import ConfirmationModal from './ConfirmationModal'
type PropTypes = {
  items: IAttendance[]
  loading?: boolean
  onDataChange: (data: string) => void
  isClientVisit?: boolean
}

const Table: React.FC<PropTypes> = ({ items, loading, onDataChange, isClientVisit }) => {
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null)
  const previewImage = usePreviewImage()
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handlePinClick = (lat: number, lng: number) => {
    setSelectedLocation([lat, lng])
  }

  const openConfirmation = () => {
    setShowConfirmation(true)
  }

  const closeConfirmation = () => {
    setShowConfirmation(false)
  }

  const handleConfirmAction = () => {
    closeConfirmation()
    const newData = new Date().toISOString()
    onDataChange(newData)
  }

  const headerItems = [
    { children: 'Employee', className: 'text-left' },
    { children: 'Branch', className: 'text-left' },
    { children: 'Type', className: 'text-left' },
    { children: 'Time', className: 'text-left' },
    { children: 'Location', className: 'text-center' },
    { children: 'In Office', className: 'text-center' },
  ]

  if (!isClientVisit) {
    headerItems.push({ children: 'Action', className: 'w-24' })
  }

  const bodyItems = items.map((item) => ({
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
              <span className="text-xs text-gray-500">{item.employeeId}</span>
            </div>
          </div>
        ),
      },
      { children: item.records?.[0]?.employee?.employment?.branch?.name },
      {
        children: item.records?.map((record, index) => (
          <div key={index} className={index > 0 && index % 2 === 0 ? 'mb-4' : 'mb-1'}>
            <span className="block font-semibold">{record.attendanceType}</span>
          </div>
        )),
      },
      {
        children: item.records?.map((record, index) => (
          <div key={index} className={index > 0 && index % 2 === 0 ? 'mb-4' : 'mb-1'}>
            <div>
              <span className="block font-semibold">
                {record?.timezoneTime?.split(' ')[1]} {record?.employee?.employment?.schedule?.timezone?.title}
              </span>
            </div>
          </div>
        )),
      },
      {
        children: item.records?.map((record, index) => (
          <div key={index} className={index > 0 && index % 2 === 0 ? 'mb-4' : 'mb-1'}>
            <span className="flex items-center justify-center gap-2">
              <button
                title="Maps"
                className="text-primary-600 hover:text-primary-700 focus:outline-none"
                onClick={() => handlePinClick(record.lng || 0, record.lat || 0)}
              >
                <MapPinIcon size={18} />
              </button>
            </span>
          </div>
        )),
        className: 'text-center',
      },
      {
        children: item.records?.map((record, index) => (
          <div key={index} className={index > 0 && index % 2 === 0 ? 'mb-4' : 'mb-1'}>
            <span className="flex items-center justify-center gap-2">
              <button
                title="Image"
                className="text-primary-600 hover:text-primary-700 focus:outline-none"
                onClick={() => previewImage(record.photo)}
              >
                <ImageIcon size={18} />
              </button>
            </span>
          </div>
        )),
        className: 'text-center',
      },
      {
        children: !isClientVisit && (
          <div className="flex gap-2">
            <Button color="success" size="small" onClick={openConfirmation}>
              <CheckIcon size={16} />
            </Button>
            <Button color="error" size="small" onClick={openConfirmation}>
              <XIcon size={16} />
            </Button>
          </div>
        ),
      },
    ],
  }))

  return (
    <>
      <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
      {selectedLocation && <MapsPreviewer coordinates={selectedLocation} radius={100} onClose={() => setSelectedLocation(null)} />}
      <ConfirmationModal show={showConfirmation} onClose={closeConfirmation} onConfirm={handleConfirmAction} />
    </>
  )
}

export default Table
