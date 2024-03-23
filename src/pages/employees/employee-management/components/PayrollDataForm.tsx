import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Input, InputCheckbox, InputCurrency, Select } from 'jobseeker-ui'
import { HelpCircleIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import getCategory from '../utils/get-category'

const schema = yup.object({
  taxMethod: yup.string().required().label('Tax Method'),
  baseSalary: yup.string().required().label('Base Salary'),
  baseSalaryType: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .label('Base Salary Type'),
  allowOvertime: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .label('Allow Overtime'),
  bankName: yup.string().required().label('Bank Name'),
  accountNumber: yup.string().required().label('Account Number'),
  accountHolderName: yup.string().required().label('Account Holder Name'),
  employmentTaxStatus: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .label('Employment Tax Status'),
  npwpNumber: yup.string().required().label('NPWP Number'),
  ptkpStatus: yup.string().required().label('PTKP Status'),
  participateBpjs: yup.boolean(),
  jkk: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .label('JKK'),
})

const options = {
  taxMethod: ['Gross', 'Gross Up', 'Net'].map((el) => ({ label: el, value: el })),
  allowOvertime: [
    { label: 'Yes', value: 1 },
    { label: 'No', value: 0 },
  ],
  employeeTaxStatus: [
    { label: 'Pegawai Tetap', value: 1 },
    { label: 'Pegawai Tidak Tetap', value: 2 },
  ],
  baseSalaryType: [
    { label: 'Based on Working Days', value: 1 },
    { label: 'Lump Sum', value: 2 },
  ],
  ptkpStatus: ['TK/0', 'TK/1', 'K/0', 'TK/2', 'TK/3', 'K/1', 'K/2', 'K/3'].map((el) => ({ label: el, value: el })),
  jkk: [0.24, 0.54, 0.89, 1.27, 1.74].map((el) => ({ label: el + '%', value: el })),
}

const PayrollDataForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
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
    defaultValues: props.defaultValue as yup.InferType<typeof schema>,
  })

  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Payroll Information</h3>
          <p className="text-xs text-gray-500">Please Input Payroll Information Details </p>
        </div>
        <Select
          label="Tax Method"
          labelRequired
          options={options.taxMethod}
          hideSearch
          name="taxMethod"
          error={errors.taxMethod?.message}
          value={getValues('taxMethod')}
          onChange={(v) => {
            setValue('taxMethod', v.toString())
            trigger('taxMethod')
          }}
        />
        <InputCurrency
          label="Base Salary"
          labelRequired
          prefix="Rp "
          error={errors.baseSalary?.message}
          name="baseSalary"
          value={getValues('baseSalary')}
          onValueChange={(v) => {
            setValue('baseSalary', v || '')
            trigger('baseSalary')
          }}
        />
        <Select
          label="Base Salary Type"
          labelRequired
          options={options.baseSalaryType}
          hideSearch
          name="baseSalaryType"
          error={errors.baseSalaryType?.message}
          value={getValues('baseSalaryType')}
          onChange={(v) => {
            setValue('baseSalaryType', Number(v))
            trigger('baseSalaryType')
          }}
        />
        <Select
          label="Allow Overtime"
          labelRequired
          options={options.allowOvertime}
          hideSearch
          name="allowOvertime"
          error={errors.allowOvertime?.message}
          value={getValues('allowOvertime')}
          onChange={(v) => {
            setValue('allowOvertime', Number(v))
            trigger('allowOvertime')
          }}
        />
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Bank Information</h3>
          <p className="text-xs text-gray-500">Employee bank information details</p>
        </div>
        <Input label="Bank Name" labelRequired error={errors.bankName?.message} {...register('bankName')} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Account Number" labelRequired error={errors.accountNumber?.message} {...register('accountNumber')} />
          <Input label="Account Holder Name" labelRequired error={errors.accountHolderName?.message} {...register('accountHolderName')} />
        </div>
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Tax Configuration</h3>
          <p className="text-xs text-gray-500">Select the tax calculation type relevant to your company</p>
        </div>
        <Select
          label="Employment Tax Status"
          labelRequired
          options={options.employeeTaxStatus}
          hideSearch
          name="employmentTaxStatus"
          error={errors.employmentTaxStatus?.message}
          value={getValues('employmentTaxStatus')}
          onChange={(v) => {
            setValue('employmentTaxStatus', Number(v))
            trigger('employmentTaxStatus')
          }}
        />
        <div className="grid grid-cols-2 gap-4">
          <Input label="NPWP Number" labelRequired error={errors.npwpNumber?.message} {...register('npwpNumber')} />
          <Select
            label="PTKP Status"
            labelRequired
            options={options.ptkpStatus}
            hideSearch
            name="ptkpStatus"
            error={errors.ptkpStatus?.message}
            value={getValues('ptkpStatus')}
            onChange={(v) => {
              setValue('ptkpStatus', v.toString())
              trigger('ptkpStatus')
            }}
          />
        </div>

        <Input label="Category" name="category" value={getCategory(watch('ptkpStatus'))} disabled />
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">BPJS Configuration</h3>
          <p className="text-xs text-gray-500">Employee BPJS payment arrangements</p>
        </div>
        <div className="pb-2">
          <h3 className="text-sm font-semibold">Paid by Company</h3>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Jaminan Hari Tua (JHT)" disabled value="3.70%" />
            <Select
              label="Jaminan Kecelakaan Kerja (JKK)"
              options={options.jkk}
              hideSearch
              name="jkk"
              error={errors.jkk?.message}
              value={getValues('jkk')}
              onChange={(v) => {
                setValue('jkk', Number(v))
                trigger('jkk')
              }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Jaminan Kematian (JKM)" disabled value="0.30%" />
            <Input label="Jaminan Pensiun (JP)" disabled required value="2%" help="JP Maximum Cap Rp. 191.192,00*" />
          </div>
          <div className="mb-3">
            <Input
              label="Jaminan Kesehatan (KS)"
              disabled
              required
              value={watch('participateBpjs') ? '4%' : '0%'}
              help="KS Maximum Cap Rp. 480.000,00*"
            />
          </div>
          <InputCheckbox className="text-gray-400" id="is-participate-bpjs" {...register('participateBpjs')}>
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
          <Input label="Jaminan Hari Tua (JHT)" disabled value="2%" />
          <Input label="Jaminan Pensiun (JP)" disabled value="1%" help="JP Maximum Cap Rp. 95.596,00*" />
        </div>
        <Input
          label="Jaminan Kesehatan (KS)"
          disabled
          value={watch('participateBpjs') ? '1%' : '0%'}
          help="KS Maximum Cap Rp. 120.000,00*"
        />
      </CardBody>

      <CardFooter className="gap-3">
        <Button type="button" color="primary" variant="light" className="w-32" onClick={props.handlePrev}>
          Prev
        </Button>
        <Button type="button" color="primary" className="w-32" onClick={onSubmit}>
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PayrollDataForm
