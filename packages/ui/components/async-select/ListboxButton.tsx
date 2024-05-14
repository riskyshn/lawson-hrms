import { forwardRef } from 'react'
import { Listbox } from '@headlessui/react'
import { ChevronsUpDownIcon, XIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type ListboxButtonProps = {
  id?: string
  value?: string
  placeholder?: string
  className?: string
  error?: boolean
  open?: boolean
  handleReset?: React.MouseEventHandler<HTMLSpanElement>
}

const ListboxButton = forwardRef<HTMLButtonElement, ListboxButtonProps>(
  ({ id, className, open, value, handleReset, placeholder, error }, ref) => {
    return (
      <Listbox.Button
        ref={ref}
        id={id}
        className={twMerge(
          open && 'open border-primary-600 bg-white',
          error ? '[&:not(.open)]:border-error-600 [&:not(.open)]:bg-error-50' : '[&:not(.open)]:border-gray-300 [&:not(.open)]:bg-white',
          'relative block h-10 w-full cursor-pointer rounded-lg border px-2 text-left text-sm text-gray-700 focus:outline-none',
          className,
        )}
      >
        {!!value && <span className="block truncate">{value}</span>}
        {!value && placeholder && (
          <span aria-placeholder={placeholder} className="block truncate text-gray-400">
            {placeholder}
          </span>
        )}

        <span
          className="absolute inset-y-0 right-0 flex cursor-pointer items-center justify-center gap-2 px-2 text-gray-400"
          aria-hidden="true"
        >
          {!!handleReset && !!value && (
            <>
              <span className="flex cursor-pointer items-center justify-center hover:text-red-600" onClick={handleReset}>
                <XIcon size={18} />
              </span>
              <span className="block h-1/3 w-px bg-gray-400" />
            </>
          )}
          <span className="flex items-center justify-center">
            <ChevronsUpDownIcon size={18} />
          </span>
        </span>
      </Listbox.Button>
    )
  },
)

ListboxButton.displayName = 'ListboxButton'

export default ListboxButton
