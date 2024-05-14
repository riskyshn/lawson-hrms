import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputCheckbox, InputCurrency, Select } from '@jshrms/ui'
import { HelpCircleIcon } from 'lucide-react'
import * as yup from 'yup'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import { BASE_SALARY_TYPE_OPTIONS, EMPLOYEE_TAX_STATUS_OPTIONS, TAX_METHOD_OPTIONS } from '@/constants/options'
import useAsyncAction from '@/core/hooks/use-async-action'
import { payrollService } from '@/services'
import numberToCurrency from '@/utils/number-to-currency'

const schema = yup.object({
  accountHolderName: yup.string().required().label('Account Holder Name'),
  accountNumber: yup.string().required().label('Account Number'),
  allowOvertime: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .label('Allow Overtime'),
  bankName: yup.string().required().label('Bank Name'),
  baseSalary: yup.string().required().label('Base Salary'),
  baseSalaryType: yup.string().required().label('Base Salary Type'),
  category: yup.string().required().label('Category'),
  employmentTaxStatus: yup.string().required().label('Employment Tax Status'),
  jkk: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .label('JKK'),
  notParticipateBpjs: yup.boolean(),
  npwpNumber: yup.string().length(15).required().label('NPWP Number'),
  ptkpStatus: yup.string().required().label('PTKP Status'),
  taxMethod: yup.string().required().label('Tax Method'),
})

const options = {
  allowOvertime: [
    { label: 'Yes', value: '1' },
    { label: 'No', value: '0' },
  ],
  jkk: [0.24, 0.54, 0.89, 1.27, 1.74].map((el) => ({ label: el + '%', value: String(el) })),
  ptkpStatus: ['TK/0', 'TK/1', 'K/0', 'TK/2', 'TK/3', 'K/1', 'K/2', 'K/3'].map((el) => ({ label: el, value: el })),
}

const PayrollDataForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    trigger,
    watch,
  } = useForm({
    defaultValues: props.defaultValue as yup.InferType<typeof schema>,
    resolver: yupResolver(schema),
  })

  const [bpjsComponent] = useAsyncAction(payrollService.fetchBpjsComponent)
  const [pph21] = useAsyncAction(payrollService.fetchPPH21)

  useEffect(() => {
    if (!props.defaultValue?.category) return
    setValue('category', props.defaultValue.category)
  }, [props.defaultValue?.category, setValue])

  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Payroll Information</h3>
          <p className="text-xs text-gray-500">Please Input Payroll Information Details </p>
        </div>
        <Select
          error={errors.taxMethod?.message}
          hideSearch
          label="Tax Method"
          labelRequired
          name="taxMethod"
          onChange={(v) => {
            setValue('taxMethod', v.toString())
            trigger('taxMethod')
          }}
          options={TAX_METHOD_OPTIONS}
          value={getValues('taxMethod')}
        />
        <InputCurrency
          error={errors.baseSalary?.message}
          label="Base Salary"
          labelRequired
          name="baseSalary"
          onValueChange={(v) => {
            setValue('baseSalary', v || '')
            trigger('baseSalary')
          }}
          prefix="Rp "
          value={getValues('baseSalary')}
        />
        <Select
          error={errors.baseSalaryType?.message}
          hideSearch
          label="Base Salary Type"
          labelRequired
          name="baseSalaryType"
          onChange={(v) => {
            setValue('baseSalaryType', v)
            trigger('baseSalaryType')
          }}
          options={BASE_SALARY_TYPE_OPTIONS}
          value={getValues('baseSalaryType')}
        />
        <Select
          error={errors.allowOvertime?.message}
          hideSearch
          label="Allow Overtime"
          labelRequired
          name="allowOvertime"
          onChange={(v) => {
            setValue('allowOvertime', Number(v))
            trigger('allowOvertime')
          }}
          options={options.allowOvertime}
          value={String(getValues('allowOvertime') || '0')}
        />
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Bank Information</h3>
          <p className="text-xs text-gray-500">Employee bank information details</p>
        </div>
        <Input error={errors.bankName?.message} label="Bank Name" labelRequired {...register('bankName')} />
        <div className="grid grid-cols-2 gap-4">
          <Input error={errors.accountNumber?.message} label="Account Number" labelRequired {...register('accountNumber')} type="number" />
          <Input error={errors.accountHolderName?.message} label="Account Holder Name" labelRequired {...register('accountHolderName')} />
        </div>
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Tax Configuration</h3>
          <p className="text-xs text-gray-500">Select the tax calculation type relevant to your company</p>
        </div>
        <Select
          error={errors.employmentTaxStatus?.message}
          hideSearch
          label="Employment Tax Status"
          labelRequired
          name="employmentTaxStatus"
          onChange={(v) => {
            setValue('employmentTaxStatus', v)
            trigger('employmentTaxStatus')
          }}
          options={EMPLOYEE_TAX_STATUS_OPTIONS}
          value={getValues('employmentTaxStatus')}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input error={errors.npwpNumber?.message} label="NPWP Number" labelRequired {...register('npwpNumber')} type="number" />
          <Select
            error={errors.ptkpStatus?.message}
            hideSearch
            label="PTKP Status"
            labelRequired
            name="ptkpStatus"
            onChange={(v) => {
              setValue('ptkpStatus', v)
              setValue('category', pph21?.content.find((el) => el.name)?.category || '')
              trigger('ptkpStatus')
              trigger('category')
            }}
            options={options.ptkpStatus}
            value={getValues('ptkpStatus')}
          />
        </div>

        <Input defaultValue={watch('category')} disabled label="Category" name="category" />
      </CardBody>

      <LoadingScreen show={!bpjsComponent} />

      {!!bpjsComponent && (
        <CardBody className="grid grid-cols-1 gap-2">
          <div className="pb-2">
            <h3 className="text-lg font-semibold">BPJS Configuration</h3>
            <p className="text-xs text-gray-500">Employee BPJS payment arrangements</p>
          </div>
          <div className="pb-2">
            <h3 className="text-sm font-semibold">Paid by Employer</h3>
            <div className="grid grid-cols-2 gap-4">
              <Input disabled label="Jaminan Hari Tua (JHT)" value={`${bpjsComponent?.paidByEmployer?.jht?.rate}%`} />
              <Select
                error={errors.jkk?.message}
                hideSearch
                label="Jaminan Kecelakaan Kerja (JKK)"
                name="jkk"
                onChange={(v) => {
                  setValue('jkk', Number(v))
                  trigger('jkk')
                }}
                options={options.jkk}
                value={String(getValues('jkk') || '')}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input disabled label="Jaminan Kematian (JKM)" value={`${bpjsComponent?.paidByEmployer?.jkm?.rate}%`} />
              <Input
                disabled
                help={`JP Maximum Cap Rp. ${numberToCurrency(bpjsComponent?.paidByEmployer?.jp?.maxCap)}`}
                label="Jaminan Pensiun (JP)"
                required
                value={`${bpjsComponent?.paidByEmployer?.jp?.rate}%`}
              />
            </div>
            <div className="mb-3">
              <Input
                disabled
                help={`KS Maximum Cap Rp. ${numberToCurrency(bpjsComponent?.paidByEmployer?.jks?.maxCap)}`}
                label="Jaminan Kesehatan (KS)"
                required
                value={watch('notParticipateBpjs') ? '0%' : bpjsComponent?.paidByEmployer?.jks?.rate + '%'}
              />
            </div>
            <InputCheckbox className="text-gray-400" id="is-participate-bpjs" {...register('notParticipateBpjs')}>
              Employee will not participate in BPJS KS Program{' '}
              <span className="text-gray-300">
                <HelpCircleIcon size={16} />
              </span>
            </InputCheckbox>
          </div>

          <div className="pb-1">
            <h3 className="text-sm font-semibold">Paid by Employee</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input disabled label="Jaminan Hari Tua (JHT)" value={`${bpjsComponent?.paidByEmployee?.jht?.rate}%`} />
            <Input
              disabled
              help={`JP Maximum Cap Rp. ${numberToCurrency(bpjsComponent?.paidByEmployee?.jp?.maxCap)}`}
              label="Jaminan Pensiun (JP)"
              value={`${bpjsComponent?.paidByEmployee?.jp?.rate}%`}
            />
          </div>
          <Input
            disabled
            help={`KS Maximum Cap Rp. ${numberToCurrency(bpjsComponent?.paidByEmployee?.jks?.maxCap)}`}
            label="Jaminan Kesehatan (KS)"
            value={watch('notParticipateBpjs') ? '0%' : bpjsComponent?.paidByEmployee?.jks?.rate + '%'}
          />
        </CardBody>
      )}

      <CardFooter className="gap-3">
        <Button className="w-32" color="primary" onClick={props.handlePrev} type="button" variant="light">
          Prev
        </Button>
        <Button className="w-32" color="primary" onClick={onSubmit} type="button">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PayrollDataForm
