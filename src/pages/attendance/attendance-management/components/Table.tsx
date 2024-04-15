import MainTable from '@/components/Elements/Tables/MainTable'
import MapsPreviewerModal from '@/components/Elements/Modals/MapsPreviewerModal'
import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import { attendanceService } from '@/services'
import { Avatar, Button, useToast } from 'jobseeker-ui'
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
  const [modalType, setModalType] = useState<string | undefined>()

  const handlePinClick = (lat: number, lng: number) => {
    setSelectedLocation([lat, lng])
  }

  const handleViewDetails = (ids?: any, type?: string) => {
    setModalType(type)
    setSelectedRecordId(ids)
    setShowOptionModal(true)
  }

  const openConfirmation = async (status?: string, ids?: any, reason?: string) => {
    try {
      setIsLoading(true)
      const payload = {
        status: status,
        oids: ids,
        rejectedReason: reason || '',
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
    { children: 'Type', className: 'text-center' },
    { children: 'Time', className: 'text-center' },
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
          .map((record, index) => {
            const modifiedAttendanceType = `${record?.timezoneTime?.split(' ')[1]} ${record?.employee?.employment?.schedule?.timezone?.title}`

            return (
              <div key={index}>
                <span className="font-semibold">{modifiedAttendanceType}</span>
              </div>
            )
          })
          .reduce((acc, cur, index, array) => {
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
          .map((record, index) => {
            return (
              <div key={index}>
                <button
                  title="Maps"
                  className="text-primary-600 hover:text-primary-700 focus:outline-none"
                  onClick={() => handlePinClick(record.lng || 0, record.lat || 0)}
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
          !isClientVisit &&
          item?.records &&
          item.records.length > 0 &&
          item.records?.map((record, index) => {
            if (index % 2 === 0) {
              let latestAttendanceType = null
              item.records?.slice(index, index + 2).forEach((record, recordIndex, array) => {
                if (recordIndex === array.length - 1) {
                  latestAttendanceType = record.attendanceType
                }
              })

              return (
                <>
                  <div className="flex h-16 flex-col items-center justify-center" key={index}>
                    <div className={'mb-1 flex gap-2'}>
                      <Button
                        disabled={
                          record.status === 'approved' ||
                          record.status === 'rejected' ||
                          latestAttendanceType === 'clock_in' ||
                          latestAttendanceType === 'overtime_in'
                        }
                        color="success"
                        style={{
                          opacity:
                            record.status === 'approved' ||
                            record.status === 'rejected' ||
                            latestAttendanceType === 'clock_in' ||
                            latestAttendanceType === 'overtime_in'
                              ? 0.5
                              : 1,
                        }}
                        size="small"
                        onClick={() =>
                          handleViewDetails(
                            item.records?.slice(index, index + 2).map((record) => record.oid),
                            'approved',
                          )
                        }
                      >
                        <CheckIcon size={16} />
                      </Button>
                      <Button
                        disabled={record.status === 'rejected' || record.status === 'approved'}
                        color="error"
                        style={{ opacity: record.status === 'rejected' || record.status === 'approved' ? 0.5 : 1 }}
                        size="small"
                        onClick={() =>
                          handleViewDetails(
                            item.records?.slice(index, index + 2).map((record) => record.oid),
                            'rejected',
                          )
                        }
                      >
                        <XIcon size={16} />
                      </Button>
                    </div>
                  </div>
                </>
              )
            }
            return null
          }),
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
              openConfirmation(modalType, selectedRecordId, reason)
              setSelectedRecordId(null)
            }
          }}
          modalType={modalType}
        />
      )}
    </>
  )
}

export default Table
