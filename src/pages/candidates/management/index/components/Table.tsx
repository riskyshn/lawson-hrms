import MainTable from '@/components/Elements/Tables/MainTable'
import { Avatar } from 'jobseeker-ui'
import { FileTextIcon, FileVideoIcon } from 'lucide-react'
import React, { useState } from 'react'

import MenuList from '../../../components/MenuList'
import CandidateMatchModal from './CandidateMatchModal'

type PropTypes = {
  items: ICandidate[]
  loading?: boolean
  onDataChange: (data: string) => void
  setPreviewPdfModalUrl: (url: string) => void
  setPreviewVideoModalUrl: (url: string) => void
}

const Table: React.FC<PropTypes> = ({ items, loading, onDataChange, setPreviewPdfModalUrl, setPreviewVideoModalUrl }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState<'CandidateMatch' | 'MoveAnotherVacancy' | 'Process' | 'ViewHistory' | null>(null)
  const options = ['Process', 'Move to Another Vacancy', 'Shortlist', 'View History', 'Blacklist', 'View Profile', 'Reject']

  const handleViewDetails = (candidate: ICandidate, option: string) => {
    setSelectedCandidate(candidate)
    if (option === 'Candidate Match') {
      setModalType('CandidateMatch')
      setShowOptionModal(true)
    }
  }

  const renderMatchButton = (candidate: ICandidate) => {
    const matchPercentage = candidate.matchPercentage || 0
    let bgClass, textClass

    if (matchPercentage >= 90) {
      bgClass = 'bg-green-100'
      textClass = 'text-success-600'
    } else if (matchPercentage >= 70) {
      bgClass = 'bg-blue-100'
      textClass = 'text-blue-600'
    } else if (matchPercentage >= 50) {
      bgClass = 'bg-yellow-100'
      textClass = 'text-yellow-600'
    } else {
      bgClass = 'bg-gray-100'
      textClass = 'text-gray-600'
    }

    return (
      <button
        className={`rounded-lg ${bgClass} px-2 py-1 text-xs font-semibold ${textClass}`}
        onClick={() => handleViewDetails(candidate, 'Candidate Match')}
      >
        {matchPercentage}% Match
      </button>
    )
  }

  const bodyItems = items.map((candidate) => ({
    items: [
      {
        children: (
          <div className="flex gap-3 whitespace-nowrap">
            <div>
              {candidate.photoProfile ? (
                <img
                  alt={candidate.photoProfile}
                  className="block rounded-lg object-cover"
                  src={candidate.photoProfile}
                  style={{
                    height: '38px',
                    width: '38px',
                  }}
                />
              ) : (
                <Avatar className="static rounded-lg bg-primary-100 text-primary-700" name={candidate?.name || '-'} size={38} />
              )}
            </div>
            <div>
              <span className="block font-semibold">{candidate.name}</span>
              {renderMatchButton(candidate)}
            </div>
          </div>
        ),
      },
      {
        children: (
          <>
            <span className="block font-semibold">{candidate.vacancyName}</span>
            <span className="text-xs text-gray-500">{candidate.rrNumber || '-'}</span>
          </>
        ),
      },
      { children: candidate.applyDate || '-', className: 'text-center' },
      { children: candidate.source || '-', className: 'text-center' },
      {
        children: (
          <span className="flex items-center justify-center gap-2">
            <button
              className={`text-${!candidate.cv ? 'gray' : 'primary'}-600 hover:text-${!candidate.cv ? 'gray' : 'primary'}-700 focus:outline-none`}
              disabled={!candidate.cv}
              onClick={() => setPreviewPdfModalUrl(candidate?.cv || '-')}
              title="Preview Pdf Resume"
            >
              <FileTextIcon size={18} />
            </button>
            <button
              className={`text-${!candidate.videoResume ? 'gray' : 'primary'}-600 hover:text-${!candidate.videoResume ? 'gray' : 'primary'}-700 focus:outline-none`}
              disabled={!candidate.videoResume}
              onClick={() => setPreviewVideoModalUrl(candidate.videoResume || '-')}
              title="Preview Video Resume"
            >
              <FileVideoIcon size={18} />
            </button>
          </span>
        ),
        className: 'text-center',
      },
      {
        children: (() => {
          if (candidate.status === 'Locked') {
            return <span className="rounded-lg bg-violet-100 px-2 py-1 text-sm font-semibold text-violet-600">{candidate.status}</span>
          } else if (candidate.status === 'Hired') {
            return <span className="rounded-lg bg-green-100 px-2 py-1 text-sm font-semibold text-green-600">{candidate.status}</span>
          } else {
            return <span className="rounded-lg bg-yellow-100 px-2 py-1 text-sm font-semibold text-yellow-600">{candidate.status}</span>
          }
        })(),
        className: 'text-center',
      },
      {
        children: (() => {
          if (candidate.status === 'Locked') {
            return <MenuList candidate={candidate} onApplyVacancy={onDataChange} options={['View in Interview']} />
          } else if (candidate.status === 'Hired') {
            return <MenuList candidate={candidate} onApplyVacancy={onDataChange} options={['View in Onboarding']} />
          } else if (candidate.module === 'ASSESSMENT') {
            return <MenuList candidate={candidate} onApplyVacancy={onDataChange} options={['Go to Assessment']} />
          } else if (candidate.module === 'INTERVIEW') {
            return <MenuList candidate={candidate} onApplyVacancy={onDataChange} options={['Go to Interview']} />
          } else if (candidate.module === 'OFFERING') {
            return <MenuList candidate={candidate} onApplyVacancy={onDataChange} options={['Go to Offering Letter']} />
          } else if (candidate.module === 'SHORTLIST') {
            return <MenuList candidate={candidate} onApplyVacancy={onDataChange} options={['Go to Shortlist']} />
          } else if (candidate.module === 'ONBOARDING') {
            return <MenuList candidate={candidate} onApplyVacancy={onDataChange} options={['Go to Onboarding']} />
          } else {
            return <MenuList candidate={candidate} onApplyVacancy={onDataChange} options={options} />
          }
        })(),
      },
    ],
  }))

  return (
    <>
      <MainTable
        bodyItems={bodyItems}
        headerItems={[
          { children: 'Candidate', className: 'text-left' },
          { children: 'Vacancy', className: 'text-left' },
          { children: 'Apply Date' },
          { children: 'Source' },
          { children: 'Resume', className: 'w-24' },
          { children: 'Status' },
          { children: 'Action', className: 'w-24' },
        ]}
        loading={loading}
      />

      {showOptionModal && selectedCandidate && modalType === 'CandidateMatch' && (
        <CandidateMatchModal candidate={selectedCandidate} onClose={() => setShowOptionModal(false)} show={showOptionModal} />
      )}
    </>
  )
}

export default Table
