import type { ICandidate } from '@/types'
import { Avatar } from 'jobseeker-ui'
import { FileTextIcon, FileVideoIcon } from 'lucide-react'
import { MainTable } from '@/components'
import MenuList from './MenuList'

type PropTypes = {
  items: ICandidate[]
  loading?: boolean
  onDataChange: (data: string) => void
  setPreviewPdfModalUrl: (url: string) => void
  setPreviewVideoModalUrl: (url: string) => void
}

const Table: React.FC<PropTypes> = ({ items, loading, onDataChange, setPreviewPdfModalUrl, setPreviewVideoModalUrl }) => {
  const options = ['Apply to Vacancy', 'View History', 'View Profile']

  console.log(items)
  const bodyItems = items.map((item) => ({
    items: [
      {
        children: (
          <div className="flex gap-3 whitespace-nowrap">
            <div>
              {item?.photoProfile ? (
                <img
                  alt={item?.photoProfile}
                  className="block rounded-lg object-cover"
                  src={item?.photoProfile}
                  style={{
                    height: '38px',
                    width: '38px',
                  }}
                />
              ) : (
                <Avatar className="static rounded-lg bg-primary-100 text-primary-700" name={item?.name || '-'} size={38} />
              )}
            </div>
            <div>
              <span className="block font-semibold">{item?.name}</span>
              <span className="text-xs text-gray-500">{item?.email}</span>
            </div>
          </div>
        ),
      },
      {
        children: (
          <>
            <span className="block font-semibold">{item?.lastPosition?.name}</span>
            <span className="text-xs text-gray-500">{item?.lastPosition?.rrNumber}</span>
          </>
        ),
      },
      { children: item?.lastEducation, className: 'text-center' },
      { children: item?.province, className: 'text-center' },
      { children: item?.city, className: 'text-center' },
      {
        children: (
          <span className="flex items-center justify-center gap-2">
            <button
              className={`text-${!item?.cv ? 'gray' : 'primary'}-600 hover:text-${!item?.cv ? 'gray' : 'primary'}-700 focus:outline-none`}
              disabled={!item?.cv}
              onClick={() => setPreviewPdfModalUrl(item?.cv || '-')}
              title="Preview Pdf Resume"
            >
              <FileTextIcon size={18} />
            </button>
            <button
              className={`text-${!item?.videoResume ? 'gray' : 'primary'}-600 hover:text-${!item?.videoResume ? 'gray' : 'primary'}-700 focus:outline-none`}
              disabled={!item?.videoResume}
              onClick={() => setPreviewVideoModalUrl(item?.videoResume || '-')}
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
          { children: 'Province' },
          { children: 'City' },
          { children: 'Resume', className: 'w-24' },
          { children: 'Action', className: 'w-24' },
        ]}
        loading={loading}
      />
    </>
  )
}

export default Table
