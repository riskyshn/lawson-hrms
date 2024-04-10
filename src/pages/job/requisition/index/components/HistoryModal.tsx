import HistoryItem from '@/components/Elements/UI/HistoryItem'
import { Timeline, TimelineItem } from '@/components/Elements/UI/Timeline'
import { Button, Modal, ModalFooter, ModalHeader } from 'jobseeker-ui'
import { CheckCircle2Icon, NotepadTextIcon, TimerIcon, UserIcon, XCircleIcon } from 'lucide-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

type PropTypes = {
  item: IVacancy | null
  onClose?: () => void
}

const renderStatus = (status?: number) => {
  if (status === 1) {
    return (
      <div className="flex items-center gap-2">
        <CheckCircle2Icon className="text-green-600" />
        <span className="text-sm font-semibold text-green-600">APPROVED</span>
      </div>
    )
  }
  return (
    <div className="flex items-center gap-2">
      <XCircleIcon className="text-red-600" />
      <span className="text-sm font-semibold text-red-600">FAILED</span>
    </div>
  )
}

const HistoryModal: React.FC<PropTypes> = ({ item, onClose }) => {
  const [data, setData] = useState<IVacancy | null>(null)
  const [showDetailIndex, setShowDetailIndex] = useState<number | null>(null)

  useEffect(() => {
    if (item) setData(item)
  }, [item])

  return (
    <Modal show={!!item} onClose={onClose}>
      <ModalHeader subTitle={`Approval History for ${data?.vacancyName} (${data?.rrNumber})`}>Approval History</ModalHeader>
      <div className="p-6">
        <Timeline>
          {data?.approvals?.users?.map((item, index) => (
            <TimelineItem key={index}>
              <HistoryItem
                title={`Step ${index + 1}`}
                subTitle={
                  <>
                    Sent Date: {item.createdAt ? moment(item.createdAt).format('DD/MM/YYYY') : '-'} | Approval Date:{' '}
                    {item.updatedAt ? moment(item.updatedAt).format('DD/MM/YYYY') : '-'}
                  </>
                }
                status={<div className="flex items-center gap-2">{renderStatus(item.flag)}</div>}
                showDetail={showDetailIndex === index}
                onDetailToggleClick={() => setShowDetailIndex((v) => (v === index ? null : index))}
              >
                <div className="mb-3">
                  <h3 className="text-sm font-semibold">Aprovee:</h3>
                  <span className="flex items-center gap-1 text-xs">
                    <UserIcon size={16} />
                    {item.name}
                  </span>
                </div>

                <div className="mb-3 flex gap-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">Request Sent:</h3>
                    <span className="flex items-center gap-1 text-xs">
                      <TimerIcon size={16} />
                      {item.createdAt ? moment(item.createdAt).fromNow() : '-'}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold">Action Date:</h3>
                    <span className="flex items-center gap-1 text-xs">
                      <TimerIcon size={16} />
                      {item.updatedAt ? moment(item.updatedAt).fromNow() : '-'}
                    </span>
                  </div>
                </div>

                {!!item.notes && (
                  <div className="mb-3">
                    <h3 className="text-sm font-semibold">Request Remarks:</h3>
                    <span className="flex items-center gap-1 text-xs">
                      <NotepadTextIcon size={16} />
                      {item.notes}
                    </span>
                  </div>
                )}
              </HistoryItem>
            </TimelineItem>
          ))}
        </Timeline>
      </div>
      <ModalFooter>
        <Button variant="light" color="error" className="w-24" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default HistoryModal
