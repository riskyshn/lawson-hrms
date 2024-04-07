import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import LoadingScreen from '@/components/UI/LoadingScreen'
import { employeeService, payrollService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputDate, InputWrapper, Select, useConfirm, useToast } from 'jobseeker-ui'
import moment from 'moment'
import { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import * as yup from 'yup'
import EmployeeSelectorModal from '../../components/EmployeeSelectorModal'

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  startPeriod: yup.date().required().label('Start Period'),
  endPeriod: yup.date().required().label('Start Period'),
  paymentedAt: yup.date().required().label('Paymented At'),
  approver: yup.string().required().label('Name'),
  employeeIds: yup.array().of(yup.string().required()).required().label('Employees'),
})

const RunRequestPage: React.FC = () => {
  const [showSelectEmployeeModal, setShowSelectEmployeeModal] = useState(false)
  const [employees, setEmployees] = useState<IDataTableEmployee[]>()
  const [pageError, setPageError] = useState<any>()
  const [loading, setLoading] = useState(false)

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
    handleSubmit,
    register,
    getValues,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const picOptions = useMemo(() => employees?.map((el) => ({ label: `${el.name || el.email}`, value: el.oid })) || [], [employees])

  if (pageError) throw pageError

  const periodValue =
    getValues('startPeriod') && getValues('startPeriod')
      ? { startDate: getValues('startPeriod'), endDate: getValues('endPeriod') }
      : undefined

  const paymentedAt = getValues('paymentedAt') ? { startDate: getValues('paymentedAt'), endDate: getValues('paymentedAt') } : undefined

  const onSubmit = handleSubmit(async (data) => {
    const confirmed = await confirm('Are you sure?')

    if (!confirmed) return
    setLoading(true)
    data.startPeriod
    try {
      const payload = {
        ...data,
        startPeriod: moment(data.startPeriod).format('YYYY-MM-DD'),
        endPeriod: moment(data.endPeriod).format('YYYY-MM-DD'),
        paymentedAt: moment(data.paymentedAt).format('YYYY-MM-DD'),
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
        title="Run Payroll Request"
        subtitle={
          <>
            You can check payroll <span className="text-primary-600">Requests here</span>
          </>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <Card as="form" onSubmit={onSubmit}>
          <LoadingScreen show={!employees} className="py-32" />

          {employees && (
            <CardBody className="grid grid-cols-1 gap-2">
              <Input labelRequired label="Payroll Name" placeholder="Payroll March" error={errors.name?.message} {...register('name')} />
              <InputDate
                label="Payroll Period"
                labelRequired
                displayFormat="DD-MM-YYYY"
                name="period"
                error={errors.startPeriod?.message || errors.endPeriod?.message}
                value={periodValue}
                maxDate={new Date()}
                onValueChange={(v) => {
                  if (v?.startDate) setValue('startPeriod', new Date(v.startDate))
                  if (v?.endDate) setValue('endPeriod', new Date(v.endDate))
                  trigger('startPeriod')
                  trigger('endPeriod')
                }}
              />
              <InputDate
                label="Payroll Schedule"
                labelRequired
                asSingle
                useRange={false}
                displayFormat="DD-MM-YYYY"
                value={paymentedAt}
                onValueChange={(v) => {
                  if (v?.startDate) setValue('paymentedAt', new Date(v.startDate))
                  trigger('paymentedAt')
                }}
              />
              <Select
                label="PIC Approval"
                labelRequired
                placeholder="PIC Approval"
                options={picOptions}
                error={errors.approver?.message}
                value={getValues('approver')}
                onChange={(v) => {
                  setValue('approver', v.toString())
                  trigger('approver')
                }}
              />
              <InputWrapper
                label="Who will be processed in this run payroll?"
                labelRequired
                wrapperClassName="flex py-1 gap-3 items-center"
                error={errors.employeeIds?.message}
              >
                <Button type="button" color="primary" variant="outline" onClick={() => setShowSelectEmployeeModal(true)}>
                  Select Employees
                </Button>
                <span className="block">
                  {(watch('employeeIds') || []).length} Selected of {employees.length} Employees
                </span>
              </InputWrapper>
            </CardBody>
          )}

          <CardFooter>
            <Button type="submit" color="primary" className="w-24" disabled={loading} loading={loading}>
              Generate
            </Button>
          </CardFooter>
        </Card>
      </Container>

      {employees && (
        <EmployeeSelectorModal
          show={showSelectEmployeeModal}
          employees={employees}
          selected={watch('employeeIds') || []}
          setSelected={(v) => setValue('employeeIds', v)}
          onClose={() => setShowSelectEmployeeModal(false)}
        />
      )}
    </>
  )
}

export default RunRequestPage
