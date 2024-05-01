import Container from '@/components/Elements/Layout/Container'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { employeeService, payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Input,
  InputDate,
  InputDateRange,
  InputWrapper,
  Select,
  useConfirm,
  useToast,
} from 'jobseeker-ui'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import EmployeeSelectorModal from '../../components/EmployeeSelectorModal'

const schema = yup.object().shape({
  approver: yup.string().required().label('Name'),
  employeeIds: yup.array().of(yup.string().required()).required().label('Employees'),
  name: yup.string().required().label('Name'),
  paymentedAt: yup.date().required().label('Paymented At'),
  period: yup
    .object({
      endDate: yup.date().required().label('End date'),
      startDate: yup.date().required().label('Start date'),
    })
    .required()
    .label('Start Period'),
})

const RunRequestPage: React.FC = () => {
  const [showSelectEmployeeModal, setShowSelectEmployeeModal] = useState(false)
  const [employees, setEmployees] = useState<IDataTableEmployee[]>()
  const [pageError, setPageError] = useState<any>()
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const confirm = useConfirm()
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const response = await employeeService.fetchEmployees({ limit: 99999999 })
        setEmployees(response.content)
      } catch (e) {
        setPageError(e)
      }
    }

    loadEmployees()
  }, [])

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

  const picOptions = useMemo(() => employees?.map((el) => ({ label: `${el.name || el.email}`, value: el.oid })) || [], [employees])

  if (pageError) throw pageError

  const onSubmit = handleSubmit(async ({ paymentedAt, period, ...data }) => {
    setErrorMessage('')

    if (!data || !data.employeeIds || data.employeeIds.length === 0) {
      setErrorMessage('Employees is a required field')
      setLoading(false)
      return
    }

    const confirmed = await confirm('Are you sure?')

    if (!confirmed) return
    setLoading(true)
    try {
      const payload = {
        ...data,
        endPeriod: moment.utc(period.endDate).local().format('YYYY-MM-DD'),
        paymentedAt: moment.utc(paymentedAt).local().format('YYYY-MM-DD'),
        startPeriod: moment.utc(period.startDate).local().format('YYYY-MM-DD'),
      }
      const resp = await payrollService.createPayrollRequest(payload)
      toast('Success fully generate payroll', { color: 'success' })
      navigate(`/payroll/run-payroll-request/${resp.oid}`)
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
      setLoading(false)
    }
  })

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Payroll' }, { text: 'Run Payroll Request' }]}
        subtitle={
          <>
            You can check payroll <span className="text-primary-600">Requests here</span>
          </>
        }
        title="Run Payroll Request"
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <Card as="form" onSubmit={onSubmit}>
          <LoadingScreen className="py-32" show={!employees} />

          {employees && (
            <CardBody className="grid grid-cols-1 gap-2">
              <Input error={errors.name?.message} label="Payroll Name" labelRequired placeholder="Payroll March" {...register('name')} />
              <InputDateRange
                displayFormat="DD-MM-YYYY"
                error={errors.period?.message || errors.period?.startDate?.message || errors.period?.endDate?.message}
                label="Payroll Period"
                labelRequired
                maxDate={new Date()}
                name="period"
                onValueChange={(v) => {
                  setValue('period', v)
                  trigger('period')
                }}
                value={getValues('period')}
              />
              <InputDate
                displayFormat="DD-MM-YYYY"
                label="Payroll Schedule"
                labelRequired
                onValueChange={(v) => {
                  setValue('paymentedAt', v)
                  trigger('paymentedAt')
                }}
                value={getValues('paymentedAt')}
              />
              <Select
                error={errors.approver?.message}
                label="PIC Approval"
                labelRequired
                onChange={(v) => {
                  setValue('approver', v.toString())
                  trigger('approver')
                }}
                options={picOptions}
                placeholder="PIC Approval"
                value={getValues('approver')}
              />
              <InputWrapper
                error={errors.employeeIds?.message}
                label="Who will be processed in this run payroll?"
                labelRequired
                wrapperClassName="flex py-1 gap-3 items-center"
              >
                <Button color="primary" onClick={() => setShowSelectEmployeeModal(true)} type="button" variant="outline">
                  Select Employees
                </Button>
                <span className="block">
                  {(watch('employeeIds') || []).length} Selected of {employees.length} Employees
                </span>
              </InputWrapper>
              {errorMessage && <span className="text-xs text-red-600">{errorMessage}</span>}
            </CardBody>
          )}

          <CardFooter>
            <Button className="w-24" color="primary" disabled={loading} loading={loading} type="submit">
              Generate
            </Button>
          </CardFooter>
        </Card>
      </Container>

      {employees && (
        <EmployeeSelectorModal
          employees={employees}
          onClose={() => setShowSelectEmployeeModal(false)}
          selected={watch('employeeIds') || []}
          setSelected={(v) => setValue('employeeIds', v)}
          show={showSelectEmployeeModal}
        />
      )}
    </>
  )
}

export default RunRequestPage
