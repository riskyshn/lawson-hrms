import MainModal from '@/components/Elements/Modals/MainModal'
import { Input, Select } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { attendanceService } from '@/services'

type ViewScheduleModalProps = {
  show: boolean
  onClose?: () => void
  items?: ISchedule
}

const ViewScheduleModal: React.FC<ViewScheduleModalProps> = ({ show, onClose, items }) => {
  const [timezones, setTimezones] = useState<any[]>([])
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
    <MainModal className="max-w-xl" show={show} onClose={onClose}>
      <div className="mb-3">
        <h3 className="text-center text-2xl font-semibold">Schedule Details</h3>
        <p className="text-center text-sm text-gray-500">Details for this schedule</p>
      </div>

      <Input labelRequired label="Schedule Name" defaultValue={items?.name} disabled />
      <Select
        disabled
        label="Select Timezone"
        placeholder="WIB, WITA, WIT"
        options={timezones.map((timezone) => ({ value: timezone.oid, label: timezone.title }))}
        className="mb-3"
        value={items?.timezone?.oid}
      />

      {items && items.details && (
        <>
          {items.details.map((schedule, index) => (
            <div key={index} className="mb-2">
              <span className="text-xs">{schedule.day !== undefined ? daysOfWeek[schedule?.day] : ''}</span>
              <div className="flex flex-1 justify-between gap-4">
                <Input type="time" className="w-full" value={schedule.start} disabled />
                <Input type="time" className="w-full" value={schedule.end} disabled />
                <label className="inline-flex cursor-pointer items-center">
                  <input type="checkbox" className="peer sr-only" checked={schedule?.isActive} disabled />
                  <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
                </label>
              </div>
            </div>
          ))}
        </>
      )}
    </MainModal>
  )
}

export default ViewScheduleModal
