import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import { Badge, CardBody, CardFooter, Color, Modal, ModalHeader, Spinner, genStyles } from 'jobseeker-ui'
import { ImageIcon } from 'lucide-react'
import React from 'react'

type PropTypes = {
  items?: ILeave
  onClose: () => void
  show: boolean
}

const ViewModal: React.FC<PropTypes> = ({ items, onClose, show }) => {
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

  return (
    <Modal show={!!show}>
      <ModalHeader className="font-semibold" onClose={() => onClose()}>
        Select Employee(s)
      </ModalHeader>
      <CardBody className="grid gap-px bg-gray-200 p-0">
        <div className="flex flex-col bg-white">
          {!items && (
            <div className="flex flex-1 items-center justify-center py-10">
              <Spinner className="h-10 w-10 text-primary-600" />
            </div>
          )}
          {items && (
            <>
              <table className="table w-full text-sm">
                <tbody>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Employee</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">{items.employee?.name || '-'}</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Request Date</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">{formatDateRequestDate(items.createdAt) || '-'}</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Start Date</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">{formatDate(items.startDate) || '-'}</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">End Date</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">{formatDate(items.endDate) || '-'}</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Type</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">
                      {items.leaveType?.title
                        ?.replace(/_/g, ' ')
                        .toLowerCase()
                        .replace(/(?:^|\s)\S/g, function (a) {
                          return a.toUpperCase()
                        }) || '-'}
                    </td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Department</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">{items.employee?.employment?.department?.name || '-'}</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Branch</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">{items.employee?.employment?.branch?.name || '-'}</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Notes</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">{items.note || '-'}</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Status</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">
                      {items.status ? (
                        <Badge className="font-semibold capitalize" color={statusColors(items.status?.toLowerCase())} size="small">
                          {items.status?.toLowerCase()}
                        </Badge>
                      ) : (
                        '-'
                      )}
                    </td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap p-3 text-left">Attachment</th>
                    <td className="p-3">:</td>
                    <td className="w-full p-3">
                      <button
                        aria-label="View Image"
                        className={`text-${items.attachment ? 'primary' : 'gray'}-600 hover:text-${items.attachment ? 'primary' : 'gray'}-700 focus:outline-none`}
                        disabled={!items.attachment}
                        onClick={() => previewImage(items.attachment)}
                        title="Image"
                      >
                        <ImageIcon size={18} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          )}
        </div>
      </CardBody>
      <CardFooter></CardFooter>
    </Modal>
  )
}

const statusColors = genStyles<string, Color>({
  approved: 'success',
  default: 'default',
  process: 'primary',
  rejected: 'error',
  waiting: 'default',
})

export default ViewModal
