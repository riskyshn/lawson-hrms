import { Menu } from '@headlessui/react'
import { Button } from 'jobseeker-ui'
import { EditIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'

const total = 20

const Table: React.FC = () => {
  return (
    <table className="table w-full whitespace-nowrap">
      <thead>
        <tr>
          <th className="border-b p-3 text-left text-xs">Vacancy</th>
          <th className="border-b p-3 text-center text-xs">Department</th>
          <th className="border-b p-3 text-center text-xs">Posted Date</th>
          <th className="border-b p-3 text-center text-xs">Status</th>
          <th className="w-24 border-b p-3 text-center text-xs">Action</th>
        </tr>
      </thead>
      <tbody>
        {Array.from(Array(total)).map((_, i) => (
          <tr key={i} className="odd:bg-gray-50">
            <td className="px-3 text-left text-sm">
              <span className="block font-semibold">Kasir & Pramuniaga</span>
              <span className="text-xs text-gray-500">#RR0000001</span>
            </td>
            <td className="px-3 text-center text-sm">IT</td>
            <td className="px-3 text-center text-sm">11/03/2024</td>
            <td className="px-3 text-center text-sm">
              <span className="text-sm font-semibold text-primary-600">Draf</span>
            </td>
            <td className="p-3 text-center text-sm">
              <Menu as="div" className="relative">
                <Menu.Button as={Button} color="primary" size="small" block variant="light" className="text-xs">
                  Action
                </Menu.Button>
                <Menu.Items
                  className={twJoin(
                    i > total - 4 && 'bottom-full',
                    'absolute right-0 z-20 w-56 overflow-hidden rounded-lg border-gray-100 bg-white p-1 shadow-lg ring-[1px] ring-gray-100 focus:outline-none',
                  )}
                >
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={twJoin('group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm', active && 'bg-primary-100')}
                      >
                        <EditIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                        Option 1
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={twJoin('group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm', active && 'bg-primary-100')}
                      >
                        <EditIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                        Option 2
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={twJoin('group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm', active && 'bg-primary-100')}
                      >
                        <EditIcon className={twJoin('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400')} />
                        Option 3
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Menu>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default Table
