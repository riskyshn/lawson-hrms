import { Menu } from '@headlessui/react'
import { Button } from 'jobseeker-ui'
import { InboxIcon, LucideIcon } from 'lucide-react'
import React from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import LoadingScreen from '../Layout/LoadingScreen'

export type MainTableProps = Omit<JSX.IntrinsicElements['table'], 'children'> & {
  loading?: boolean
  headerItems: Array<JSX.IntrinsicElements['th']>
  bodyItems: Array<
    JSX.IntrinsicElements['tr'] & {
      items?: Array<JSX.IntrinsicElements['td']>
    }
  >
}

export type ActionMenuProps = React.PropsWithChildren<{
  up?: boolean
  text?: string
  loading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}>

export type ActionMenuItemProps = {
  text: string
  icon: LucideIcon
  iconClassName?: string
  action?: React.MouseEventHandler<HTMLButtonElement>
}

export const MainTable: React.FC<MainTableProps> = ({ className, headerItems, bodyItems, loading, ...props }) => {
  return (
    <div className="flex min-h-[500px] w-full flex-col">
      {!loading && (
        <table className={twMerge('table w-full whitespace-nowrap', className)} {...props}>
          <thead>
            <tr>
              {headerItems.map(({ className, ...props }, i) => (
                <th key={i} className={twMerge('border-b p-3 text-center text-xs', className)} {...props} />
              ))}
            </tr>
          </thead>
          <tbody>
            {!loading &&
              bodyItems.map(({ className, items, children, ...props }, i) => (
                <tr key={i} className={twMerge(className, 'odd:bg-gray-50')} {...props}>
                  {items?.map(({ className, ...props }, i) => <td key={i} className={twMerge('p-3 text-sm', className)} {...props} />)}
                  {children}
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <LoadingScreen show={loading} className="flex-1 p-0" />

      {!loading && bodyItems.length === 0 && (
        <div className="flex flex-1 flex-col items-center justify-center">
          <div className="mb-4 flex animate-pulse justify-center text-gray-900">
            <InboxIcon className="h-28 w-28 md:h-32 md:w-32" strokeWidth={0.5} />
          </div>
          <p className="font-ligh mx-auto max-w-lg text-center">
            This table is currently empty. You can also try adjusting or removing the filter to view data.
          </p>
        </div>
      )}
    </div>
  )
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ loading, onClick, children, up, text = 'Action' }) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Button} color="primary" variant="light" size="small" block className="text-xs" onClick={onClick}>
        {text}
      </Menu.Button>
      <Menu.Items
        className={twJoin(
          'absolute right-0 z-20 w-64 overflow-hidden rounded-lg border-gray-100 bg-white p-1 shadow-lg ring-[1px] ring-gray-100 focus:outline-none',
          up && 'bottom-full',
        )}
      >
        {loading && <LoadingScreen show className="h-64 py-0" />}
        {!loading && children}
      </Menu.Items>
    </Menu>
  )
}

export const ActionMenuItem: React.FC<ActionMenuItemProps> = ({ text, icon, iconClassName, action }) => {
  const IconTag = icon
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          type="button"
          className={twJoin(active && 'bg-primary-100', 'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm')}
          onClick={action}
        >
          <IconTag className={twMerge('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400', iconClassName)} />
          {text}
        </button>
      )}
    </Menu.Item>
  )
}

export default MainTable
