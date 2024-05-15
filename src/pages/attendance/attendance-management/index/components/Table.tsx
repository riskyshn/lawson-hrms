import type { IEmployeeHistoryAttendance } from '@/types'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar, Button, usePreviewImage, useToast } from 'jobseeker-ui'
import { CheckIcon, ImageIcon, MapPinIcon, XIcon } from 'lucide-react'
import { MainTable, MapsPreviewerModal } from '@/components'
import { attendanceService } from '@/services'
import ConfirmationModal from '../../components/ConfirmationModal'

type PropTypes = {
  items: IEmployeeHistoryAttendance[]
  loading?: boolean
  onDataChange: (data: string) => void
}

const Table: React.FC<PropTypes> = ({ items, loading, onDataChange }) => {
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null)
  const [branchLocation, setBranchLocation] = useState<[number, number] | null>(null)
  const previewImage = usePreviewImage()
  const toast = useToast()
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedRecordId, setSelectedRecordId] = useState<null | string | undefined>(null)
  const [modalType, setModalType] = useState<string | undefined>()

  const handlePinClick = (lat: number, lng: number, latLng?: [number, number]) => {
    setSelectedLocation([lat, lng])
    setBranchLocation(latLng || null)
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
        oids: ids,
        rejectedReason: reason || '',
        status: status,
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
    { children: 'Status', className: 'text-center' },
    { children: 'Type', className: 'text-center' },
    { children: 'Time', className: 'text-center' },
    { children: 'Location', className: 'text-center' },
    { children: 'Attachment', className: 'text-center' },
    { children: 'Action', className: 'text-center' },
  ]

  const bodyItems = items.map((item) => ({
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
                          className={`${record.isInOffice ? 'text-primary-600 hover:text-primary-700' : 'text-red-600 hover:text-red-700'} focus:outline-none`}
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
        children:
          item.logType === 'absent' ? (
            '-'
          ) : item.leaveData !== null ? (
            <div>
              <button
                className="text-primary-600 hover:text-primary-700 focus:outline-none"
                onClick={() => previewImage(item.leaveData.attachment)}
                title="Image"
              >
                <ImageIcon size={15} />
              </button>
            </div>
          ) : (
            (item.attendanceData ?? [])
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
              }, [])
          ),
        className: 'text-center',
      },
      {
        children:
          item.logType === 'absent' ? (
            '-'
          ) : item.leaveData !== null ? (
            <Link
              key={item.oid}
              to={`/attendance/request-management?search=${item.employee?.name?.replace(/\s/g, '+')}&startDate=${item.leaveData.createdAt.match(/^\d{4}-\d{2}-\d{2}/)}&endDate=${item.leaveData.createdAt.match(/^\d{4}-\d{2}-\d{2}/)}`}
            >
              <Button color="primary" variant="light">
                View Details
              </Button>
            </Link>
          ) : (
            (item.attendanceData ?? []).map((record, index) => {
              if (index % 2 === 0) {
                let latestAttendanceType = null
                item.attendanceData?.slice(index, index + 2).forEach((record, recordIndex, array) => {
                  if (recordIndex === array.length - 1) {
                    latestAttendanceType = record.attendanceType
                  }
                })

                return (
                  <>
                    <div className="flex h-16 flex-col items-center justify-center" key={index}>
                      <div className={'mb-1 flex gap-2'}>
                        <Button
                          color="success"
                          disabled={
                            record.status === 'approved' ||
                            record.status === 'rejected' ||
                            latestAttendanceType === 'clock_in' ||
                            latestAttendanceType === 'overtime_in'
                          }
                          onClick={() =>
                            handleViewDetails(
                              item.attendanceData?.slice(index, index + 2).map((record) => record.oid),
                              'approved',
                            )
                          }
                          size="small"
                          style={{
                            opacity:
                              record.status === 'approved' ||
                              record.status === 'rejected' ||
                              latestAttendanceType === 'clock_in' ||
                              latestAttendanceType === 'overtime_in'
                                ? 0.5
                                : 1,
                          }}
                        >
                          <CheckIcon size={16} />
                        </Button>
                        <Button
                          color="error"
                          disabled={record.status === 'rejected'}
                          onClick={() =>
                            handleViewDetails(
                              item.attendanceData?.slice(index, index + 2).map((record) => record.oid),
                              'rejected',
                            )
                          }
                          size="small"
                          style={{ opacity: record.status === 'rejected' ? 0.5 : 1 }}
                        >
                          <XIcon size={16} />
                        </Button>
                      </div>
                    </div>
                  </>
                )
              }
              return null
            })
          ),
        className: 'text-center',
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
      {showOptionModal && (
        <ConfirmationModal
          handleAction={(reason) => {
            if (selectedRecordId) {
              openConfirmation(modalType, selectedRecordId, reason)
              setSelectedRecordId(null)
            }
          }}
          isLoading={isLoading}
          modalType={modalType}
          onClose={() => setShowOptionModal(false)}
          show={showOptionModal}
        />
      )}
    </>
  )
}

export default Table
