import React from 'react'
import { Button, BaseInput, InputRadio } from 'jobseeker-ui'
import MainModal from '@/components/Elements/Modals/MainModal'
import { SearchIcon } from 'lucide-react'

type ProcessModalProps = {
  show: boolean
  onClose: () => void
  candidate: any
}

const data = [
  {
    title: 'Interview',
    options: [
      { id: 'interviewHR', name: 'interview', value: 'hr', label: 'Interview HR' },
      { id: 'interviewUser1', name: 'interview', value: 'user1', label: 'Interview User 1' },
      { id: 'interviewUser2', name: 'interview', value: 'user2', label: 'Interview User 2' },
    ],
  },
  {
    title: 'Assessment',
    options: [
      { id: 'assessmentPsychological', name: 'assessment', value: 'hr', label: 'Psychological Assessment' },
      { id: 'assessmentTechnical', name: 'assessment', value: 'user1', label: 'Technical Assessment' },
    ],
  },
]

const ProcessModal: React.FC<ProcessModalProps> = ({ show, onClose }) => {
  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <div className="mb-3">
        <h3 className="mb-5 text-lg font-semibold">Process Update</h3>
        <p className="text-xs text-gray-500">Please select the process stage</p>
        <div className="relative flex flex-1">
          <BaseInput type="text" placeholder="Search Stage" className="peer w-full rounded-r-none" />
          <Button iconOnly color="primary" className="rounded-l-none">
            <SearchIcon size={16} />
          </Button>
        </div>
      </div>
      {data.map((section, index) => (
        <div className="mb-3" key={index}>
          <h6 className="mb-2 text-sm font-semibold">{section.title}</h6>
          {section.options.map((option, idx) => (
            <InputRadio className="mb-2" key={idx} id={option.id} name={option.name} value={option.value}>
              {option.label}
            </InputRadio>
          ))}
        </div>
      ))}
      <div className="mt-8 flex justify-between">
        <Button onClick={onClose} color="primary" variant="light" className="mr-2 w-1/2">
          Cancel
        </Button>
        <Button color="primary" className="ml-2 w-1/2">
          Next
        </Button>
      </div>
    </MainModal>
  )
}

export default ProcessModal
