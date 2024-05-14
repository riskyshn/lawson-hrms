import type { ITimezone } from '@/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Alert, Button, Input, InputTime, Select, useToast } from '@jshrms/ui'
import { ClockIcon } from 'lucide-react'
import MainModal from '@/components/Elements/Modals/MainModal'
import { attendanceService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

type DaySchedule = {
  day: string
  end: string
  isActive: boolean
  start: string
}

type CreateModalProps = {
  onApplyVacancy: (data: string) => void
  onClose?: () => void
  show: boolean
}

const initialDaySchedules: DaySchedule[] = [
  { day: 'Monday', end: '', isActive: false, start: '' },
  { day: 'Tuesday', end: '', isActive: false, start: '' },
  { day: 'Wednesday', end: '', isActive: false, start: '' },
  { day: 'Thursday', end: '', isActive: false, start: '' },
  { day: 'Friday', end: '', isActive: false, start: '' },
  { day: 'Saturday', end: '', isActive: false, start: '' },
  { day: 'Sunday', end: '', isActive: false, start: '' },
]

const CreateScheduleModal: React.FC<CreateModalProps> = ({ onApplyVacancy, onClose, show }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()
  const [timezones, setTimezones] = useState<ITimezone[]>()
  const [selectTimezoneId, setSelectTimezoneId] = useState<string>('')
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
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
        details: daySchedules.map(({ end, isActive, start }, index) => ({
          day: index,
          end,
          isActive: start && end ? isActive : false,
          start,
        })),
        name: data.name,
        timezoneId: selectTimezoneId,
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

  const handleInputChange = (index: number, field: keyof DaySchedule, value: boolean | string) => {
    setDaySchedules((prevSchedules) => {
      const updatedSchedules = [...prevSchedules]
      updatedSchedules[index] = { ...updatedSchedules[index], [field]: value }
      return updatedSchedules
    })
  }

  const handleChange = (value: string) => {
    setSelectTimezoneId(value)
  }

  const handleCloseModal = () => {
    reset()
    setSelectTimezoneId('')
    setDaySchedules(initialDaySchedules)
    onClose?.()
  }

  return (
    <MainModal className="max-w-xl" onClose={handleCloseModal} show={show}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <div className="mb-3">
          <h3 className="text-center text-2xl font-semibold">Add Schedule</h3>
          <p className="text-center text-sm text-gray-500">Add new schedules for your employee</p>
        </div>

        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        {errors.timezone && <Alert color="error">Timezone is required.</Alert>}

        <Input label="Schedule Name" labelRequired required {...register('name')} />
        <Select
          className="mb-3"
          label="Select Timezone"
          labelRequired
          options={timezones?.map(({ oid, title }) => ({ label: title, value: oid })) || []}
          placeholder="WIB, WITA, WIT"
          value={selectTimezoneId}
          {...register('timezone')}
          onChange={handleChange}
        />
        {daySchedules.map((schedule, index) => (
          <div className="mb-2" key={index}>
            <span className="text-xs">{schedule.day}</span>
            <div className="flex flex-1 items-center justify-between gap-4">
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
                  checked={schedule.isActive && schedule.start !== '' && schedule.end !== ''}
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

export default CreateScheduleModal
