import type { IApplicantDataTable } from '@/types'
import React from 'react'
import { Modal, ModalHeader } from 'jobseeker-ui'
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react'
import { MainTable } from '@/components'

const CandidateMatchModal: React.FC<{ candidate: IApplicantDataTable; onClose: () => void; show: boolean }> = ({
  candidate,
  onClose,
  show,
}) => {
  const bodyItems = candidate.candidateMatches
    ? candidate.candidateMatches.map((item, i) => ({
        className: 'odd:bg-white',
        items: [
          { children: item.requirementType || '-' },
          { children: item.vacancyData || '-' },
          { children: item.candidateData || '-' },
          {
            children: (
              <div
                className={`flex items-center justify-center rounded-full px-2 py-1 text-sm font-semibold ${item.isMatch ? 'bg-success-100 text-success-600' : 'bg-red-100 text-red-600'}`}
              >
                {item.isMatch ? <CheckCircle2Icon color="green" size={20} /> : <XCircleIcon color="red" size={20} />}
                <span className="ml-2">{item.isMatch ? 'Match' : 'No Match'}</span>
              </div>
            ),
            className: 'text-center',
          },
        ],
        key: i.toString(),
      }))
    : []

  const mandatoryBodyItems = candidate.candidateMatchesMandatory
    ? candidate.candidateMatchesMandatory.map((item, i) => ({
        items: [
          { children: item.requirementType || '-' },
          { children: item.vacancyData || '-' },
          { children: item.candidateData || '-' },
          {
            children: (
              <div
                className={`flex items-center justify-center rounded-full px-2 py-1 text-sm font-semibold ${item.isMatch ? 'bg-success-100 text-success-600' : 'bg-red-100 text-red-600'}`}
              >
                {item.isMatch ? <CheckCircle2Icon color="green" size={20} /> : <XCircleIcon color="red" size={20} />}
                <span className="ml-2">{item.isMatch ? 'Match' : 'No Match'}</span>
              </div>
            ),
            className: 'text-center',
          },
        ],
        key: i.toString(),
      }))
    : []

  return (
    <Modal className="max-w-6xl overflow-hidden" onClose={onClose} hideCloseButton show={show}>
      <ModalHeader onClose={onClose}>Candidate Match</ModalHeader>
      <div>
        <h3 className="p-3 font-semibold">Mandatory Requirements</h3>
        <MainTable
          bodyItems={mandatoryBodyItems}
          headerItems={[
            { children: 'Requirement Type', className: 'text-left' },
            { children: 'Vacancy Requirement', className: 'text-left' },
            { children: 'Candidate', className: 'text-left' },
            { children: 'Match', className: 'text-center' },
          ]}
        />
      </div>
      <div className="bg-gray-50">
        <h3 className="p-3 font-semibold">Requirements</h3>
        <MainTable
          bodyItems={bodyItems}
          headerItems={[
            { children: 'Requirement Type', className: 'text-left' },
            { children: 'Vacancy Requirement', className: 'text-left' },
            { children: 'Candidate', className: 'text-left' },
            { children: 'Match', className: 'text-center' },
          ]}
        />
      </div>
    </Modal>
  )
}

export default CandidateMatchModal
