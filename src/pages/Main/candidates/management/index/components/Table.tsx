import React, { useState } from 'react'
import { Avatar } from 'jobseeker-ui'
import { FileTextIcon, FileVideoIcon } from 'lucide-react'
import CandidateMatchModal from './CandidateMatchModal'
import MainTable from '@/components/Elements/MainTable'
import MenuList from '../../../components/MenuList'

type PropTypes = {
  setPreviewVideoModalUrl: (url: string) => void
  setPreviewPdfModalUrl: (url: string) => void
}

const total = 20

const Table: React.FC<PropTypes> = ({ setPreviewVideoModalUrl, setPreviewPdfModalUrl }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState<'MoveAnotherVacancy' | 'Process' | 'ViewHistory' | 'CandidateMatch' | null>(null)
  const options = ['Process', 'Move to Another Vacancy', 'Shortlist', 'View History', 'Blacklist', 'Reject']

  const candidates = Array.from(Array(total)).map((_, i) => {
    const applyDate = new Date(2024, 2, i + 1)
    const formattedApplyDate = applyDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })

    return {
      name: `Candidate ${i + 1}`,
      match: 100,
      vacancy: `Last Position ${i + 1}`,
      applyDate: formattedApplyDate,
      source: 'Careersite',
      status: 'Open',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      pdfUrl: 'http://localhost:5173/sample.pdf',
    }
  })

  const handleViewDetails = (candidate: any, option: string) => {
    setSelectedCandidate(candidate)
    if (option === 'Candidate Match') {
      setModalType('CandidateMatch')
      setShowOptionModal(true)
    }
  }

  const bodyItems = candidates.map((candidate) => ({
    items: [
      {
        children: (
          <div className="flex gap-3">
            <div>
              <Avatar name={candidate.name} size={38} className="static rounded-lg bg-primary-100 text-primary-700" />
            </div>
            <div>
              <span className="block font-semibold">{candidate.name}</span>
              <button
                onClick={() => handleViewDetails(candidate, 'Candidate Match')}
                className="rounded-lg bg-green-100 px-2 py-1 text-xs font-semibold text-success-600"
              >
                {candidate.match}% Match
              </button>
            </div>
          </div>
        ),
      },
      {
        children: (
          <>
            <span className="block font-semibold">{candidate.vacancy}</span>
            <span className="text-xs text-gray-500">#RR0000001</span>
          </>
        ),
      },
      { children: candidate.applyDate, className: 'text-center' },
      { children: candidate.source, className: 'text-center' },
      {
        children: (
          <span className="flex items-center justify-center gap-2">
            <button
              title="Preview Pdf Resume"
              className="text-primary-600 hover:text-primary-700 focus:outline-none"
              onClick={() => setPreviewPdfModalUrl(candidate.pdfUrl)}
            >
              <FileTextIcon size={18} />
            </button>
            <button
              title="Preview Video Resume"
              className="text-primary-600 hover:text-primary-700 focus:outline-none"
              onClick={() => setPreviewVideoModalUrl(candidate.videoUrl)}
            >
              <FileVideoIcon size={18} />
            </button>
          </span>
        ),
        className: 'text-center',
      },
      { children: <span className="text-sm font-semibold text-primary-600">{candidate.status}</span>, className: 'text-center' },
      { children: <MenuList options={options} candidate={candidate} /> },
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
      />

      {showOptionModal && selectedCandidate && modalType === 'CandidateMatch' && (
        <CandidateMatchModal show={showOptionModal} onClose={() => setShowOptionModal(false)} candidate={selectedCandidate} />
      )}
    </>
  )
}

export default Table
