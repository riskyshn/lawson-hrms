import React from 'react'
import { Avatar } from 'jobseeker-ui'
import MainTable from '@/components/Elements/MainTable'
import ActionMenu from './ActionMenu'
import { FileTextIcon } from 'lucide-react'

type PropTypes = {
  setPreviewPdfModalUrl: (url: string) => void
}

const total = 20

const Table: React.FC<PropTypes> = ({ setPreviewPdfModalUrl }) => {
  const candidates = Array.from(Array(total)).map((_, i) => {
    return {
      name: `Candidate ${i + 1}`,
      email: `candidate${i + 1}@email.com`,
      vacancy: `Last Position ${i + 1}`,
      vacancyId: `#${i + 1}`,
      status: ['Waiting for Documents', 'Ready to Offer', 'Offering Letter Sent', 'Offering Signed'][Math.floor(Math.random() * 4)],
      documentPdf: '/sample.pdf',
    }
  })

  const bodyItems = candidates.map((candidate) => ({
    items: [
      {
        children: (
          <div className="flex gap-3 whitespace-nowrap">
            <div>
              <Avatar name={candidate.name} size={38} className="static rounded-lg bg-primary-100 text-primary-700" />
            </div>
            <div>
              <span className="block font-semibold">{candidate.name}</span>
              <p>{candidate.email}</p>
            </div>
          </div>
        ),
      },
      {
        children: (
          <>
            <span className="block font-semibold">{candidate.vacancy}</span>
            <span className="text-xs text-gray-500">{candidate.vacancyId}</span>
          </>
        ),
      },
      {
        children: (() => {
          if (candidate.status === 'Waiting for Documents') {
            return <span className="rounded-lg bg-orange-100 px-2 py-1 text-sm font-semibold text-orange-600">{candidate.status}</span>
          } else if (candidate.status === 'Offering Letter Sent') {
            return <span className="rounded-lg bg-green-100 px-2 py-1 text-sm font-semibold text-green-600">{candidate.status}</span>
          } else if (candidate.status === 'Offering Signed') {
            return <span className="rounded-lg bg-purple-100 px-2 py-1 text-sm font-semibold text-purple-600">{candidate.status}</span>
          } else {
            return <span className="rounded-lg bg-blue-100 px-2 py-1 text-sm font-semibold text-blue-600">{candidate.status}</span>
          }
        })(),
        className: 'text-center',
      },
      {
        children: (
          <span className="flex items-center justify-center gap-2">
            <button
              title="Preview Pdf Resume"
              className="text-primary-600 hover:text-primary-700 focus:outline-none"
              onClick={() => setPreviewPdfModalUrl(candidate.documentPdf)}
            >
              <FileTextIcon size={18} />
            </button>
          </span>
        ),
        className: 'text-center',
      },
      {
        children: (() => {
          if (candidate.status === 'Waiting for Documents') {
            return <ActionMenu options={['Create Offering Letter', 'Send Reminder', 'View History', 'Blacklist', 'Reject', 'Withdraw']} />
          } else if (candidate.status === 'Offering Signed') {
            return <ActionMenu options={['View Offering Letter', 'Hire', 'View History', 'Blacklist', 'Reject', 'Withdraw']} />
          } else if (candidate.status === 'Offering Letter Sent') {
            return <ActionMenu options={['Send Reminder', 'Revise Offering Letter', 'View History', 'Blacklist', 'Reject', 'Withdraw']} />
          } else if (candidate.status === 'Ready to Offer') {
            return <ActionMenu options={['Create Offering Letter', 'View History', 'Blacklist', 'Reject', 'Withdraw']} />
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
          { children: 'Status' },
          { children: 'Documents' },
          { children: 'Action', className: 'w-24' },
        ]}
        bodyItems={bodyItems}
      />
    </>
  )
}

export default Table
