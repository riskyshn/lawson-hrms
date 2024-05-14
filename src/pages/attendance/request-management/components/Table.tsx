import type { ILeave } from '@/types'
import { Avatar, Badge, Color, variants } from '@jshrms/ui'
import { ImageIcon } from 'lucide-react'
import MainTable from '@/components/Elements/Tables/MainTable'
import { usePreviewImage } from '@/contexts/MediaPreviewerContext'
import ActionMenu from './ActionMenu'

type PropTypes = {
  items: ILeave[]
  loading?: boolean
  onDataChange: (data: string) => void
}

const Table: React.FC<PropTypes> = ({ items, loading, onDataChange }) => {
  const previewImage = usePreviewImage()
  const formatDateRequestDate = (dateString?: string): string => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-GB')
  }

  const formatDate = (dateString?: string): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`
  }

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

  const bodyItems = items.map((item) => {
    const filteredOptions =
      item.status?.toLowerCase() === 'approved' || item.status?.toLowerCase() === 'rejected' ? ['View Details'] : options

    return {
      items: [
        {
          children: (
            <div className="flex gap-3 whitespace-nowrap">
              <div>
                <Avatar className="static rounded-lg bg-primary-100 text-primary-700" name={item.employee?.name || '-'} size={38} />
              </div>
              <div>
                <span className="block font-semibold">{item.employee?.name}</span>
                <span className="text-xs text-gray-500">{item.employee?.employeeCode}</span>
              </div>
            </div>
          ),
        },
        { children: formatDateRequestDate(item.createdAt) },
        { children: formatDate(item.startDate) },
        { children: formatDate(item.endDate) },
        {
          children: (
            <div className="mb-1">
              <span className="block font-semibold">
                {item.leaveType?.title
                  ?.replace(/_/g, ' ')
                  .toLowerCase()
                  .replace(/(?:^|\s)\S/g, function (a) {
                    return a.toUpperCase()
                  })}
              </span>
            </div>
          ),
        },
        { children: item.employee?.employment?.department?.name, className: 'text-center' },
        { children: item.employee?.employment?.branch?.name, className: 'text-center' },
        { children: item.note, className: 'whitespace-normal' },
        {
          children: item.status ? (
            <Badge className="font-semibold capitalize" color={statusColors(item.status?.toLowerCase())} size="small">
              {item.status?.toLowerCase()}
            </Badge>
          ) : (
            '-'
          ),
          className: 'text-center',
        },
        {
          children: (
            <span className="mb-1 flex items-center justify-center gap-2">
              <button
                aria-label="View Image"
                className={`text-${item.attachment ? 'primary' : 'gray'}-600 hover:text-${item.attachment ? 'primary' : 'gray'}-700 focus:outline-none`}
                disabled={!item.attachment}
                onClick={() => previewImage(item.attachment)}
                title="Image"
              >
                <ImageIcon size={18} />
              </button>
            </span>
          ),
          className: 'text-center',
        },
        { children: <ActionMenu items={item} onApplyVacancy={onDataChange} options={filteredOptions} /> },
      ],
    }
  })

  return <MainTable bodyItems={bodyItems} headerItems={headerItems} loading={loading} />
}

const statusColors = variants<string, Color>({
  approved: 'success',
  default: 'default',
  process: 'primary',
  rejected: 'error',
  waiting: 'default',
})

export default Table
