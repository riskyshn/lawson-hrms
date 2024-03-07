import React from 'react'
import { Avatar } from 'jobseeker-ui'
import { FileTextIcon, FileVideoIcon } from 'lucide-react'
import MainTable from '@/components/Elements/MainTable'
import MenuList from '../../../components/MenuList'

type PropTypes = {
  setPreviewVideoModalUrl: (url: string) => void
  setPreviewPdfModalUrl: (url: string) => void
}

const total = 20

const Table: React.FC<PropTypes> = ({ setPreviewVideoModalUrl, setPreviewPdfModalUrl }) => {
  const options = ['Move to Another Vacancy', 'View History', 'Blacklist']

  const candidates = Array.from(Array(total)).map((_, i) => {
    return {
      name: `Candidate ${i + 1}`,
      email: `candidate${i + 1}@jobseeker.com`,
      vacancy: `Last Position ${i + 1}`,
      education: 'S1',
      withdrawReason: 'Overbudget',
      videoUrl: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      pdfUrl: 'http://localhost:5173/sample.pdf',
    }
  })

  const bodyItems = candidates.map((candidate, i) => ({
    items: [
      {
        children: (
          <div className="flex gap-3">
            <div>
              <Avatar name={candidate.name} size={38} className="static rounded-lg bg-primary-100 text-primary-700" />
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
            <span className="block font-semibold">{candidate.vacancy}</span>
            <span className="text-xs text-gray-500">#RR0000001</span>
          </>
        ),
      },
      { children: candidate.education, className: 'text-center' },
      { children: candidate.withdrawReason, className: 'text-center' },
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
      { children: <MenuList options={options} candidate={candidate} /> },
    ],
  }))

  return (
    <>
      <MainTable
        headerItems={[
          { children: 'Candidate', className: 'text-left' },
          { children: 'Last Position', className: 'text-left' },
          { children: 'Education' },
          { children: 'Withdraw Reason' },
          { children: 'Resume', className: 'w-24' },
          { children: 'Action', className: 'w-24' },
        ]}
        bodyItems={bodyItems}
      />
    </>
  )
}

export default Table
