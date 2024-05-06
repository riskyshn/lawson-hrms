import React, { useEffect, useState } from 'react'
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
import { twJoin } from 'tailwind-merge'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import HistoryItem from '@/components/Elements/UI/HistoryItem'
import { Timeline, TimelineItem } from '@/components/Elements/UI/Timeline'
import { candidateService } from '@/services'

type OptionModalProps = {
  candidate?: ICandidate
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

const ViewHistoryModal: React.FC<OptionModalProps> = ({ candidate, onClose, show }) => {
  const [candidateDataTable, setCandidateDataTable] = useState<ICandidate>()
  const [candidateDetail, setCandidateDetail] = useState<ICandidateHistories | null>(null)
  const [showDetailIndex, setShowDetailIndex] = useState<null | number>(null)

  useEffect(() => {
    const controller = new AbortController()
    const load = async (candidate: ICandidate, signal: AbortSignal) => {
      const data = await candidateService.fetchDetailCandidate(candidate?.candidateId, signal)
      setCandidateDetail(data)
    }

    if (candidate?.candidateId) {
      setCandidateDataTable(candidate)
      setCandidateDetail(null)
      load(candidate, controller.signal)
    }

    return () => {
      controller.abort()
    }
  }, [candidate])

  return (
    <Modal show={!!show}>
      <ModalHeader subTitle={`Candidate Process History for ${candidateDataTable?.name}`}>Candidate History</ModalHeader>
      <LoadingScreen show={!candidateDetail} />
      {candidateDetail && (
        <>
          {candidateDetail.history?.map((item, index) => (
            <div key={index}>
              <div className="bg-gray-100 px-6 py-3">
                <h3 className="text-lg font-semibold">{item.vacancy?.name}</h3>
                <p className="text-xs text-gray-500">{item.vacancy?.rrNumber}</p>
              </div>

              <div className="p-6">
                <Timeline>
                  {item.histories?.map((history, i) => (
                    <TimelineItem key={i}>
                      <HistoryItem
                        onDetailToggleClick={() => setShowDetailIndex((v) => (v === i ? null : i))}
                        showDetail={showDetailIndex === i}
                        status={<Status status={history.status} />}
                        subTitle={moment.utc(history.actionAt).local().format('D/M/Y HH:mm')}
                        title={history.applyProcess}
                      >
                        <div className="mb-3">
                          <h3 className="text-sm font-semibold">Attendee</h3>
                          <span className="flex items-center gap-1 text-xs">
                            <UserIcon size={16} />
                            {candidateDetail.candidate?.name}
                          </span>
                        </div>
                        {history.actionAt && (
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold">Action Scheduled</h3>
                            <span className="flex items-center gap-1 text-xs">
                              <CalendarIcon size={16} />
                              {moment.utc(history.actionAt).local().format('D/M/Y HH:mm')}
                            </span>
                          </div>
                        )}
                        {history.actionAt && (
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold">Process Date</h3>
                            <span className="flex items-center gap-1 text-xs">
                              <CalendarIcon size={16} />
                              {moment.utc(history.actionAt).local().format('D/M/Y HH:mm')}
                            </span>
                          </div>
                        )}
                        {history.notes && (
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold">Process Remarks</h3>
                            <span className="flex items-center gap-1 text-xs">{history.notes}</span>
                          </div>
                        )}
                        {history.file && (
                          <div className="mb-3">
                            <h3 className="mb-1 text-sm font-semibold">Document</h3>
                            <Button<'a'>
                              as="a"
                              className="gap-2"
                              color="primary"
                              href={history.file}
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
            </div>
          ))}
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

export default ViewHistoryModal
