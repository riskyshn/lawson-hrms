import { Button, Card, CardBody, CardFooter, Input, Select } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'

const EmploymentDataForm: React.FC<{
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
          <h3 className="text-lg font-semibold">Employment Data</h3>
          <p className="text-xs text-gray-500">Fill all employee data information related to company</p>
        </div>

        <Input label="Employee ID" labelRequired />
        <Select label="Role" labelRequired options={[]} />
        <Select label="Employment Status" labelRequired options={[]} />
        <div className="grid grid-cols-2 gap-4">
          <Select label="Branch Placement" labelRequired options={[]} />
          <Select label="Department" labelRequired options={[]} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select label="Position" labelRequired options={[]} />
          <Select label="Job Level" labelRequired options={[]} />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select label="PIC for Approval" labelRequired options={[]} />
          <Select label="Schedule" labelRequired options={[]} />
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

export default EmploymentDataForm
