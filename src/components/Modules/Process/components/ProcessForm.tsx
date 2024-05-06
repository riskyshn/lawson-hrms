import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, InputDate, InputTime, InputWrapper, ModalFooter, Select, Switch, Textarea, useToast } from 'jobseeker-ui'
import { ClockIcon } from 'lucide-react'
import moment from 'moment'
import * as yup from 'yup'
import { processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import SelectEmployees from './SelectEmployees'

const schema = yup.object({
  date: yup.date().min(moment().add(-1, 'days').toDate()).required().label('Date'),
  description: yup.string().required().label('Description'),
  endedAt: yup.string().required().label('Ended at'),
  guests: yup.array().of(yup.string().email().required().label('Email')).min(1).required().label('Guests'),
  location: yup.string().required().label('Location'),
  meet: yup.boolean(),
  name: yup.string().required().label('Title'),
  startedAt: yup
    .string()
    .required()
    .test('started_at_test', '${label} must be before ended at', function (value) {
      return moment(value, 'HH:mm').isBefore(moment(this.parent.endedAt, 'HH:mm'))
    })
    .label('Started at'),
  timezone: yup.string().required().label('Timezone'),
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
  onPrev?: () => void
  onSubmited?: () => void
  stage: IApplicantStage
}> = ({ applicant, onClose, onPrev, onSubmited, stage }) => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const toast = useToast()
  const navigate = useNavigate()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    setValue('name', stage.name)
    setValue('date', moment().toDate())
    setValue('startedAt', moment().add(60, 'minutes').format('HH:mm'))
    setValue('endedAt', moment().add(90, 'minutes').format('HH:mm'))
    setValue('timezone', getCurrentTimezone())
    setValue('meet', true)
  }, [stage, setValue, trigger])

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      const startedAt = moment(moment(data.date).format('YYYY-MM-DD') + ' ' + data.startedAt, 'YYYY-MM-DD HH:mm').format(
        'YYYY-MM-DDTHH:mm:ss',
      )
      const endedAt = moment(moment(data.date).format('YYYY-MM-DD') + ' ' + data.endedAt, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DDTHH:mm:ss')
      await processService.updateProcess({
        applicantId: applicant?.oid,
        schedule: {
          ...data,
          endedAt,
          guests: [...data.guests, applicant?.candidate?.email].filter((el) => !!el),
          meet: !!data.meet,
          startedAt,
        },
        stageId: stage.oid,
      })

      toast('Process updated successfully', { color: 'success' })
      navigate(`/process/${stage.type.toLowerCase()}`)
      setTimeout(() => {
        onPrev?.()
      }, 200)
      onSubmited?.()
      onClose?.()
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
    }
    setLoading(false)
  })

  return (
    <form className="divide-y" onSubmit={onSubmit}>
      <div className="grid grid-cols-1 gap-2 p-3">
        {errorMessage && (
          <Alert className="mb-3" color="error">
            {errorMessage}
          </Alert>
        )}

        <Input error={errors.name?.message} label="Title" labelRequired placeholder="Add Title" {...register('name')} />

        <InputDate
          displayFormat="DD-MM-YYYY"
          error={errors.date?.message}
          label="Date"
          minDate={moment().toDate()}
          onValueChange={(v) => {
            setValue('date', v)
            trigger('date')
          }}
          placeholder="Pick date"
          value={getValues('date')}
        />

        <div className="grid grid-cols-2 gap-2">
          <InputTime
            error={errors.startedAt?.message}
            label="Started At"
            labelRequired
            name="startedAt"
            onValueChange={(v) => {
              setValue('startedAt', v)
              trigger('startedAt')
            }}
            rightChild={<ClockIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />}
            value={watch('startedAt')}
          />
          <InputTime
            error={errors.endedAt?.message}
            label="Ended At"
            labelRequired
            name="endedAt"
            onValueChange={(v) => {
              setValue('endedAt', v)
              trigger('startedAt')
              trigger('endedAt')
            }}
            rightChild={<ClockIcon className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" size={16} />}
            value={watch('endedAt')}
          />
        </div>

        <Select
          error={errors.timezone?.message}
          hideSearch
          label="Timezone"
          labelRequired
          onChange={(v) => {
            setValue('timezone', v.toString())
            trigger('timezone')
          }}
          options={timezones}
          placeholder="Timezone"
          value={getValues('timezone')}
          wrapperClassName="m-0"
        />

        <div className="flex items-center gap-2 py-3">
          <Switch
            color="primary"
            id="generate-meet"
            onChange={(v) => {
              setValue('meet', v)
              trigger('meet')
            }}
            value={!!watch('meet')}
          />
          <label className="block text-sm" htmlFor="generate-meet">
            Add Google Meet Video Conferencing For Online <span className="capitalize">{stage.type.toLowerCase()}</span>
          </label>
        </div>

        <InputWrapper error={errors.guests?.message} label="Guests" labelRequired>
          <SelectEmployees
            candidate={applicant?.candidate}
            onValueChange={(value) => {
              setValue('guests', value)
              trigger('guests')
            }}
          />
        </InputWrapper>

        <Input error={errors.location?.message} label="Location" labelRequired placeholder="Add Location" {...register('location')} />
        <Textarea
          error={errors.description?.message}
          label="Description"
          labelRequired
          maxLength={156}
          placeholder="Add Description"
          rows={2}
          {...register('description')}
        />
      </div>

      <ModalFooter className="gap-3">
        <Button className="w-24" color="error" disabled={loading} onClick={onPrev} type="button" variant="light">
          Prev
        </Button>
        <Button color="primary" disabled={loading} loading={loading}>
          Add an Interview
        </Button>
      </ModalFooter>
    </form>
  )
}

export default ProcessForm
