import MainTable from '@/components/Elements/MainTable'
import { Menu } from '@headlessui/react'
import { Avatar, Button } from 'jobseeker-ui'
import { EditIcon, FileTextIcon, FileVideoIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

const total = 20

type PropTypes = {
  setPreviewVideoModalUrl: (url: string) => void
  setPreviewPdfModalUrl: (url: string) => void
}

const Table: React.FC<PropTypes> = ({ setPreviewVideoModalUrl, setPreviewPdfModalUrl }) => {
  const bodyItems = Array.from(Array(total)).map((_, i) => ({
    items: [
      {
        children: (
          <div className="flex gap-3">
            <div>
              <Avatar name="Jhon Doe" size={38} className="rounded-lg bg-primary-100 text-primary-700" />
            </div>
            <div>
              <span className="block font-semibold">Your name</span>
              <span className="text-xs text-gray-500">example@email.com</span>
            </div>
          </div>
        ),
      },
      {
        children: (
          <>
            <span className="block font-semibold">Kasir & Pramuniaga</span>
            <span className="text-xs text-gray-500">#RR0000001</span>
          </>
        ),
      },
      { children: 'S1', className: 'text-center' },
      { children: 'DKI Jakarta', className: 'text-center' },
      { children: 'Jakarta', className: 'text-center' },
      {
        children: (
          <span className="flex items-center justify-center gap-2">
            <button
              title="Preview Pdf Resume"
              className="text-primary-600 hover:text-primary-700 focus:outline-none"
              onClick={() => setPreviewPdfModalUrl('http://localhost:5173/sample.pdf')}
            >
              <FileTextIcon size={18} />
            </button>
            <button
              title="Preview Video Resume"
              className="text-primary-600 hover:text-primary-700 focus:outline-none"
              onClick={() => setPreviewVideoModalUrl('http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4')}
            >
              <FileVideoIcon size={18} />
            </button>
          </span>
        ),
        className: 'text-center',
      },
      {
        children: (
          <Menu as="div" className="relative">
            <Menu.Button as={Button} color="primary" variant="light" size="small" block className="text-xs">
              Action
            </Menu.Button>
            <Menu.Items
              className={twJoin(
                i > total - 6 && 'bottom-full',
                'absolute right-0 z-20 w-56 overflow-hidden rounded-lg border-gray-100 bg-white p-1 shadow-lg ring-[1px] ring-gray-100 focus:outline-none',
              )}
            >
              {Array.from(Array(5)).map((_, i) => (
                <Menu.Item key={i}>
                  {({ active }) => (
                    <button
                      className={twJoin('group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm', active && 'bg-primary-100')}
                    >
                      <EditIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                      Option {i}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Menu>
        ),
        className: 'text-center',
      },
    ],
  }))

  return (
    <MainTable
      headerItems={[
        { children: 'Candidate', className: 'text-left' },
        { children: 'Last Position', className: 'text-left' },
        { children: 'Education' },
        { children: 'Province' },
        { children: 'City' },
        { children: 'Resume', className: 'w-24' },
        { children: 'Action', className: 'w-24' },
      ]}
      bodyItems={bodyItems}
    />
  )
}

export default Table
