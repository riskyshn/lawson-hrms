import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Button, Input, InputTime, Select, useToast } from 'jobseeker-ui'
import { ClockIcon } from 'lucide-react'
import MainModal from '@/components/Elements/Modals/MainModal'
import { attendanceService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

type EditScheduleModalProps = {
  items?: ISchedule
  onApplyVacancy: (data: string) => void
  onClose?: () => void
  show: boolean
}

const EditScheduleModal: React.FC<EditScheduleModalProps> = ({ items, onApplyVacancy, onClose, show }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()
  const [timezones, setTimezones] = useState<ITimezone[]>()
  const [selectTimezoneId, setSelectTimezoneId] = useState<string | undefined>(items?.timezone?.oid)
  const { handleSubmit, register } = useForm()
  const [daySchedules, setDaySchedules] = useState<IScheduleDetail[]>(items?.details || [])

  useEffect(() => {
    fetchTimezone()
    if (items?.details) {
      setDaySchedules(items.details)
    }
  }, [items?.details])

  const fetchTimezone = async () => {
    try {
      const data = await attendanceService.fetchTimezones()
      setTimezones(data.content)
    } catch (error) {
      console.error('Error fetching timezone:', error)
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      let isFormValid = false
      let hasData = false

      daySchedules.forEach((schedule) => {
        if (schedule.start && schedule.end) {
          hasData = true
        }
      })

      isFormValid = hasData

      if (!isFormValid) {
        setErrorMessage('Start and end times must not be empty.')
        setIsLoading(false)
        return
      }

      const hasActiveSchedule = daySchedules.some((schedule) => schedule.isActive)

      if (!hasActiveSchedule) {
        setErrorMessage('No active schedule found!')
        setIsLoading(false)
        return
      }

      const payload = {
        details: daySchedules.map(({ day, end, isActive, start }) => ({
          day,
          end,
          isActive: start && end ? isActive : false,
          start,
        })),
        name: data.name,
        timezoneId: selectTimezoneId || items?.timezone?.oid || null,
      }

      await attendanceService.updateSchedule(items?.oid, payload)
      toast('Schedule updated successfully', { color: 'success' })
      const newData = new Date().toISOString()
      onApplyVacancy(newData)
      onClose?.()
      setIsLoading(false)
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
      setIsLoading(false)
    }
  })

  const handleInputChange = (index: number, field: string, value: boolean | string) => {
    setDaySchedules((prevState) => {
      const updatedSchedules = [...prevState]
      updatedSchedules[index] = { ...updatedSchedules[index], [field]: value }
      if (field === 'isActive') {
        const startTime = updatedSchedules[index].start
        const endTime = updatedSchedules[index].end
        if (!startTime || startTime === '00:00' || !endTime || endTime === '00:00') {
          updatedSchedules[index].isActive = false
        }
      }
      return updatedSchedules
    })
  }

  const handleChange = (selectedValue: string) => {
    setSelectTimezoneId(selectedValue)
  }

  const getDayFullName = (dayIndex: number | undefined) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return dayIndex !== undefined ? days[dayIndex] : ''
  }

  return (
    <MainModal className="max-w-xl" onClose={onClose} show={show}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <div className="mb-3">
          <h3 className="text-center text-2xl font-semibold">Edit Schedule</h3>
          <p className="text-center text-sm text-gray-500">Edit this schedule for your employee</p>
        </div>

        {errorMessage && <Alert color="error">{errorMessage}</Alert>}

        <Input defaultValue={items?.name} label="Schedule Name" labelRequired required {...register('name')} />

        <Select
          className="mb-3"
          label="Select Timezone"
          onChange={handleChange}
          options={timezones?.map((timezone) => ({ label: timezone.title, value: timezone.oid })) || []}
          placeholder="WIB, WITA, WIT"
          value={selectTimezoneId || items?.timezone?.oid || ''}
        />

        {daySchedules.map((schedule, index) => (
          <div className="mb-2" key={index}>
            <span className="text-xs">{getDayFullName(schedule?.day)}</span>

            <div className="flex flex-1 justify-between gap-4">
              <InputTime
                className="w-full"
                labelRequired
                onValueChange={(v) => {
                  handleInputChange(index, 'start', v)
                }}
                rightChild={<ClockIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />}
                value={schedule.start}
              />

              <InputTime
                className="w-full"
                labelRequired
                onValueChange={(v) => {
                  handleInputChange(index, 'end', v)
                }}
                rightChild={<ClockIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />}
                value={schedule.end}
              />

              <label className="inline-flex cursor-pointer items-center">
                <input
                  checked={schedule.isActive}
                  className="peer sr-only"
                  onChange={(e) => handleInputChange(index, 'isActive', e.target.checked)}
                  type="checkbox"
                />
                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
              </label>
            </div>
          </div>
        ))}

        <div className="mt-8 flex justify-end gap-3">
          <Button className="w-full" color="primary" disabled={isLoading} loading={isLoading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </MainModal>
  )
}

export default EditScheduleModal
