import { Button, Card, CardBody, CardFooter, Input, InputDate, Select } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'

const EmployeeDetailsForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const { handleSubmit } = useForm({})
  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <Input label="Letter Number" />
        <Input label="Position Name" />
        <Select label="Department" options={[]} />
        <Select label="Job Level" options={[]} />
        <Select label="Employment Type" options={[]} />
        <Select label="City" options={[]} />
        <InputDate label="Join Date" asSingle useRange={false} />
        <InputDate label="Expiry Date" asSingle useRange={false} />
      </CardBody>

      <CardFooter>
        <Button type="submit" color="primary" className="w-32">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default EmployeeDetailsForm
