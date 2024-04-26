import MainModal from '@/components/Elements/Modals/MainModal'
import MainTable from '@/components/Elements/Tables/MainTable'
import { CheckCircle2Icon, XCircleIcon } from 'lucide-react'
import React from 'react'

const CandidateMatchModal: React.FC<{ show: boolean; onClose: () => void; candidate: ICandidate }> = ({ show, onClose, candidate }) => {
  const bodyItems = candidate.candidateMatches
    ? candidate.candidateMatches.map((item, i) => ({
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
    <MainModal className="max-w-6xl py-12" show={show} onClose={onClose}>
      <div className="mb-8">
        <div className="pb-2">
          <h3 className="mb-8 text-center text-lg font-semibold">Candidate Match</h3>
          <p className="text-sm font-semibold">Mandatory Requirements</p>
        </div>

        <MainTable
          headerItems={[
            { children: 'Requirement Type', className: 'text-left' },
            { children: 'Vacancy Requirement', className: 'text-left' },
            { children: 'Candidate', className: 'text-left' },
            { children: 'Match', className: 'text-center' },
          ]}
          bodyItems={mandatoryBodyItems}
        />

        <div className="pb-2 pt-8">
          <p className="text-sm font-semibold">Requirements</p>
        </div>

        <MainTable
          headerItems={[
            { children: 'Requirement Type', className: 'text-left' },
            { children: 'Vacancy Requirement', className: 'text-left' },
            { children: 'Candidate', className: 'text-left' },
            { children: 'Match', className: 'text-center' },
          ]}
          bodyItems={bodyItems}
        />
      </div>
    </MainModal>
  )
}

export default CandidateMatchModal
