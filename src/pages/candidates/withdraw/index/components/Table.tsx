import type { ICandidate } from '@jshrms/shared/types'
import React from 'react'
import MainTable from '@jshrms/shared/components/Elements/Tables/MainTable'
import { Avatar } from '@jshrms/ui'
import { FileTextIcon, FileVideoIcon } from 'lucide-react'
import MenuList from '../../../components/MenuList'

type PropTypes = {
  items: ICandidate[]
  loading?: boolean
  onDataChange: (data: string) => void
  setPreviewPdfModalUrl: (url: string) => void
  setPreviewVideoModalUrl: (url: string) => void
}

const Table: React.FC<PropTypes> = ({ items, loading, onDataChange, setPreviewPdfModalUrl, setPreviewVideoModalUrl }) => {
  const options = ['Move to Another Vacancy', 'View History', 'Blacklist', 'View Profile']

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
              <span className="text-xs text-gray-500">{candidate.email}</span>
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
      { children: candidate.lastEducation, className: 'text-center' },
      { children: candidate.withdrawReason, className: 'text-center whitespace-normal' },
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
      { children: <MenuList candidate={candidate} onApplyVacancy={onDataChange} options={options} /> },
    ],
  }))

  return (
    <>
      <MainTable
        bodyItems={bodyItems}
        headerItems={[
          { children: 'Candidate', className: 'text-left' },
          { children: 'Vacancy', className: 'text-left' },
          { children: 'Education' },
          { children: 'Withdraw Reason' },
          { children: 'Resume', className: 'w-24' },
          { children: 'Action', className: 'w-24' },
        ]}
        loading={loading}
      />
    </>
  )
}

export default Table
