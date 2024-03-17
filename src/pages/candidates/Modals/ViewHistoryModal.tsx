import React, { useState } from 'react'
import { Button, Card, CardBody } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'
import { CalendarIcon, CheckCircle2Icon, FileInputIcon, UserIcon, XCircleIcon } from 'lucide-react'

type OptionModalProps = {
  show: boolean
  onClose: () => void
  candidate: any
}

const data = [
  {
    candidate: {
      name: 'John Doe',
    },
    jobApplication: {
      id: '#RR00000041373',
      position: 'Sales Promotion',
    },
    jobApplicationProcess: [
      {
        title: 'Interview HR',
        date: '22/01/2024',
        status: 'Passed',
        details: [
          {
            attendee: 'Anna Yuliana, Candidate',
            scheduleDate: '18/01/2024',
            processDate: '24/01/2024',
            processRemarks:
              'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit laborum quo labore culpa nam, pariatur numquam unde, voluptatibus expedita cumque assumenda voluptate. Animi rerum asperiores a officia corrupti ipsa debitis.',
            document: '/sample.pdf',
          },
        ],
      },
      {
        title: 'Interview User',
        date: '22/01/2024',
        status: 'Passed',
        details: [
          {
            attendee: 'Anna Yuliana, Candidate, & User',
            scheduleDate: '18/01/2024',
            processDate: '24/01/2024',
            processRemarks:
              'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit laborum quo labore culpa nam, pariatur numquam unde, voluptatibus expedita cumque assumenda voluptate. Animi rerum asperiores a officia corrupti ipsa debitis.',
            document: '/sample.pdf',
          },
        ],
      },
      {
        title: 'Technical Test',
        date: '22/01/2024',
        status: 'Failed',
        details: [
          {
            attendee: 'Anna Yuliana, Candidate, & User',
            scheduleDate: '18/01/2024',
            processDate: '24/01/2024',
            processRemarks:
              'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugit laborum quo labore culpa nam, pariatur numquam unde, voluptatibus expedita cumque assumenda voluptate. Animi rerum asperiores a officia corrupti ipsa debitis.',
            document: '/sample.pdf',
          },
        ],
      },
    ],
  },
]

const ViewHistoryModal: React.FC<OptionModalProps> = ({ show, onClose }) => {
  const [showDetails, setShowDetails] = useState<boolean[]>([false, false, false])

  const handleShowDetails = (index: number) => {
    setShowDetails((prevDetails) => prevDetails.map((detail, idx) => (idx === index ? !detail : detail)))
  }

  const handleOpenPdf = () => {
    window.open('/sample.pdf', '_blank')
  }

  const renderStatus = (status: string) => {
    if (status === 'Passed') {
      return (
        <div className="flex items-center gap-2">
          <CheckCircle2Icon className="text-green-600" />
          <span className="text-sm font-semibold text-green-600">Passed</span>
        </div>
      )
    } else if (status === 'Failed') {
      return (
        <div className="flex items-center gap-2">
          <XCircleIcon className="text-red-600" />
          <span className="text-sm font-semibold text-red-600">Failed</span>
        </div>
      )
    }
    return null
  }

  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      {data.map((item, index) => (
        <>
          <div key={index} className="mb-8">
            <h4 className="mb-2 text-center text-2xl font-semibold">Candidate History</h4>
            <p className="text-center">Candidate Process History for {item.candidate.name}</p>
          </div>
          <div className="pb-2">
            <h3 className="text-lg font-semibold">{item.jobApplication.position}</h3>
            <p className="text-xs text-gray-500">{item.jobApplication.id}</p>
          </div>

          <div className="p-3">
            <ol className="border-l border-dashed">
              {item.jobApplicationProcess.map((process, idx) => (
                <li key={idx} className="relative mb-5 pl-6 last:mb-0">
                  <span className="absolute left-[-0.4rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-white ring-4 ring-primary-600" />
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="flex items-center gap-3 font-semibold">{process.title}</h3>
                      <p className="mb-2 text-xs text-gray-500">{process.date}</p>
                      <Button
                        type="button"
                        size="small"
                        color="default"
                        variant="light"
                        className="text-xs"
                        onClick={() => handleShowDetails(idx)}
                      >
                        Show Details
                      </Button>
                    </div>
                    <div className="flex items-center gap-2">{renderStatus(process.status)}</div>
                  </div>

                  {showDetails[idx] && (
                    <Card className="mt-4 px-2 py-4">
                      <CardBody>
                        <div className="mb-3">
                          <h3 className="text-sm font-semibold">Attendee</h3>
                          <span className="flex items-center gap-1 text-xs">
                            <UserIcon size={16} />
                            {process.details[0].attendee}
                          </span>
                        </div>
                        <div className="mb-3">
                          <h3 className="text-sm font-semibold">Action Scheduled</h3>
                          <span className="flex items-center gap-1 text-xs">
                            <CalendarIcon size={16} />
                            {process.details[0].scheduleDate}
                          </span>
                        </div>
                        <div className="mb-3">
                          <h3 className="text-sm font-semibold">Process Date</h3>
                          <span className="flex items-center gap-1 text-xs">
                            <CalendarIcon size={16} />
                            {process.details[0].processDate}
                          </span>
                        </div>
                        <div className="mb-3">
                          <h3 className="text-sm font-semibold">Process Remarks</h3>
                          <span className="flex items-center gap-1 text-xs">{process.details[0].processRemarks}</span>
                        </div>
                        <h3 className="mb-1 text-sm font-semibold">Document</h3>
                        <Button
                          onClick={handleOpenPdf}
                          size="small"
                          color="primary"
                          className="gap-2"
                          variant="default"
                          leftChild={<FileInputIcon size={18} />}
                        >
                          <span className="text-xs">Result Attachment</span>
                        </Button>
                      </CardBody>
                    </Card>
                  )}
                </li>
              ))}
            </ol>
          </div>
        </>
      ))}
    </MainModal>
  )
}

export default ViewHistoryModal
