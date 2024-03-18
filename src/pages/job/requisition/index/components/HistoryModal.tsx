import MainModal from '@/components/Elements/MainModal'
import { Button, Card, CardBody } from 'jobseeker-ui'
import { CheckCircle2Icon, NotepadTextIcon, TimerIcon, UserIcon, XCircleIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'

type PropTypes = {
  vacancy: IVacancy | null
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

const HistoryDetail: React.FC<{ id: string; index: number; seq?: number; flag?: number; notes?: string }> = ({
  id,
  index,
  flag,
  notes,
}) => {
  const [show, setShow] = useState(false)

  return (
    <li className="relative mb-5 pl-6 last:mb-0">
      <span className="absolute left-[-0.4rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-white ring-4 ring-primary-600" />
      <div className="flex items-center justify-between">
        <div>
          <h3 className="flex items-center gap-3 font-semibold">Step {index + 1}</h3>
          <p className="mb-2 text-xs text-gray-500">Sent Date: dd/mm/yyyy | Approval Date: dd/mm/yyyy</p>
          <Button type="button" size="small" color="default" variant="light" className="text-xs" onClick={() => setShow(true)}>
            Show Details
          </Button>
        </div>
        <div className="flex items-center gap-2">{renderStatus(flag)}</div>
      </div>

      {show && (
        <Card className="mt-4 px-2 py-4">
          <CardBody>
            <div className="mb-3">
              <h3 className="text-sm font-semibold">Aprovee:</h3>
              <span className="flex items-center gap-1 text-xs">
                <UserIcon size={16} />
                {id}
              </span>
            </div>

            <div className="mb-3 flex gap-2">
              <div className="flex-1">
                <h3 className="text-sm font-semibold">Request Sent:</h3>
                <span className="flex items-center gap-1 text-xs">
                  <TimerIcon size={16} />
                  {id}
                </span>
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold">Action Date:</h3>
                <span className="flex items-center gap-1 text-xs">
                  <TimerIcon size={16} />
                  {id}
                </span>
              </div>
            </div>

            <div className="mb-3">
              <h3 className="text-sm font-semibold">Request Remarks:</h3>
              <span className="flex items-center gap-1 text-xs">
                <NotepadTextIcon size={16} />
                {notes}
              </span>
            </div>
          </CardBody>
        </Card>
      )}
    </li>
  )
}

const HistoryModal: React.FC<PropTypes> = ({ vacancy, onClose }) => {
  const [data, setData] = useState<IVacancy | null>(null)
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if (vacancy) {
      setData(vacancy)
      setIsShow(true)
    }
  }, [vacancy])

  const handleClose = () => {
    onClose?.()
    setIsShow(false)
  }

  return (
    <MainModal show={isShow} onClose={handleClose}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Approval History</h4>
        <p className="text-center">
          Approval History for <span className="font-semibold">Sales Promotion</span> |{' '}
          <span className="font-semibold">#{data?.rrNumber}</span>
        </p>
      </div>

      <div className="p-3">
        <ol className="border-l border-dashed">
          {data?.approvals?.users?.map((user, i) => <HistoryDetail key={i} {...user} index={i} />)}
        </ol>
      </div>
    </MainModal>
  )
}

export default HistoryModal
