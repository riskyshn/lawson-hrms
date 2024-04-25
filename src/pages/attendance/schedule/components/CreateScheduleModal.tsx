import MainModal from '@/components/Elements/Modals/MainModal'
import { Alert, Button, Input, Select, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { attendanceService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

type DaySchedule = {
  day: string
  start: string
  end: string
  isActive: boolean
}

type CreateModalProps = {
  show: boolean
  onClose?: () => void
  onApplyVacancy: (data: string) => void
}

const initialDaySchedules: DaySchedule[] = [
  { day: 'Monday', start: '', end: '', isActive: false },
  { day: 'Tuesday', start: '', end: '', isActive: false },
  { day: 'Wednesday', start: '', end: '', isActive: false },
  { day: 'Thursday', start: '', end: '', isActive: false },
  { day: 'Friday', start: '', end: '', isActive: false },
  { day: 'Saturday', start: '', end: '', isActive: false },
  { day: 'Sunday', start: '', end: '', isActive: false },
]

const CreateScheduleModal: React.FC<CreateModalProps> = ({ show, onClose, onApplyVacancy }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()
  const [timezones, setTimezones] = useState<ITimezone[]>()
  const [selectTimezoneId, setSelectTimezoneId] = useState<string | number>('')
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()
  const [daySchedules, setDaySchedules] = useState<DaySchedule[]>(initialDaySchedules)

  useEffect(() => {
    fetchTimezone()
  }, [])

  const fetchTimezone = async () => {
    try {
      const { content } = await attendanceService.fetchTimezones()
      setTimezones(content)
    } catch (error) {
      console.error('Error fetching timezones:', error)
    }
  }

  const onSubmit = handleSubmit(async (data) => {
    setIsLoading(true)
    setErrorMessage('')

    if (!selectTimezoneId) {
      setErrorMessage('Timezone is required.')
      setIsLoading(false)
      return
    }

    const hasActiveSchedule = daySchedules.some((schedule) => schedule.isActive)

    if (!hasActiveSchedule) {
      setErrorMessage('No active schedule found!')
      setIsLoading(false)
      return
    }

    try {
      const payload = {
        name: data.name,
        timezoneId: selectTimezoneId,
        details: daySchedules.map(({ start, end, isActive }, index) => ({
          day: index,
          start,
          end,
          isActive: start && end ? isActive : false,
        })),
      }

      await attendanceService.createSchedule(payload)
      toast('Schedule created successfully', { color: 'success' })
      onApplyVacancy(new Date().toISOString())
      handleCloseModal()
    } catch (error) {
      setErrorMessage(axiosErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  })

  const handleInputChange = (index: number, field: keyof DaySchedule, value: string | boolean) => {
    setDaySchedules((prevSchedules) => {
      const updatedSchedules = [...prevSchedules]
      updatedSchedules[index] = { ...updatedSchedules[index], [field]: value }
      return updatedSchedules
    })
  }

  const handleChange = (value: string | number) => {
    setSelectTimezoneId(value)
  }

  const handleCloseModal = () => {
    reset()
    setSelectTimezoneId('')
    setDaySchedules(initialDaySchedules)
    onClose?.()
  }

  return (
    <MainModal className="max-w-xl" show={show} onClose={handleCloseModal}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <div className="mb-3">
          <h3 className="text-center text-2xl font-semibold">Add Schedule</h3>
          <p className="text-center text-sm text-gray-500">Add new schedules for your employee</p>
        </div>

        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        {errors.timezone && <Alert color="error">Timezone is required.</Alert>}

        <Input labelRequired label="Schedule Name" required {...register('name')} />
        <Select
          labelRequired
          label="Select Timezone"
          placeholder="WIB, WITA, WIT"
          options={timezones?.map(({ oid, title }) => ({ value: oid, label: title })) || []}
          className="mb-3"
          value={selectTimezoneId}
          {...register('timezone')}
          onChange={handleChange}
        />
        {daySchedules.map((schedule, index) => (
          <div key={index} className="mb-2">
            <span className="text-xs">{schedule.day}</span>
            <div className="flex flex-1 items-center justify-between gap-4">
              <Input
                type="time"
                className="w-full"
                value={schedule.start}
                onChange={(e) => handleInputChange(index, 'start', e.target.value)}
              />
              <Input
                type="time"
                className="w-full"
                value={schedule.end}
                onChange={(e) => handleInputChange(index, 'end', e.target.value)}
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

export default CreateScheduleModal
