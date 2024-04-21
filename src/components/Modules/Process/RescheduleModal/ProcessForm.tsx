import { processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, InputDate, InputTime, InputWrapper, ModalFooter, Select, Switch, Textarea, useToast } from 'jobseeker-ui'
import { ClockIcon } from 'lucide-react'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import SelectEmployees from './SelectEmployees'

const schema = yup.object({
  name: yup.string().required().label('Title'),
  date: yup.date().min(moment().add(-1, 'days').toDate()).required().label('Date'),
  startedAt: yup
    .string()
    .required()
    .test('started_at_test', '${label} must be before ended at', function (value) {
      return moment(value, 'HH:mm').isBefore(moment(this.parent.endedAt, 'HH:mm'))
    })
    .label('Started at'),
  endedAt: yup.string().required().label('Ended at'),
  timezone: yup.string().required().label('Timezone'),
  guests: yup.array().of(yup.string().email().required().label('Email')).min(1).required().label('Guests'),
  meet: yup.boolean(),
  location: yup.string().required().label('Location'),
  description: yup.string().required().label('Description'),
})

const timezones = [
  { label: '(GMT+07:00) Western Indonesian Time', value: 'Asia/Jakarta' },
  { label: '(GMT+08:00) Center Indonesian Time', value: 'Asia/Makassar' },
  { label: '(GMT+09:00) Eastern Indonesian Time', value: 'Asia/Jayapura' },
]

const getCurrentTimezone = () => {
  const currentDate = new Date()
  const offset = -currentDate.getTimezoneOffset()
  const offsetHours = Math.floor(Math.abs(offset) / 60)
  const offsetMinutes = Math.abs(offset) % 60
  const formattedOffset = `${offset < 0 ? '-' : '+'}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`
  if (formattedOffset === '+07:00') return 'Asia/Jakarta'
  if (formattedOffset === '+09:00') return 'Asia/Jayapura'
  return 'Asia/Makassar'
}

const ProcessForm: React.FC<{
  applicant?: IDataTableApplicant
  onClose?: () => void
  onSubmited?: () => void
}> = ({ applicant, onClose, onSubmited }) => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const toast = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    setValue('name', 'Reschedule')
    setValue('date', moment().toDate())
    setValue('startedAt', moment().add(60, 'minutes').format('HH:mm'))
    setValue('endedAt', moment().add(90, 'minutes').format('HH:mm'))
    setValue('timezone', getCurrentTimezone())
    setValue('meet', true)
  }, [setValue, trigger])

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      const startedAt = moment(moment(data.date).format('YYYY-MM-DD') + ' ' + data.startedAt, 'YYYY-MM-DD HH:mm').format(
        'YYYY-MM-DDTHH:mm:ss',
      )
      const endedAt = moment(moment(data.date).format('YYYY-MM-DD') + ' ' + data.endedAt, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DDTHH:mm:ss')
      await processService.rescheduleProcess({
        applicantId: applicant?.oid,
        schedule: {
          ...data,
          startedAt,
          endedAt,
          guests: [...data.guests, applicant?.candidate?.email].filter((el) => !!el),
          meet: !!data.meet,
        },
      })

      toast('Successfully regenerate schedule', { color: 'success' })

      onSubmited?.()
      onClose?.()
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
    }
    setLoading(false)
  })

  return (
    <form onSubmit={onSubmit} className="divide-y">
      <div className="grid grid-cols-1 gap-2 p-3">
        {errorMessage && (
          <Alert color="error" className="mb-3">
            {errorMessage}
          </Alert>
        )}

        <Input label="Title" labelRequired placeholder="Add Title" error={errors.name?.message} {...register('name')} />

        <InputDate
          placeholder="Pick date"
          label="Date"
          displayFormat="DD-MM-YYYY"
          minDate={moment().toDate()}
          error={errors.date?.message}
          value={getValues('date')}
          onValueChange={(v) => {
            setValue('date', v)
            trigger('date')
          }}
        />

        <div className="grid grid-cols-2 gap-2">
          <InputTime
            label="Started At"
            labelRequired
            error={errors.startedAt?.message}
            name="startedAt"
            value={watch('startedAt')}
            onValueChange={(v) => {
              setValue('startedAt', v)
              trigger('startedAt')
            }}
            rightChild={<ClockIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />}
          />
          <InputTime
            label="Ended At"
            labelRequired
            error={errors.endedAt?.message}
            name="endedAt"
            value={watch('endedAt')}
            onValueChange={(v) => {
              setValue('endedAt', v)
              trigger('startedAt')
              trigger('endedAt')
            }}
            rightChild={<ClockIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />}
          />
        </div>

        <Select
          label="Timezone"
          placeholder="Timezone"
          labelRequired
          hideSearch
          wrapperClassName="m-0"
          options={timezones}
          error={errors.timezone?.message}
          value={getValues('timezone')}
          onChange={(v) => {
            setValue('timezone', v.toString())
            trigger('timezone')
          }}
        />

        <div className="flex items-center gap-2 py-3">
          <Switch
            color="primary"
            id="generate-meet"
            value={!!watch('meet')}
            onChange={(v) => {
              setValue('meet', v)
              trigger('meet')
            }}
          />
          <label htmlFor="generate-meet" className="block text-sm">
            Add Google Meet Video Conferencing
          </label>
        </div>

        <InputWrapper label="Guests" labelRequired error={errors.guests?.message}>
          <SelectEmployees
            candidate={applicant?.candidate}
            onValueChange={(value) => {
              setValue('guests', value)
              trigger('guests')
            }}
          />
        </InputWrapper>

        <Input label="Location" labelRequired placeholder="Add Location" error={errors.location?.message} {...register('location')} />
        <Textarea
          rows={2}
          maxLength={156}
          label="Description"
          labelRequired
          placeholder="Add Description"
          error={errors.description?.message}
          {...register('description')}
        />
      </div>

      <ModalFooter className="gap-3">
        <Button color="primary" disabled={loading} loading={loading}>
          Reschedule
        </Button>
      </ModalFooter>
    </form>
  )
}

export default ProcessForm
