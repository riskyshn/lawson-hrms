import { Menu } from '@headlessui/react'
import { twJoin, twMerge } from 'tailwind-merge'
import { ActionMenuItemProps } from './types'

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
