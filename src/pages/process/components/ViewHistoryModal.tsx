import MainModal from '@/components/Elements/MainModal'
import { processService } from '@/services'
import { Button, Card, CardBody, Spinner } from 'jobseeker-ui'
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
  applicant?: IDataTableApplicant
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
  const { Icon = AlertCircleIcon, className = 'text-warning-600' } = statusConfig[status]
  return (
    <div className={twJoin(className, 'flex justify-center gap-2')}>
      <Icon size={18} />
      <span className="text-sm font-semibold capitalize">{status.toLowerCase()}</span>
    </div>
  )
}

const ViewHistoryModal: React.FC<OptionModalProps> = ({ show, applicant, onClose }) => {
  const [aplicantDataTable, setAplicantDataTable] = useState<IDataTableApplicant>()
  const [aplicantDetail, setAplicantDetail] = useState<IApplicant | null>(null)
  const [showDetailIndex, setShowDetailIndex] = useState<number | null>(null)

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
    <MainModal className="max-w-xl py-12" show={!!show} onClose={onClose}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Candidate History</h4>
        <p className="text-center">Candidate Process History for {aplicantDataTable?.candidate?.name}</p>
      </div>

      {!aplicantDetail && (
        <div className="flex items-center justify-center py-48">
          <Spinner height={40} className="text-primary-600" />
        </div>
      )}

      {aplicantDetail && (
        <>
          <div className="pb-2">
            <h3 className="text-lg font-semibold">{aplicantDetail.vacancy?.name}</h3>
            <p className="text-xs text-gray-500">{aplicantDetail.vacancy?.rrNumber}</p>
          </div>

          <>
            <div className="p-3">
              <ol className="border-l border-dashed">
                {aplicantDetail.histories?.map((item, index) => (
                  <li key={index} className="relative mb-5 pl-6 last:mb-0">
                    <span className="absolute left-[-0.4rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-white ring-4 ring-primary-600" />
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="flex gap-3 font-semibold">{item.applyProcess}</h3>
                        <p className="mb-2 text-xs text-gray-500">{moment(item.processAt).format('D/M/Y HH:MM')}</p>
                        <Button
                          type="button"
                          size="small"
                          color="default"
                          variant="light"
                          className="text-xs"
                          onClick={() => setShowDetailIndex((v) => (v === index ? null : index))}
                        >
                          {index === showDetailIndex ? 'Hide Details' : 'Show Details'}
                        </Button>
                      </div>
                      <Status status={item.status} />
                    </div>

                    {showDetailIndex === index && (
                      <Card className="mt-4 px-2 py-4">
                        <CardBody>
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
                                {moment(item.actionAt).format('D/M/Y HH:MM')}
                              </span>
                            </div>
                          )}
                          {item.processAt && (
                            <div className="mb-3">
                              <h3 className="text-sm font-semibold">Process Date</h3>
                              <span className="flex items-center gap-1 text-xs">
                                <CalendarIcon size={16} />
                                {moment(item.processAt).format('D/M/Y HH:MM')}
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
                                href={item.file}
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
                        </CardBody>
                      </Card>
                    )}
                  </li>
                ))}
              </ol>
            </div>
          </>
        </>
      )}
    </MainModal>
  )
}

export default ViewHistoryModal
