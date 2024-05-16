import type { ISchedule, ITimezone } from '@/types'
import React, { useEffect, useState } from 'react'
import { Input, InputTime, Modal, ModalHeader, Select } from 'jobseeker-ui'
import { ClockIcon } from 'lucide-react'
import { attendanceService } from '@/services'

type ViewScheduleModalProps = {
  items?: ISchedule
  onClose?: () => void
  show: boolean
}

const ViewScheduleModal: React.FC<ViewScheduleModalProps> = ({ items, onClose, show }) => {
  const [timezones, setTimezones] = useState<ITimezone[]>()
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

  useEffect(() => {
    fetchTimezone()
  }, [])

  const fetchTimezone = async () => {
    try {
      const data = await attendanceService.fetchTimezones()
      setTimezones(data.content)
    } catch (error) {
      console.error('Error fetching timezone:', error)
    }
  }

  return (
    <Modal onClose={onClose} show={show}>
      <ModalHeader subTitle="Schedule DetailsDetails for this schedule">Details for this schedule</ModalHeader>
      <div className="p-3">
        <Input defaultValue={items?.name} disabled label="Schedule Name" labelRequired />
        <Select
          className="mb-3"
          disabled
          label="Select Timezone"
          options={timezones?.map((timezone) => ({ label: timezone.title, value: timezone.oid })) || []}
          placeholder="WIB, WITA, WIT"
          value={items?.timezone?.oid}
        />

        {items && items.details && (
          <>
            {items.details.map((schedule, index) => (
              <div className="mb-2" key={index}>
                <span className="text-xs">{schedule.day !== undefined ? daysOfWeek[schedule?.day] : ''}</span>
                <div className="flex flex-1 justify-between gap-4">
                  <InputTime
                    className="w-full"
                    disabled
                    labelRequired
                    rightChild={
                      <ClockIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    }
                    value={schedule.start}
                  />
                  <InputTime
                    className="w-full"
                    disabled
                    labelRequired
                    rightChild={
                      <ClockIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                    }
                    value={schedule.end}
                  />
                  <label className="inline-flex cursor-pointer items-center">
                    <input checked={schedule?.isActive} className="peer sr-only" disabled type="checkbox" />
                    <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                  </label>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </Modal>
  )
}

export default ViewScheduleModal
