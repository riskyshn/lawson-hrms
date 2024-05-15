import type { IApplicant } from '@/types'
import React, { useEffect, useState } from 'react'
import { Button, LoadingScreen, Modal, ModalFooter, ModalHeader } from 'jobseeker-ui'
import {
  AlertCircleIcon,
  CalendarIcon,
  CheckCircle2Icon,
  CircleEllipsisIcon,
  ClockIcon,
  FileInputIcon,
  LucideIcon,
  UserIcon,
  XCircleIcon,
} from 'lucide-react'
import moment from 'moment'
import { twJoin } from 'tailwind-merge'
import { HistoryItem, Timeline, TimelineItem } from '@/components'
import { processService } from '@/services'

type OptionModalProps = {
  show?: boolean
  applicantId?: string
  onClose?: () => void
}

const statusConfig: Record<string, { Icon: LucideIcon; className: string }> = {
  FAILED: { Icon: XCircleIcon, className: 'text-error-600' },
  PASSED: { Icon: CheckCircle2Icon, className: 'text-green-600' },
  PROCESS: { Icon: CircleEllipsisIcon, className: 'text-primary-600' },
  WAITING: { Icon: ClockIcon, className: 'text-gray-600' },
}

const Status: React.FC<{ status?: string }> = ({ status }) => {
  status = status?.toUpperCase() || ''
  const { Icon, className = 'text-warning-600' } = statusConfig[status] || { Icon: AlertCircleIcon }

  return status ? (
    <div className={twJoin(className, 'flex justify-center gap-2')}>
      <Icon size={18} />
      <span className="text-sm font-semibold capitalize">{status.toLowerCase().replace(/_/g, ' ')}</span>
    </div>
  ) : null
}

const ViewProcessHistoryModal: React.FC<OptionModalProps> = ({ applicantId, onClose, show }) => {
  const [showDetailIndex, setShowDetailIndex] = useState<null | number>(null)
  const [applicant, setApplicant] = useState<IApplicant | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const load = async (applicantId: string, signal: AbortSignal) => {
      const data = await processService.fetchDetailProcess(applicantId, signal)
      setApplicant(data)
    }

    if (applicantId) {
      setApplicant(null)
      load(applicantId, controller.signal)
    }
    return () => controller.abort()
  }, [applicantId])

  return (
    <Modal onClose={onClose} show={!!show}>
      <ModalHeader subTitle="Candidate Process History">Candidate History</ModalHeader>
      <LoadingScreen show={!applicant?.vacancy} />
      {!!applicant?.vacancy && (
        <>
          <div className="bg-gray-100 px-6 py-3">
            <h3 className="text-lg font-semibold">{applicant.vacancy?.name}</h3>
            <p className="text-xs text-gray-500">{applicant.vacancy?.rrNumber}</p>
          </div>

          <div className="p-6">
            <Timeline>
              {applicant.histories?.map((item, index) => (
                <TimelineItem key={index}>
                  <HistoryItem
                    onDetailToggleClick={() => setShowDetailIndex((v) => (v === index ? null : index))}
                    showDetail={showDetailIndex === index}
                    status={<Status status={item.status} />}
                    subTitle={moment.utc(item.processAt).local().format('D/M/Y HH:mm')}
                    title={item.applyProcess}
                  >
                    <div className="mb-3">
                      <h3 className="text-sm font-semibold">Attendee</h3>
                      <span className="flex items-center gap-1 text-xs">
                        <UserIcon size={16} />
                        {[applicant.candidate?.name, ...(item.attendees?.map((el) => el.name) || [])].filter((el) => !!el).join(', ')}
                      </span>
                    </div>
                    {item.actionAt && (
                      <div className="mb-3">
                        <h3 className="text-sm font-semibold">Action Scheduled</h3>
                        <span className="flex items-center gap-1 text-xs">
                          <CalendarIcon size={16} />
                          {moment.utc(item.actionAt).local().format('D/M/Y HH:mm')}
                        </span>
                      </div>
                    )}
                    {item.processAt && (
                      <div className="mb-3">
                        <h3 className="text-sm font-semibold">Process Date</h3>
                        <span className="flex items-center gap-1 text-xs">
                          <CalendarIcon size={16} />
                          {moment.utc(item.processAt).local().format('D/M/Y HH:mm')}
                        </span>
                      </div>
                    )}
                    {item.notes && (
                      <div className="mb-3">
                        <h3 className="text-sm font-semibold">Process Remarks</h3>
                        <span className="flex items-center gap-1 text-xs">{item.notes}</span>
                      </div>
                    )}
                    {item.file && (
                      <div className="mb-3">
                        <h3 className="mb-1 text-sm font-semibold">Document</h3>
                        <Button<'a'>
                          as="a"
                          className="gap-2"
                          color="primary"
                          href={item.file}
                          leftChild={<FileInputIcon size={18} />}
                          size="small"
                          target="_blank"
                          variant="default"
                        >
                          <span className="text-xs">Result Attachment</span>
                        </Button>
                      </div>
                    )}
                  </HistoryItem>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        </>
      )}

      <ModalFooter>
        <Button className="w-24" color="error" variant="light" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ViewProcessHistoryModal
