import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import HistoryItem from '@/components/Elements/UI/HistoryItem'
import { Timeline, TimelineItem } from '@/components/Elements/UI/Timeline'
import { candidateService } from '@/services'
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

type OptionModalProps = {
  show?: boolean
  candidate?: ICandidate
  onClose?: () => void
}

const statusConfig: Record<string, { Icon: LucideIcon; className: string }> = {
  PASSED: { Icon: CheckCircle2Icon, className: 'text-green-600' },
  FAILED: { Icon: XCircleIcon, className: 'text-error-600' },
  WAITING: { Icon: ClockIcon, className: 'text-gray-600' },
  PROCESS: { Icon: CircleEllipsisIcon, className: 'text-primary-600' },
}

const Status: React.FC<{ status?: string }> = ({ status }) => {
  status = status?.toUpperCase() || 'UNKNOWN'
  const { Icon = AlertCircleIcon, className = 'text-warning-600' } = statusConfig[status] || {}
  return (
    <div className={twJoin(className, 'flex justify-center gap-2')}>
      <Icon size={18} />
      <span className="text-sm font-semibold capitalize">{status.toLowerCase().replace(/_/g, ' ')}</span>
    </div>
  )
}

const ViewHistoryModal: React.FC<OptionModalProps> = ({ show, candidate, onClose }) => {
  const [candidateDataTable, setCandidateDataTable] = useState<ICandidate>()
  const [candidateDetail, setCandidateDetail] = useState<ICandidateHistories | null>(null)
  const [showDetailIndex, setShowDetailIndex] = useState<number | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const load = async (candidate: ICandidate, signal: AbortSignal) => {
      const data = await candidateService.fetchDetailCandidate(candidate?.id, signal)
      setCandidateDetail(data)
    }

    if (candidate?.id) {
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
                        title={history.applyProcess}
                        subTitle={moment(history.actionAt).format('D/M/Y HH:mm')}
                        status={<Status status={history.status} />}
                        showDetail={showDetailIndex === i}
                        onDetailToggleClick={() => setShowDetailIndex((v) => (v === i ? null : i))}
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
                              {moment(history.actionAt).format('D/M/Y HH:mm')}
                            </span>
                          </div>
                        )}
                        {history.actionAt && (
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold">Process Date</h3>
                            <span className="flex items-center gap-1 text-xs">
                              <CalendarIcon size={16} />
                              {moment(history.actionAt).format('D/M/Y HH:mm')}
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
                              href={history.file}
                              target="_blank"
                              size="small"
                              color="primary"
                              className="gap-2"
                              variant="default"
                              leftChild={<FileInputIcon size={18} />}
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
        <Button variant="light" color="error" className="w-24" onClick={onClose}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ViewHistoryModal
