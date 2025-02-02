import type { IApplicantDataTable } from '@/types'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'jobseeker-ui'
import { FileTextIcon, FileVideoIcon } from 'lucide-react'
import { MainTable } from '@/components'
import MenuList from '../../../components/MenuList'
import CandidateMatchModal from './CandidateMatchModal'

type PropTypes = {
  items: IApplicantDataTable[]
  loading?: boolean
  onDataChange: (data: string) => void
  setPreviewPdfModalUrl: (url: string) => void
  setPreviewVideoModalUrl: (url: string) => void
}

const Table: React.FC<PropTypes> = ({ items, loading, onDataChange, setPreviewPdfModalUrl, setPreviewVideoModalUrl }) => {
  const [selectedCandidate, setSelectedCandidate] = useState<IApplicantDataTable>()
  const [showOptionModal, setShowOptionModal] = useState(false)
  const [modalType, setModalType] = useState<'CandidateMatch' | 'MoveAnotherVacancy' | 'Process' | 'ViewHistory' | null>(null)
  const options = ['Process', 'Move to Another Vacancy', 'Shortlist', 'View History', 'Blacklist', 'View Profile', 'Reject']

  const handleViewDetails = (candidate: IApplicantDataTable, option: string) => {
    setSelectedCandidate(candidate)
    if (option === 'Candidate Match') {
      setModalType('CandidateMatch')
      setShowOptionModal(true)
    }
  }

  const renderMatchButton = (candidate: IApplicantDataTable) => {
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

  const bodyItems = items.map((item) => ({
    items: [
      {
        children: (
          <div className="flex gap-3 whitespace-nowrap">
            <Avatar
              className="static h-10 w-10 rounded-lg bg-primary-100 text-primary-700"
              name={item.candidate?.name || '-'}
              src={item.candidate.photoProfile || ''}
              size={38}
            />
            <div>
              <Link
                className="block font-semibold text-primary-600 hover:text-primary-700"
                to={`/candidates/profile/${item.candidate.oid}`}
              >
                {item.candidate.name}
              </Link>
              {renderMatchButton(item)}
            </div>
          </div>
        ),
      },
      {
        children: (
          <>
            <span className="block font-semibold">{item.vacancy.name}</span>
            <span className="text-xs text-gray-500">{item.vacancy.rrNumber || '-'}</span>
          </>
        ),
      },
      { children: formatDate(item.applyDate) || '-', className: 'text-center' },
      { children: item.source || '-', className: 'text-center' },
      {
        children: (
          <span className="flex items-center justify-center gap-2">
            <button
              className={`text-${!item.candidate.cv ? 'gray' : 'primary'}-600 hover:text-${!item.candidate.cv ? 'gray' : 'primary'}-700 focus:outline-none`}
              disabled={!item.candidate.cv}
              onClick={() => setPreviewPdfModalUrl(item.candidate?.cv || '-')}
              title="Preview Pdf Resume"
            >
              <FileTextIcon size={18} />
            </button>
            <button
              className={`text-${!item.candidate.videoResume ? 'gray' : 'primary'}-600 hover:text-${!item.candidate.videoResume ? 'gray' : 'primary'}-700 focus:outline-none`}
              disabled={!item.candidate.videoResume}
              onClick={() => setPreviewVideoModalUrl(item.candidate.videoResume || '-')}
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
          if (item.status === 'Locked') {
            return <span className="rounded-lg bg-violet-100 px-2 py-1 text-sm font-semibold text-violet-600">{item.status}</span>
          } else if (item.status === 'Hired') {
            return <span className="rounded-lg bg-green-100 px-2 py-1 text-sm font-semibold text-green-600">{item.status}</span>
          } else {
            return <span className="rounded-lg bg-yellow-100 px-2 py-1 text-sm font-semibold text-yellow-600">{item.status}</span>
          }
        })(),
        className: 'text-center',
      },
      {
        children: (() => {
          if (item.status === 'Locked') {
            return <MenuList item={item} onApplyVacancy={onDataChange} options={['View in Interview']} />
          } else if (item.status === 'Hired') {
            return <MenuList item={item} onApplyVacancy={onDataChange} options={['View in Onboarding']} />
          } else if (item.module === 'ASSESSMENT') {
            return <MenuList item={item} onApplyVacancy={onDataChange} options={['Go to Assessment']} />
          } else if (item.module === 'INTERVIEW') {
            return <MenuList item={item} onApplyVacancy={onDataChange} options={['Go to Interview']} />
          } else if (item.module === 'OFFERING') {
            return <MenuList item={item} onApplyVacancy={onDataChange} options={['Go to Offering Letter']} />
          } else if (item.module === 'SHORTLIST') {
            return <MenuList item={item} onApplyVacancy={onDataChange} options={['Go to Shortlist']} />
          } else if (item.module === 'ONBOARDING') {
            return <MenuList item={item} onApplyVacancy={onDataChange} options={['Go to Onboarding']} />
          } else {
            return <MenuList item={item} onApplyVacancy={onDataChange} options={options} />
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

function formatDate(inputDate: string): string {
  if (!inputDate) {
    return ''
  }
  const date = new Date(inputDate)
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()

  return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`
}

export default Table
