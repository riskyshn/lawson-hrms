import MainTable from '@/components/Elements/MainTable'
import { Avatar } from 'jobseeker-ui'
import { ImageIcon } from 'lucide-react'
import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import ActionMenu from './ActionMenu'

type PropTypes = {
  items: ILeave[]
  loading?: boolean
  onDataChange: (data: string) => void
}

const Table: React.FC<PropTypes> = ({ items, loading, onDataChange }) => {
  const previewImage = usePreviewImage()

  const options = ['View Details', 'Approve', 'Reject']

  const headerItems = [
    { children: 'Employee', className: 'text-left' },
    { children: 'Request Date', className: 'text-left' },
    { children: 'Start Date', className: 'text-left' },
    { children: 'End Date', className: 'text-left' },
    { children: 'Type', className: 'text-left' },
    { children: 'Department', className: 'text-center' },
    { children: 'Branch', className: 'text-center' },
    { children: 'Notes', className: 'text-center' },
    { children: 'Status', className: 'text-center' },
    { children: 'Attachment', className: 'text-center' },
    { children: 'Action', className: 'text-center' },
  ]

  const bodyItems = items.map((item) => ({
    items: [
      {
        children: (
          <div className="flex gap-3 whitespace-nowrap">
            <div>
              <Avatar name={item.employee?.name || '-'} size={38} className="static rounded-lg bg-primary-100 text-primary-700" />
            </div>
            <div>
              <span className="block font-semibold">{item.employee?.name}</span>
              <span className="text-xs text-gray-500">{item.employee?.employeeCode}</span>
            </div>
          </div>
        ),
      },
      { children: item.createdAt },
      { children: item.startDate },
      { children: item.endDate },
      { children: item.leaveType?.title },
      { children: item.employee?.employment?.position?.department?.name },
      { children: item.employee?.employment?.branch?.name },
      { children: item.note },
      { children: item.status },
      {
        children: (
          <span className="mb-1 flex items-center justify-center gap-2">
            <button
              title="Image"
              className={`text-${item.attachment ? 'primary' : 'gray'}-600 hover:text-${item.attachment ? 'primary' : 'gray'}-700 focus:outline-none`}
              onClick={() => previewImage(item.attachment)}
              aria-label="View Image"
              disabled={!item.attachment}
            >
              <ImageIcon size={18} />
            </button>
          </span>
        ),
        className: 'text-center',
      },

      { children: <ActionMenu options={options} items={item} onApplyVacancy={onDataChange} /> },
    ],
  }))

  return <MainTable headerItems={headerItems} bodyItems={bodyItems} loading={loading} />
}

export default Table
