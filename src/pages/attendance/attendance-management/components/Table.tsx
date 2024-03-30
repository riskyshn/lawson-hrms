import MainTable from '@/components/Elements/MainTable'
import MapsPreviewerModal from '@/components/Modals/MapsPreviewerModal'
import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import { attendanceService } from '@/services'
import { Avatar, Button, useConfirm, useToast } from 'jobseeker-ui'
import { CheckIcon, ImageIcon, MapPinIcon, XIcon } from 'lucide-react'
import { useState } from 'react'
type PropTypes = {
  items: IAttendance[]
  loading?: boolean
  onDataChange: (data: string) => void
  isClientVisit?: boolean
}

const Table: React.FC<PropTypes> = ({ items, loading, onDataChange, isClientVisit }) => {
  const [selectedLocation, setSelectedLocation] = useState<[number, number] | null>(null)
  const previewImage = usePreviewImage()
  const confirm = useConfirm()
  const toast = useToast()

  const handlePinClick = (lat: number, lng: number) => {
    setSelectedLocation([lat, lng])
  }

  const openConfirmation = async (status: string, id?: string) => {
    let confirmed = false
    confirmed = await confirm({
      text: `Are you sure you want to ${status} this attendance?`,
      confirmBtnColor: 'primary',
      cancelBtnColor: 'error',
    })

    if (confirmed) {
      try {
        if (status === 'approved' && id) {
          await attendanceService.approvedAttendanceManagement(id)
          toast('Attendance approved successfully', { color: 'success' })
          const newData = new Date().toISOString()
          onDataChange(newData)
        } else if (status === 'rejected' && id) {
          await attendanceService.rejectedAttendanceManagement(id)
          toast('Attendance rejected successfully', { color: 'success' })
          const newData = new Date().toISOString()
          onDataChange(newData)
        }
      } catch (e: any) {
        toast(e.response?.data?.meta?.message || e.message, { color: 'error' })
      }
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
        children:
          !isClientVisit &&
          item?.records?.map((record, index) => (
            <div key={index} className="mb-2 flex gap-2">
              <Button color="success" size="small" onClick={() => openConfirmation('approved', record.oid)}>
                <CheckIcon size={16} />
              </Button>
              <Button color="error" size="small" onClick={() => openConfirmation('rejected', record.oid)}>
                <XIcon size={16} />
              </Button>
            </div>
          )),
      },
    ],
  }))

  return (
    <>
      <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
      {selectedLocation && <MapsPreviewerModal coordinates={selectedLocation} radius={100} onClose={() => setSelectedLocation(null)} />}
    </>
  )
}

export default Table
