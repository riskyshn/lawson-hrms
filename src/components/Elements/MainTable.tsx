import React from 'react'
import { Menu } from '@headlessui/react'
import { Button } from 'jobseeker-ui'
import { LucideIcon } from 'lucide-react'
import { twJoin, twMerge } from 'tailwind-merge'

export type MainTableProps = Omit<JSX.IntrinsicElements['table'], 'children'> & {
  headerItems: Array<JSX.IntrinsicElements['th']>
  bodyItems: Array<
    Omit<JSX.IntrinsicElements['tr'], 'children'> & {
      items: Array<JSX.IntrinsicElements['td']>
    }
  >
}

export type ActionMenuProps = React.PropsWithChildren<{
  up?: boolean
  text?: string
}>

export type ActionMenuItemProps = {
  text: string
  icon: LucideIcon
  iconClassName?: string
  action?: React.MouseEventHandler<HTMLButtonElement>
}

export const MainTable: React.FC<MainTableProps> = ({ className, headerItems, bodyItems, ...props }) => {
  return (
    <table className={twMerge('table w-full whitespace-nowrap', className)} {...props}>
      <thead>
        <tr>
          {headerItems.map(({ className, ...props }, i) => (
            <th key={i} className={twMerge('border-b p-3 text-center text-xs', className)} {...props} />
          ))}
        </tr>
      </thead>
      <tbody>
        {bodyItems.map(({ className, items, ...props }, i) => (
          <tr key={i} className={twMerge(className, 'odd:bg-gray-50')} {...props}>
            {items.map(({ className, ...props }, i) => (
              <td key={i} className={twMerge('p-3 text-sm', className)} {...props} />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ children, up, text = 'Action' }) => {
  return (
    <Menu as="div" className="relative">
      <Menu.Button as={Button} color="primary" variant="light" size="small" block className="text-xs">
        {text}
      </Menu.Button>
      <Menu.Items
        className={twJoin(
          'absolute right-0 z-20 w-56 overflow-hidden rounded-lg border-gray-100 bg-white p-1 shadow-lg ring-[1px] ring-gray-100 focus:outline-none',
          up && 'bottom-full',
        )}
      >
        {children}
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
