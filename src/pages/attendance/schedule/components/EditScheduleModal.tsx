import MainModal from '@/components/Elements/MainModal'
import { Alert, Button, Input, Select, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { attendanceService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

type EditScheduleModalProps = {
  show: boolean
  onClose?: () => void
  onApplyVacancy: (data: string) => void
  items: any
}

const EditScheduleModal: React.FC<EditScheduleModalProps> = ({ show, onClose, onApplyVacancy, items }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()
  const [timezones, setTimezones] = useState<any[]>([])
  const [selectTimezoneId, setSelectTimezoneId] = useState<string | number>(items.timezoneId)
  const { register, handleSubmit } = useForm()
  const [daySchedules, setDaySchedules] = useState<any[]>(items.details || [])

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      const hasActiveSchedule = daySchedules.some((schedule) => schedule.isActive)

      if (!hasActiveSchedule) {
        setErrorMessage('No active schedule found!')
        setIsLoading(false)
        return
      }

      const payload = {
        name: data.name,
        timezoneId: selectTimezoneId || items?.timezone?.oid || null,
        details: daySchedules.map(({ day, start, end, isActive }) => ({
          day,
          start,
          end,
          isActive: start && end ? isActive : false,
        })),
      }

      await attendanceService.updateSchedule(items.oid, payload)
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

  const handleInputChange = (index: number, field: string, value: string | boolean) => {
    setDaySchedules((prevState) => {
      const updatedSchedules = [...prevState]
      updatedSchedules[index] = { ...updatedSchedules[index], [field]: value }
      return updatedSchedules
    })
  }

  const handleChange = (selectedValue: string | number) => {
    setSelectTimezoneId(selectedValue)
  }

  const getDayFullName = (dayIndex: number) => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    return days[dayIndex]
  }

  return (
    <MainModal className="max-w-xl" show={show} onClose={onClose}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <div className="mb-3">
          <h3 className="text-center text-2xl font-semibold">Edit Schedule</h3>
          <p className="text-center text-sm text-gray-500">Edit this schedule for your employee</p>
        </div>

        {errorMessage && <Alert color="error">{errorMessage}</Alert>}

        <Input label="Schedule Name" defaultValue={items.name} labelRequired required {...register('name')} />
        <Select
          label="Select Timezone"
          placeholder="WIB, WITA, WIT"
          options={timezones.map((timezone) => ({ value: timezone.oid, label: timezone.title }))}
          className="mb-3"
          value={items?.timezone?.oid}
          onChange={handleChange}
        />

        {daySchedules.map((schedule, index) => (
          <div key={index} className="mb-2">
            <span className="text-xs">{getDayFullName(schedule.day)}</span>

            <div className="flex flex-1 justify-between gap-4">
              <Input
                type="time"
                className="w-full"
                value={schedule.start}
                onChange={(e) => handleInputChange(index, 'start', e.target.value)}
                defaultValue={schedule.start || '00:00'}
              />
              <Input
                type="time"
                className="w-full"
                value={schedule.end}
                onChange={(e) => handleInputChange(index, 'end', e.target.value)}
                defaultValue={schedule.end || '00:00'}
              />
              <label className="inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  className="peer sr-only"
                  checked={schedule.isActive && schedule.start !== '' && schedule.end !== ''}
                  onChange={(e) => handleInputChange(index, 'isActive', e.target.checked)}
                />
                <div className="peer relative h-6 w-11 rounded-full bg-gray-200 after:absolute after:start-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800 rtl:peer-checked:after:-translate-x-full"></div>
              </label>
            </div>
          </div>
        ))}

        <div className="mt-8 flex justify-end gap-3">
          <Button type="submit" color="primary" className="w-full" disabled={isLoading} loading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </MainModal>
  )
}

export default EditScheduleModal
