import MainTable from '@/components/Elements/MainTable'
import MapsPreviewerModal from '@/components/Modules/Process/MapsPreviewerModal'
import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import { attendanceService } from '@/services'
import { Avatar, Button, useConfirm, useToast } from 'jobseeker-ui'
import { CheckIcon, ImageIcon, MapPinIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
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
  const toast = useToast()
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRecordId, setSelectedRecordId] = useState<string | undefined | null>(null)

  const handlePinClick = (lat: number, lng: number) => {
    setSelectedLocation([lat, lng])
  }

  const handleViewDetails = (ids?: any) => {
    setSelectedRecordId(ids)
    setShowOptionModal(true)
  }

  const openConfirmation = async (status: string, ids?: any, reason?: string) => {
    try {
      setIsLoading(true)
      const payload = {
        status: status,
        oids: ids,
        rejectedReason: reason,
      }
      if (status === 'approved' && ids) {
        await attendanceService.updateAttendance(payload)
        toast('Attendance approved successfully', { color: 'success' })
        const newData = new Date().toISOString()
        onDataChange(newData)
      } else if (status === 'rejected' && ids) {
        await attendanceService.updateAttendance(payload)
        toast('Attendance rejected successfully', { color: 'success' })
        const newData = new Date().toISOString()
        onDataChange(newData)
      }
      setShowOptionModal(false)
      setIsLoading(false)
    } catch (e: any) {
      toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
    }
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
        children: item.records?.map((record, index) => {
          const modifiedAttendanceType = record?.attendanceType
            ?.replace(/_/g, ' ')
            .toLowerCase()
            .replace(/(?:^|\s)\S/g, function (a) {
              return a.toUpperCase()
            })
          return (
            <div key={index} className={index > 0 && index % 2 === 0 ? 'mb-4' : 'mb-1'}>
              <span className="block font-semibold">{modifiedAttendanceType}</span>
            </div>
          )
        }),
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
        children: !isClientVisit && item?.records && item.records.length > 0 && (
          <div className="mb-2 flex gap-2">
            <Button
              disabled={item.records[0].status === 'approved' || item.records[0].attendanceType === 'clock_in'}
              color="success"
              style={{ opacity: item.records[0].status === 'approved' ? 0.5 : 1 }}
              size="small"
              onClick={() =>
                openConfirmation(
                  'approved',
                  item?.records?.map((record) => record.oid),
                )
              }
            >
              <CheckIcon size={16} />
            </Button>
            <Button
              disabled={item.records[0].status === 'rejected'}
              color="error"
              style={{ opacity: item.records[0].status === 'rejected' ? 0.5 : 1 }}
              size="small"
              onClick={() => handleViewDetails(item?.records?.map((record) => record.oid))}
            >
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
      {selectedLocation && <MapsPreviewerModal coordinates={selectedLocation} radius={100} onClose={() => setSelectedLocation(null)} />}
      {showOptionModal && (
        <ConfirmationModal
          show={showOptionModal}
          onClose={() => setShowOptionModal(false)}
          isLoading={isLoading}
          handleAction={(reason) => {
            if (selectedRecordId) {
              openConfirmation('rejected', selectedRecordId, reason)
              setSelectedRecordId(null)
            }
          }}
        />
      )}
    </>
  )
}

export default Table
