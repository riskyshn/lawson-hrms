import { employeeService, processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, InputCheckbox, InputDate, MultiSelect, OptionProps, Select, Textarea, useToast } from 'jobseeker-ui'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

const schema = yup.object({
  name: yup.string().required().label('Title'),
  date: yup.date().min(moment().add(-1, 'days').toDate()).required().label('Date'),
  startedAt: yup
    .string()
    .required()
    .test('started_at_test', '${label} must be before ended at', function (value) {
      return moment(value, 'HH:mm').isSameOrBefore(moment(this.parent.endedAt, 'HH:mm'))
    })
    .label('Started at'),
  endedAt: yup.string().required().label('Ended at'),
  timezone: yup.string().required().label('Timezone'),
  guests: yup.array().of(yup.string().email().required().label('Email')).min(1).required().label('Guests'),
  meet: yup.boolean(),
  location: yup.string().required().label('Location'),
  description: yup.string().required().label('Description'),
})

const ProcessForm: React.FC<{
  stage: IRecruitmentStage
  candidate: ICandidate
  onPrev?: () => void
}> = ({ stage, candidate, onPrev }) => {
  const [loading, setLoading] = useState(false)
  const [employees, setEmployees] = useState<OptionProps[]>([])
  const [errorMessage, setErrorMessage] = useState('')

  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const load = async () => {
      try {
        const employees = await employeeService.fetchEmployees({ limit: 99999 })
        setEmployees(
          employees.content
            .filter((el) => !!el.email)
            .map((el) => ({
              label: `${el.name} (${el.email})`,
              value: el.email || '',
            })),
        )
      } catch (e) {
        toast(axiosErrorMessage(e))
        onPrev?.()
      }
    }

    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: new Date(),
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      const startedAt = moment(moment(data.date).format('YYYY-MM-DD') + ' ' + data.startedAt, 'YYYY-MM-DD HH:mm').format(
        'YYYY-MM-DDTHH:mm:ss',
      )
      const endedAt = moment(moment(data.date).format('YYYY-MM-DD') + ' ' + data.endedAt, 'YYYY-MM-DD HH:mm').format('YYYY-MM-DDTHH:mm:ss')
      const resp = await processService.updateProcess({
        applicantId: candidate.id,
        stageId: stage.oid,
        schedule: {
          ...data,
          startedAt,
          endedAt,
          guests: [...data.guests, candidate.email].filter((el) => !!el),
          meet: !!data.meet,
        },
      })

      toast('Process updated successfully', { color: 'success' })

      if (resp.type == 'INTERVIEW') {
        navigate('/process/interview')
      } else {
        navigate('/process/assessment')
      }
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
    }
    setLoading(false)
  })

  return (
    <form onSubmit={onSubmit}>
      {errorMessage && (
        <Alert color="error" className="mb-3">
          {errorMessage}
        </Alert>
      )}

      <div>
        <Input label="Title" placeholder="Add Title" error={errors.name?.message} {...register('name')} />

        <InputDate
          asSingle
          useRange={false}
          label="Date"
          placeholder="Pick date"
          labelRequired
          displayFormat="D/M/YYYY"
          value={{ startDate: getValues('date'), endDate: getValues('date') }}
          onChange={(v) => {
            // @ts-expect-error
            setValue('date', v?.startDate || v?.endDate)
            trigger('date')
          }}
        />
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Started at"
            placeholder="Started at"
            labelRequired
            type="time"
            error={errors.startedAt?.message}
            {...register('startedAt')}
          />
          <Input
            label="Ended at"
            placeholder="Ended at"
            labelRequired
            type="time"
            error={errors.endedAt?.message}
            {...register('endedAt')}
          />
        </div>

        <Select
          label="Timezone"
          placeholder="Timezone"
          labelRequired
          options={[
            { label: 'WIB', value: 'Asia/Jakarta' },
            { label: 'WITA', value: 'Asia/Makassar' },
            { label: 'WIT', value: 'Asia/Jayapura' },
          ]}
          error={errors.timezone?.message}
          value={getValues('timezone')}
          onChange={(v) => {
            setValue('timezone', v.toString())
            trigger('timezone')
          }}
        />

        <MultiSelect
          label="Email"
          labelRequired
          placeholder="Email"
          name="emials"
          options={employees.length ? employees : [{ label: 'arddede4@gmail.com', value: 'arddede4@gmail.com' }]}
          error={
            errors.guests?.message ||
            errors.guests
              ?.map?.((el) => el?.message)
              .filter((el) => !!el)
              .join(', ')
          }
          value={getValues('guests')}
          onChange={(v) => {
            setValue(
              'guests',
              v.map((el) => el.toString()),
            )
            trigger('guests')
          }}
        />
        <div className="py-3">
          <InputCheckbox id="generate-meet" {...register('meet')}>
            Add Google Meet Video Conferencing For Online Interview
          </InputCheckbox>
        </div>

        <Input label="Location" placeholder="Add Location" error={errors.location?.message} {...register('location')} />
        <Textarea
          rows={2}
          maxLength={156}
          label="Description"
          placeholder="Add Description"
          error={errors.description?.message}
          {...register('description')}
        />
      </div>

      <div className="mt-8 flex justify-end gap-3">
        <Button type="button" color="error" variant="light" className="w-24" disabled={loading} onClick={onPrev}>
          Prev
        </Button>
        <Button color="primary" disabled={loading} loading={loading}>
          Add an Interview
        </Button>
      </div>
    </form>
  )
}

export default ProcessForm
