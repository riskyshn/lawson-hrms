import React, { forwardRef, Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { BaseInput } from '../input/BaseInput'
import { BaseInputTimeProps } from './types'

const BaseInputTime = forwardRef<HTMLInputElement, BaseInputTimeProps>(({ value, onValueChange, ...props }, ref) => {
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)

  const onBlur = () => {
    if (hour >= 24) {
      setHour(0)
    } else if (hour < 0) {
      setHour(23)
    }

    if (minute >= 60) {
      setMinute(0)
    } else if (minute < 0) {
      setMinute(59)
    }
  }

  const formatTwoDigitNumber = (num: number): string => {
    if (isNaN(num)) return '00'
    return num.toString().padStart(2, '0')
  }

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setHour(isNaN(value) ? 0 : value)
  }

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    setMinute(isNaN(value) ? 0 : value)
  }

  const handleHourUp = () => setHour((hour + 1) % 24)

  const handleHourDown = () => setHour(hour === 0 ? 23 : hour - 1)

  const handleMinuteUp = () => {
    const newMinute = (minute + 1) % 60
    setMinute(newMinute)
    if (newMinute === 0) handleHourUp()
  }

  const handleMinuteDown = () => {
    const newMinute = minute === 0 ? 59 : minute - 1
    setMinute(newMinute)
    if (newMinute === 59) handleHourDown()
  }

  useEffect(() => {
    onValueChange?.(formatTwoDigitNumber(hour) + ':' + formatTwoDigitNumber(minute))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hour, minute])

  useEffect(() => {
    const [hour, minute] = (value || '0:0').toString().split(':')
    setHour(isNaN(parseInt(hour)) ? 0 : parseInt(hour))
    setMinute(isNaN(parseInt(minute)) ? 0 : parseInt(minute))
  }, [value])

  return (
    <Menu as="div" className="relative">
      <Menu.Button as={BaseInput} ref={ref as React.Ref<HTMLButtonElement>} type="text" value={value} {...props} readOnly />
      <Transition
        as={Fragment}
        leave="transition ease-in"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Menu.Items className="absolute left-0 right-0 z-20  mt-px flex w-full overflow-hidden rounded-lg border bg-white p-1 shadow-lg outline-none">
          <div className="flex flex-1 flex-col items-center justify-center gap-1">
            <button
              type="button"
              className="flex w-full max-w-32 items-center justify-center rounded-lg py-1 text-gray-500 hover:bg-gray-100"
              onClick={handleHourUp}
            >
              <ChevronUpIcon size={14} />
            </button>
            <div>
              <input
                type="text"
                className="block w-full max-w-32 rounded-lg p-1 text-center text-lg outline-none focus:bg-gray-100"
                value={formatTwoDigitNumber(hour)}
                onChange={handleHourChange}
                onBlur={onBlur}
              />
            </div>
            <button
              type="button"
              className="flex w-full max-w-32 items-center justify-center rounded-lg py-1 text-gray-500 hover:bg-gray-100"
              onClick={handleHourDown}
            >
              <ChevronDownIcon size={14} />
            </button>
          </div>
          <span className="flex items-center justify-center text-2xl leading-none">:</span>
          <div className="flex flex-1 flex-col items-center justify-center gap-1">
            <button
              type="button"
              className="flex w-full max-w-32 items-center justify-center rounded-lg py-1 text-gray-500 hover:bg-gray-100"
              onClick={handleMinuteUp}
            >
              <ChevronUpIcon size={14} />
            </button>
            <div>
              <input
                type="text"
                className="block w-full max-w-32 rounded-lg p-1 text-center text-lg outline-none focus:bg-gray-100"
                value={formatTwoDigitNumber(minute)}
                onChange={handleMinuteChange}
                onBlur={onBlur}
              />
            </div>
            <button
              type="button"
              className="flex w-full max-w-32 items-center justify-center rounded-lg py-1 text-gray-500 hover:bg-gray-100"
              onClick={handleMinuteDown}
            >
              <ChevronDownIcon size={14} />
            </button>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
})

BaseInputTime.displayName = 'BaseInputTime'

export default BaseInputTime
