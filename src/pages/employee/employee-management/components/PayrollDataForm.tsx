import { Button, Card, CardBody, CardFooter, Input, InputCheckbox, InputCurrency, Select } from 'jobseeker-ui'
import { HelpCircleIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'

const PayrollDataForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const { handleSubmit } = useForm({})
  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Payroll Information</h3>
          <p className="text-xs text-gray-500">Please Input Payroll Information Details </p>
        </div>
        <Select label="Tax Method" labelRequired options={[]} />
        <InputCurrency label="Base Salary" labelRequired />
        <div className="grid grid-cols-5 gap-4">
          <InputCheckbox className="text-gray-400" id="base-on-working-days">
            Based on Working Days{' '}
            <span className="text-gray-300">
              <HelpCircleIcon size={16} />
            </span>
          </InputCheckbox>
          <InputCheckbox className="text-gray-400" id="base-on-working-days">
            Lump Sum{' '}
            <span className="text-gray-300">
              <HelpCircleIcon size={16} />
            </span>
          </InputCheckbox>
        </div>
        <Select label="Allow Overtime" labelRequired options={[]} />
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Bank Information</h3>
          <p className="text-xs text-gray-500">Employee bank information details</p>
        </div>
        <Input label="Bank Name" labelRequired />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Account Number" labelRequired />
          <Input label="Account Holder Name" labelRequired />
        </div>
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Tax Configuration</h3>
          <p className="text-xs text-gray-500">Select the tax calculation type relevant to your company</p>
        </div>
        <Select label="Employment Tax Status" labelRequired options={[]} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="NPWP Number" labelRequired />
          <Select label="PTKP Status" labelRequired options={[]} />
        </div>
        <Input label="Category" disabled />
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">BPJS Configuration</h3>
          <p className="text-xs text-gray-500">Employee BPJS payment arrangements</p>
        </div>
        <div className="pb-2">
          <div className="pb-1">
            <h3 className="text-sm font-semibold">Paid by Company</h3>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Jaminan Hari Tua (JHT)" disabled />
            <Select label="Jaminan Kecelakaan Kerja (JKK)" options={[]} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input label="Jaminan Kematian (JKM)" disabled />
            <div>
              <Input label="Jaminan Pensiun (JP)" disabled required />
              <p className="text-sm italic">JP Maximum Cap Rp. 191.980,00*</p>
            </div>
          </div>
          <Input label="Jaminan Kesehatan (KS)" disabled required />
          <p className="text-sm italic">KS Maximum Cap Rp. 480.000,00*</p>
          <InputCheckbox className="text-gray-400" id="bpjs-employee">
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
          <Input label="Jaminan Hari Tua (JHT)" disabled />
          <Input label="Jaminan Pensiun (JP)" disabled required />
        </div>
        <div>
          <Input label="Jaminan Kesehatan (KS)" disabled required />
          <p className="text-sm italic">KS Maximum Cap Rp. 480.000,00*</p>
        </div>
      </CardBody>

      <CardFooter>
        <Button type="submit" color="primary" className="w-32">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PayrollDataForm
