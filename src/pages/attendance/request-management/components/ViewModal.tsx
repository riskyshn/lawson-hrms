import { usePreviewImage } from '@/contexts/ImagePreviewerContext'
import { Badge, CardBody, CardFooter, Color, genStyles, Modal, ModalHeader, Spinner } from 'jobseeker-ui'
import { ImageIcon } from 'lucide-react'
import React from 'react'

type PropTypes = {
  show: boolean
  onClose: () => void
  items?: ILeave
}

const ViewModal: React.FC<PropTypes> = ({ show, onClose, items }) => {
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
                        <Badge color={statusColors(items.status?.toLowerCase())} size="small" className="font-semibold capitalize">
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
                        title="Image"
                        className={`text-${items.attachment ? 'primary' : 'gray'}-600 hover:text-${items.attachment ? 'primary' : 'gray'}-700 focus:outline-none`}
                        onClick={() => previewImage(items.attachment)}
                        aria-label="View Image"
                        disabled={!items.attachment}
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
  rejected: 'error',
  process: 'primary',
  waiting: 'default',
  default: 'default',
})

export default ViewModal
