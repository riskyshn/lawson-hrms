import { Button, Card, CardBody, CardFooter, Input, Select } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'

const ComponentsDataForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
  isLoading?: boolean
}> = (props) => {
  const { handleSubmit } = useForm({})
  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Components</h3>
          <p className="text-xs text-gray-500">Please Adjust Components You Would Like to Apply for this Employee</p>
        </div>
        <div className="pb-1">
          <h3 className="text-sm font-semibold">Benefits</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Jaminan Hari Tua (JHT)" disabled />
          <Input label="Jaminan Kecelakaan Kerja (JKK)" disabled />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Jaminan Kematian (JKM)" disabled />
          <Input label="Jaminan Pensiun (JP)" labelRequired disabled />
        </div>
        <div>
          <Input label="Jaminan Kesehatan (KS)" disabled required />
          <p className="text-sm italic">KS Maximum Cap Rp. 480.000,00*</p>
        </div>

        <Select label="Component" options={[]} />
        <div className="grid grid-cols-2 gap-4">
          <Select label="Type" disabled options={[]} />
          <Select label="Percentage/Fixed" disabled options={[]} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input label="Amount" />
            <p className="text-sm italic">Please amount enter in Rp for Fixed & % for Percentage</p>
          </div>
          <Select label="Application Type" disabled options={[]} />
        </div>
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-1">
          <h3 className="text-sm font-semibold">Deduction</h3>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Jaminan Hari Tua (JHT)" disabled />
          <Input label="Jaminan Kecelakaan Kerja (JKK)" disabled />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Jaminan Kematian (JKM)" disabled />
          <Input label="Jaminan Pensiun (JP)" labelRequired disabled />
        </div>
        <div>
          <Input label="Jaminan Kesehatan (KS)" disabled required />
          <p className="text-sm italic">KS Maximum Cap Rp. 480.000,00*</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Jaminan Hari Tua (JHT)" disabled />
          <Input label="Jaminan Pensiun (JP)" disabled />
        </div>
        <div>
          <Input label="Jaminan Kesehatan (KS)" disabled required />
          <p className="text-sm italic">KS Maximum Cap Rp. 480.000,00*</p>
        </div>

        <Select label="Component" options={[]} />
        <div className="grid grid-cols-2 gap-4">
          <Select label="Type" disabled options={[]} />
          <Select label="Percentage/Fixed" disabled options={[]} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input label="Amount" />
            <p className="text-sm italic">Please amount enter in Rp for Fixed & % for Percentage</p>
          </div>
          <Select label="Application Type" disabled options={[]} />
        </div>
      </CardBody>

      <CardFooter className="gap-3">
        <Button type="button" color="primary" variant="light" className="w-32" onClick={props.handlePrev}>
          Prev
        </Button>
        <Button type="submit" color="primary" className="w-32">
          Submit
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ComponentsDataForm
