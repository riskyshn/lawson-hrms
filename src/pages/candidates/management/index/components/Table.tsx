import React, { useState } from 'react'
import { Avatar } from 'jobseeker-ui'
import { FileTextIcon, FileVideoIcon } from 'lucide-react'
import CandidateMatchModal from './CandidateMatchModal'
import MainTable from '@/components/Elements/MainTable'
import MenuList from '../../../components/MenuList'

type PropTypes = {
  items: ICandidate[]
  loading?: boolean
  setPreviewVideoModalUrl: (url: string) => void
  setPreviewPdfModalUrl: (url: string) => void
  onDataChange: (data: string) => void
}

const Table: React.FC<PropTypes> = ({ items, setPreviewVideoModalUrl, setPreviewPdfModalUrl, loading, onDataChange }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState<'MoveAnotherVacancy' | 'Process' | 'ViewHistory' | 'CandidateMatch' | null>(null)
  const options = ['Process', 'Move to Another Vacancy', 'Shortlist', 'View History', 'Blacklist', 'View Profile', 'Reject']

  const handleViewDetails = (candidate: any, option: string) => {
    setSelectedCandidate(candidate)
    if (option === 'Candidate Match') {
      setModalType('CandidateMatch')
      setShowOptionModal(true)
    }
  }

  const renderMatchButton = (candidate: any) => {
    const matchPercentage = candidate.matchPercentage || '-'
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
        onClick={() => handleViewDetails(candidate, 'Candidate Match')}
        className={`rounded-lg ${bgClass} px-2 py-1 text-xs font-semibold ${textClass}`}
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
              {/* {candidate.photoProfile ? (
                <img
                  alt={candidate.photoProfile}
                  src={candidate.photoProfile}
                  className="block rounded-lg object-cover"
                  style={{
                    height: '38px',
                    width: '38px',
                  }}
                />
              ) : ( */}
              <Avatar name={candidate?.name || '-'} size={38} className="static rounded-lg bg-primary-100 text-primary-700" />
              {/* )} */}
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
              disabled={!candidate.cv}
              title="Preview Pdf Resume"
              className={`text-${!candidate.cv ? 'gray' : 'primary'}-600 hover:text-${!candidate.cv ? 'gray' : 'primary'}-700 focus:outline-none`}
              onClick={() => setPreviewPdfModalUrl(candidate?.cv || '-')}
            >
              <FileTextIcon size={18} />
            </button>
            <button
              disabled={!candidate.videoResume}
              title="Preview Video Resume"
              className={`text-${!candidate.videoResume ? 'gray' : 'primary'}-600 hover:text-${!candidate.videoResume ? 'gray' : 'primary'}-700 focus:outline-none`}
              onClick={() => setPreviewVideoModalUrl(candidate.videoResume || '-')}
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
            return <MenuList options={['View in Interview']} candidate={candidate} onApplyVacancy={onDataChange} />
          } else if (candidate.status === 'Hired') {
            return <MenuList options={['View in Onboarding']} candidate={candidate} onApplyVacancy={onDataChange} />
          } else {
            return <MenuList options={options} candidate={candidate} onApplyVacancy={onDataChange} />
          }
        })(),
      },
    ],
  }))

  return (
    <>
      <MainTable
        headerItems={[
          { children: 'Candidate', className: 'text-left' },
          { children: 'Vacancy', className: 'text-left' },
          { children: 'Apply Date' },
          { children: 'Source' },
          { children: 'Resume', className: 'w-24' },
          { children: 'Status' },
          { children: 'Action', className: 'w-24' },
        ]}
        bodyItems={bodyItems}
        loading={loading}
      />

      {showOptionModal && selectedCandidate && modalType === 'CandidateMatch' && (
        <CandidateMatchModal show={showOptionModal} onClose={() => setShowOptionModal(false)} candidate={selectedCandidate} />
      )}
    </>
  )
}

export default Table
