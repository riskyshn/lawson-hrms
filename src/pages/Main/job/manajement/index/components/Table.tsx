import MainTable from '@/components/Elements/MainTable'
import { Menu } from '@headlessui/react'
import { Avatar, Button } from 'jobseeker-ui'
import { EditIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

const total = 20

const Table: React.FC = () => {
  const bodyItems = Array.from(Array(total)).map((_, i) => ({
    items: [
      {
        children: (
          <>
            <span className="block font-semibold">Kasir & Pramuniaga</span>
            <span className="text-xs text-gray-500">#RR0000001</span>
          </>
        ),
      },
      { children: 'IT', className: 'text-center' },
      { children: '11/03/2024', className: 'text-center' },
      {
        children: (
          <span className="flex items-center justify-center gap-2">
            <span className="flex">
              <Avatar name="John Doe" size={38} className="rounded-full bg-success-100 text-success-700" />
              <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-primary-100 text-primary-700" />
              <Avatar name="Jane Doe" size={38} className="-ml-3 rounded-full bg-error-100 text-error-700" />
            </span>
            <a href="#" className="text-primary-600">
              56+
            </a>
          </span>
        ),
        className: 'text-center',
      },
      { children: <span className="text-sm font-semibold text-primary-600">Draf</span>, className: 'text-center' },
      {
        children: (
          <Menu as="div" className="relative">
            <Menu.Button as={Button} color="primary" size="small" block variant="light" className="text-xs">
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
        { children: 'Vacancy', className: 'text-left' },
        { children: 'Department' },
        { children: 'Posted Date' },
        { children: 'Number of Applicant' },
        { children: 'Status' },
        { children: 'Action', className: 'w-24' },
      ]}
      bodyItems={bodyItems}
    />
  )
}

export default Table
