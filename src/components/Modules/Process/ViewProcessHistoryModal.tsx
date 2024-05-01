import { processService } from '@/services'
import { Button, Modal, ModalFooter, ModalHeader } from 'jobseeker-ui'
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
import React, { useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'

import LoadingScreen from '../../Elements/Layout/LoadingScreen'
import HistoryItem from '../../Elements/UI/HistoryItem'
import { Timeline, TimelineItem } from '../../Elements/UI/Timeline'

type OptionModalProps = {
  applicant?: IDataTableApplicant
  onClose?: () => void
  show?: boolean
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

const ViewProcessHistoryModal: React.FC<OptionModalProps> = ({ applicant, onClose, show }) => {
  const [aplicantDataTable, setAplicantDataTable] = useState<IDataTableApplicant>()
  const [aplicantDetail, setAplicantDetail] = useState<IApplicant | null>(null)
  const [showDetailIndex, setShowDetailIndex] = useState<null | number>(null)

  useEffect(() => {
    const controller = new AbortController()
    const load = async (applicant: IDataTableApplicant, signal: AbortSignal) => {
      const data = await processService.fetchDetailProcess(applicant.oid, signal)
      setAplicantDetail({ ...applicant, ...data })
    }

    if (applicant?.oid) {
      setAplicantDataTable(applicant)
      setAplicantDetail(null)
      load(applicant, controller.signal)
    }

    return () => {
      controller.abort()
    }
  }, [applicant])

  return (
    <Modal onClose={onClose} show={!!show}>
      <ModalHeader subTitle={`Candidate Process History for ${aplicantDataTable?.candidate?.name}`}>Candidate History</ModalHeader>
      <LoadingScreen show={!aplicantDetail} />

      {aplicantDetail && (
        <>
          <div className="bg-gray-100 px-6 py-3">
            <h3 className="text-lg font-semibold">{aplicantDetail.vacancy?.name}</h3>
            <p className="text-xs text-gray-500">{aplicantDetail.vacancy?.rrNumber}</p>
          </div>

          <div className="p-6">
            <Timeline>
              {aplicantDetail.histories?.map((item, index) => (
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
                        {aplicantDetail.candidate?.name}
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
        <Button className="w-24" color="error" onClick={onClose} variant="light">
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ViewProcessHistoryModal
