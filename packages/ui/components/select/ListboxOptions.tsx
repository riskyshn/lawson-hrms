import type { OptionProps } from '../../types'
import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type ListboxOptionsProps = {
  noResults?: string
  options: Array<OptionProps>
  searchPlaceholder?: string
  open?: boolean
  hideSearch?: boolean
  isSingle?: boolean
}

const ListboxOptions: React.FC<ListboxOptionsProps> = ({ noResults, options, searchPlaceholder, open, hideSearch, isSingle }) => {
  const searchRef = useRef<HTMLInputElement>(null)
  const [search, setSearch] = useState('')

  const filteredOptions = useMemo(() => {
    const filter = (search: string, option: OptionProps) => {
      return option.label?.toLowerCase().replace(/\s+/g, '').includes(search.toLowerCase().replace(/\s+/g, ''))
    }
    return search ? options.filter((option) => filter(search, option)) : options
  }, [options, search])

  useEffect(() => {
    if (!open) return
    setTimeout(() => {
      searchRef.current?.focus()
    }, 150)
  }, [open])

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === ' ') {
      event.preventDefault()
      const input = event.target as HTMLInputElement
      const { selectionStart, selectionEnd, value } = input
      // @ts-expect-error
      const newValue = value.substring(0, selectionStart) + ' ' + value.substring(selectionEnd)
      setSearch(newValue)
      // @ts-expect-error
      const newCursorPosition = selectionStart + 1
      setTimeout(() => {
        input.setSelectionRange(newCursorPosition, newCursorPosition)
      })
    }
  }

  return (
    <Transition
      as={Fragment}
      leave="transition ease-in"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <Listbox.Options as="div" className="absolute z-20 mt-px w-full overflow-hidden rounded-lg border bg-white shadow-lg">
        {!hideSearch && (
          <input
            ref={searchRef}
            placeholder={searchPlaceholder || 'Search Option...'}
            className="block w-full border-b p-2 text-sm leading-6 outline-none"
            value={search}
            onClick={(e) => e.preventDefault()}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        )}
        {filteredOptions.length ? (
          <ul className="max-h-60 w-full overflow-auto focus:outline-none">
            {filteredOptions.map((option, optionIndex) => (
              <Listbox.Option
                key={optionIndex}
                className={({ active, selected }) =>
                  twMerge(
                    'relative w-full cursor-default select-none py-2 text-sm',
                    selected && 'bg-primary-50',
                    active && 'bg-primary-100',
                    isSingle && 'px-3',
                    !isSingle && 'pl-3 pr-10',
                  )
                }
                value={option}
              >
                {({ selected }) => (
                  <>
                    <span className={`block truncate`}>{option.label}</span>
                    {selected && !isSingle ? (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-primary-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </ul>
        ) : (
          <span className="block w-full px-2 py-8 text-center text-lg text-gray-600">{noResults || 'No results'}</span>
        )}
      </Listbox.Options>
    </Transition>
  )
}

export default ListboxOptions
