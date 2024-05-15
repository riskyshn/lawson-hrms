import React from 'react'
import { Menu } from '@headlessui/react'
import { Button, LoadingScreen } from 'jobseeker-ui'
import { InboxIcon, LucideIcon } from 'lucide-react'
import { twJoin, twMerge } from 'tailwind-merge'

export type MainTableProps = {
  bodyItems: Array<
    {
      items?: Array<JSX.IntrinsicElements['td']>
    } & JSX.IntrinsicElements['tr']
  >
  headerItems: Array<JSX.IntrinsicElements['th']>
  loading?: boolean
} & Omit<JSX.IntrinsicElements['table'], 'children'>

export type ActionMenuProps = React.PropsWithChildren<{
  loading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  text?: string
  up?: boolean
}>

export type ActionMenuItemProps = {
  action?: React.MouseEventHandler<HTMLButtonElement>
  icon: LucideIcon
  iconClassName?: string
  text: string
}

export const MainTable: React.FC<MainTableProps> = ({ bodyItems, className, headerItems, loading, ...props }) => {
  return (
    <div className="flex min-h-[500px] w-full flex-col">
      {!loading && (
        <table className={twMerge('table w-full whitespace-nowrap', className)} {...props}>
          <thead>
            <tr>
              {headerItems.map(({ className, ...props }, i) => (
                <th className={twMerge('border-b p-3 text-center text-xs', className)} key={i} {...props} />
              ))}
            </tr>
          </thead>
          <tbody>
            {!loading &&
              bodyItems.map(({ children, className, items, ...props }, i) => (
                <tr className={twMerge(className, 'odd:bg-gray-50')} key={i} {...props}>
                  {items?.map(({ className, ...props }, i) => <td className={twMerge('p-3 text-sm', className)} key={i} {...props} />)}
                  {children}
                </tr>
              ))}
          </tbody>
        </table>
      )}

      <LoadingScreen className="flex-1 p-0" show={loading} spinnerSize={80} strokeWidth={1} />

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

export const ActionMenu: React.FC<ActionMenuProps> = ({ children, loading, onClick, text = 'Action', up }) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Button} block className="text-xs" color="primary" onClick={onClick} size="small" variant="light">
        {text}
      </Menu.Button>
      <Menu.Items
        className={twJoin(
          'absolute right-0 z-20 w-64 overflow-hidden rounded-lg border-gray-100 bg-white p-1 shadow-lg ring-[1px] ring-gray-100 focus:outline-none',
          up && 'bottom-full',
        )}
      >
        {loading && <LoadingScreen className="h-64 py-0" show />}
        {!loading && children}
      </Menu.Items>
    </Menu>
  )
}

export const ActionMenuItem: React.FC<ActionMenuItemProps> = ({ action, icon, iconClassName, text }) => {
  const IconTag = icon
  return (
    <Menu.Item>
      {({ active }) => (
        <button
          className={twJoin(active && 'bg-primary-100', 'group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm')}
          onClick={action}
          type="button"
        >
          <IconTag className={twMerge('h-4 w-4', active ? 'text-primary-600' : 'text-gray-400', iconClassName)} />
          {text}
        </button>
      )}
    </Menu.Item>
  )
}

export default MainTable
