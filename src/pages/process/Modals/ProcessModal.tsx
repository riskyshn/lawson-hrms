import MainModal from '@/components/Elements/Modals/MainModal'
import { BaseInput, Button, InputRadio } from 'jobseeker-ui'
import { SearchIcon } from 'lucide-react'
import React from 'react'

type ProcessModalProps = {
  candidate: any
  onClose: () => void
  show: boolean
}

const data = [
  {
    options: [
      { id: 'interviewHR', label: 'Interview HR', name: 'interview', value: 'hr' },
      { id: 'interviewUser1', label: 'Interview User 1', name: 'interview', value: 'user1' },
      { id: 'interviewUser2', label: 'Interview User 2', name: 'interview', value: 'user2' },
    ],
    title: 'Interview',
  },
  {
    options: [
      { id: 'assessmentPsychological', label: 'Psychological Assessment', name: 'assessment', value: 'hr' },
      { id: 'assessmentTechnical', label: 'Technical Assessment', name: 'assessment', value: 'user1' },
    ],
    title: 'Assessment',
  },
]

const ProcessModal: React.FC<ProcessModalProps> = ({ onClose, show }) => {
  return (
    <MainModal className="max-w-xl py-12" onClose={onClose} show={show}>
      <div className="mb-3">
        <h3 className="mb-5 text-lg font-semibold">Process Update</h3>
        <p className="text-xs text-gray-500">Please select the process stage</p>
        <div className="relative flex flex-1">
          <BaseInput className="peer w-full rounded-r-none" placeholder="Search Stage" type="text" />
          <Button className="rounded-l-none" color="primary" iconOnly>
            <SearchIcon size={16} />
          </Button>
        </div>
      </div>
      {data.map((section, index) => (
        <div className="mb-3" key={index}>
          <h6 className="mb-2 text-sm font-semibold">{section.title}</h6>
          {section.options.map((option, idx) => (
            <InputRadio className="mb-2" id={option.id} key={idx} name={option.name} value={option.value}>
              {option.label}
            </InputRadio>
          ))}
        </div>
      ))}
      <div className="mt-8 flex justify-between">
        <Button className="mr-2 w-1/2" color="primary" onClick={onClose} variant="light">
          Cancel
        </Button>
        <Button className="ml-2 w-1/2" color="primary">
          Next
        </Button>
      </div>
    </MainModal>
  )
}

export default ProcessModal
