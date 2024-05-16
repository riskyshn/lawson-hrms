import { Menu } from '@headlessui/react'
import { Button, LoadingScreen } from 'jobseeker-ui'
import { twJoin } from 'tailwind-merge'
import { ActionMenuProps } from './types'

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
