import { Button, Card, CardBody, CardFooter, Dropzone, Input, InputCheckbox, InputDate, OptionProps, Select, Textarea } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'

const PersonalDataForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const genderOptions: OptionProps[] = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]

  const religionOptions: OptionProps[] = [
    { label: 'Islam', value: 'islam' },
    { label: 'Kristen', value: 'kristen' },
    { label: 'Hindu', value: 'hindu' },
    { label: 'Buddha', value: 'buddha' },
    { label: 'Katolik', value: 'katolik' },
    { label: 'Konghucu', value: 'konghucu' },
  ]

  const { handleSubmit } = useForm({})
  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Personal Data</h3>
          <p className="text-xs text-gray-500">Fill all employee personal basic information data</p>
        </div>

        <Input label="Name" labelRequired />
        <Select label="Gender" labelRequired options={genderOptions} />
        <Select label="Religion" labelRequired options={religionOptions} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Email" labelRequired />
          <Input label="Phone Number" labelRequired />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select label="Place of Birth" labelRequired options={[]} />
          <InputDate label="Date of Birth" labelRequired />
        </div>
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Identity & Address</h3>
          <p className="text-xs text-gray-500">Employee identity address information</p>
        </div>
        <p className="text-xs">
          National ID <span className="text-red-600">*</span>
        </p>
        <Dropzone title="National ID" />
        <div className="grid grid-cols-2 gap-4">
          <InputDate label="National ID Number" labelRequired />
          <InputDate label="Postal Code" />
        </div>
        <Textarea label="Nation ID Address" rows={6} />
        <Textarea label="Residential Address" rows={6} />
        <InputCheckbox id="residential-address">Same as National ID Address</InputCheckbox>
      </CardBody>

      <CardFooter>
        <Button type="submit" color="primary" className="w-32">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default PersonalDataForm
