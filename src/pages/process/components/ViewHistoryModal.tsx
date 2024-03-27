import MainModal from '@/components/Elements/MainModal'
import { processService } from '@/services'
import { Button, Card, CardBody, Spinner } from 'jobseeker-ui'
import { CalendarIcon, CheckCircle2Icon, FileInputIcon, UserIcon, XCircleIcon } from 'lucide-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'

type OptionModalProps = {
  show?: boolean
  applicant?: IDataTableApplicant
  onClose?: () => void
}

const Status: React.FC<{ status?: string }> = ({ status }) => {
  if (status === 'PASSED') {
    return (
      <div className="flex gap-2">
        <CheckCircle2Icon className="text-green-600" />
        <span className="text-sm font-semibold text-green-600">Passed</span>
      </div>
    )
  } else if (status === 'FAILED') {
    return (
      <div className="flex gap-2">
        <XCircleIcon className="text-red-600" />
        <span className="text-sm font-semibold text-red-600">Failed</span>
      </div>
    )
  }
  return (
    <div className="flex gap-2">
      <XCircleIcon className="text-red-600" />
      <span className="text-sm font-semibold text-red-600">{status}</span>
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
                    <div className="flex justify-between">
                      <div>
                        <h3 className="flex gap-3 font-semibold">{item.applyProcess}</h3>
                        <p className="mb-2 text-xs text-gray-500">{moment(item.actionAt).format('Y/M/D')}</p>
                        <Button
                          type="button"
                          size="small"
                          color="default"
                          variant="light"
                          className="text-xs"
                          onClick={() => setShowDetailIndex(index)}
                        >
                          Show Details
                        </Button>
                      </div>
                      <div className="flex gap-2">{<Status status={item.status} />}</div>
                    </div>

                    {showDetailIndex === index && (
                      <Card className="mt-4 px-2 py-4">
                        <CardBody>
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold">Attendee</h3>
                            <span className="flex items-center gap-1 text-xs">
                              <UserIcon size={16} />
                              dummy
                            </span>
                          </div>
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold">Action Scheduled</h3>
                            <span className="flex items-center gap-1 text-xs">
                              <CalendarIcon size={16} />
                              dummy
                            </span>
                          </div>
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold">Process Date</h3>
                            <span className="flex items-center gap-1 text-xs">
                              <CalendarIcon size={16} />
                              dummy
                            </span>
                          </div>
                          <div className="mb-3">
                            <h3 className="text-sm font-semibold">Process Remarks</h3>
                            <span className="flex items-center gap-1 text-xs">{item.notes}</span>
                          </div>
                          {item.file && (
                            <>
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
                            </>
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
