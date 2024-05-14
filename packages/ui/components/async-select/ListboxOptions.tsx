import type { OptionProps } from '../../types'
import React, { forwardRef, Fragment, useEffect, useRef } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { Spinner } from '../spinner'

type ListboxOptionsProps = {
  options: Array<OptionProps>
  isSingle?: boolean
  open?: boolean
  loading?: boolean
  searchPlaceholder?: string
  message?: string
  endOfRoot?: React.ReactNode
  value?: OptionProps | OptionProps[] | null
  search?: {
    value: string
    onValueChange: (value: string) => void
  }
}

const ListboxOptions = forwardRef<HTMLUListElement, ListboxOptionsProps>(
  ({ message, options, searchPlaceholder, isSingle, open, loading, value, search, endOfRoot }, rootRef) => {
    const searchRef = useRef<HTMLInputElement>(null)

    useEffect(() => {
      if (!open) return
      setTimeout(() => {
        searchRef.current?.focus()
      }, 150)
    }, [open])

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
      if (event.key === ' ') {
        event.preventDefault()

        if (!search) return

        const input = event.target as HTMLInputElement
        const { selectionStart, selectionEnd, value } = input
        // @ts-expect-error
        const newValue = value.substring(0, selectionStart) + ' ' + value.substring(selectionEnd)
        search.onValueChange(newValue)
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
          {!!search && (
            <input
              ref={searchRef}
              placeholder={searchPlaceholder || 'Search Option...'}
              className="block w-full border-b p-2 text-sm leading-6 outline-none"
              value={search?.value}
              onClick={(e) => e.preventDefault()}
              onChange={(e) => search?.onValueChange(e.currentTarget.value)}
              onKeyDown={handleKeyDown}
            />
          )}
          <ul ref={rootRef} className="flex max-h-60 w-full flex-col overflow-auto focus:outline-none">
            {options.map((option, optionIndex) => {
              let selected = false

              if (value) {
                selected = Array.isArray(value) ? value.map((el) => el.value).includes(option.value) : option.value === value?.value
              }

              return (
                <Listbox.Option
                  key={optionIndex}
                  className={({ active }) =>
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
                  <>
                    <span className={`block truncate`}>{option.label}</span>
                    {selected && !isSingle ? (
                      <span className="absolute inset-y-0 right-0 flex items-center pr-2 text-primary-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                </Listbox.Option>
              )
            })}

            {loading && (
              <li className="flex flex-1 items-center justify-center py-12">
                <Spinner className="block h-10 w-10 text-primary-600" strokeWidth={1.5} />
              </li>
            )}
            {message && (
              <li className="flex w-full flex-1 items-center justify-center px-2 py-8 text-center text-lg text-gray-600">{message}</li>
            )}
            {endOfRoot}
          </ul>
        </Listbox.Options>
      </Transition>
    )
  },
)

ListboxOptions.displayName = 'ListboxOptions'

export default ListboxOptions
