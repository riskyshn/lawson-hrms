import type { IApplicantDataTable } from '@/types'
import React from 'react'
import { Link } from 'react-router-dom'
import { Avatar } from 'jobseeker-ui'
import { FileTextIcon, FileVideoIcon } from 'lucide-react'
import { MainTable } from '@/components'
import MenuList from '../../../components/MenuList'

type PropTypes = {
  items: IApplicantDataTable[]
  loading?: boolean
  onDataChange: (data: string) => void
  setPreviewPdfModalUrl: (url: string) => void
  setPreviewVideoModalUrl: (url: string) => void
}

const Table: React.FC<PropTypes> = ({ items, loading, onDataChange, setPreviewPdfModalUrl, setPreviewVideoModalUrl }) => {
  const options = ['Move to Another Vacancy', 'View History', 'Blacklist', 'View Profile']

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
              <span className="text-xs text-gray-500">{item.candidate.email}</span>
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
      { children: item.candidate.lastEducation, className: 'text-center' },
      { children: item.withdraw.reason, className: 'text-center whitespace-normal' },
      {
        children: (
          <span className="flex items-center justify-center gap-2">
            <button
              className={`text-${!item.candidate.cv ? 'gray' : 'primary'}-600 hover:text-${!item.candidate.cv ? 'gray' : 'primary'}-700 focus:outline-none`}
              disabled={!item.candidate.cv}
              onClick={() => setPreviewPdfModalUrl(item.candidate.cv || '-')}
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
      { children: <MenuList item={item} onApplyVacancy={onDataChange} options={options} /> },
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
