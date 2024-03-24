import MainTable from '@/components/Elements/MainTable'
import { Avatar } from 'jobseeker-ui'
import { FileTextIcon, FileVideoIcon } from 'lucide-react'
import MenuList from '../../../components/MenuList'

type PropTypes = {
  items: ICandidate[]
  loading?: boolean
  setPreviewVideoModalUrl: (url: string) => void
  setPreviewPdfModalUrl: (url: string) => void
  onDataChange: (data: string) => void
}

const Table: React.FC<PropTypes> = ({ items, setPreviewVideoModalUrl, setPreviewPdfModalUrl, loading, onDataChange }) => {
  const options = ['Unblacklist']

  const bodyItems = items.map((candidate) => ({
    items: [
      {
        children: (
          <div className="flex gap-3">
            <div>
              <Avatar name={candidate?.name || '-'} size={38} className="static rounded-lg bg-primary-100 text-primary-700" />
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
            <span className="block font-semibold">{candidate.position}</span>
            <span className="text-xs text-gray-500">{candidate.rrNumber}</span>
          </>
        ),
      },
      { children: candidate.blacklistedBy, className: 'text-center' },
      { children: candidate.blacklistReason, className: 'text-center' },
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
      { children: <MenuList options={options} candidate={candidate} onApplyVacancy={onDataChange} /> },
    ],
  }))

  return (
    <>
      <MainTable
        headerItems={[
          { children: 'Candidate', className: 'text-left' },
          { children: 'Last Position', className: 'text-left' },
          { children: 'Blacklisted By' },
          { children: 'Blacklist Reason' },
          { children: 'Resume', className: 'w-24' },
          { children: 'Action', className: 'w-24' },
        ]}
        bodyItems={bodyItems}
        loading={loading}
      />
    </>
  )
}

export default Table
