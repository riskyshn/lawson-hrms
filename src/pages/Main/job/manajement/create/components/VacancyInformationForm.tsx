import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { BaseInput, Button, Card, CardBody, CardFooter, Input, InputCheckbox, InputWrapper, Select, Textarea } from 'jobseeker-ui'

const options = Array.from(Array(20)).map((_, v) => ({ label: `Option ${v}`, value: `Option ${v}` }))

const schema = yup.object({})

const VacancyInformationForm: React.FC<{ defaultValue: any; handlePrev: () => void; handleSubmit: (data: any) => void }> = (props) => {
  const { handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: props.defaultValue as yup.InferType<typeof schema>,
  })

  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Vacancy Information</h3>
          <p className="text-xs text-gray-500">Please fill out this form below</p>
        </div>

        <Input label="Position Name" labelRequired />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Select label="Department" labelRequired placeholder="Choose Department" options={options} />
          <Select label="Branch" labelRequired placeholder="Select Branch" options={options} />
        </div>
      </CardBody>

      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Job Summary</h3>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Select label="Job Level" labelRequired placeholder="Choose Job Level" options={options} />
          <Select label="Job Type" labelRequired placeholder="Full-time, Part-time, Internship" options={options} />
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Select label="Work Placement Type" withReset placeholder="WFO, WFH, Hybrid" options={options} />
          <Select label="City" labelRequired placeholder="Choose City" options={options} />
        </div>

        <Input label="Number of Employee Needed" labelRequired type="number" />

        <div>
          <InputWrapper label="Range Salary" labelRequired className="mb-2">
            <div className="grid grid-cols-2 gap-3">
              <BaseInput placeholder="Minimum" type="number" />
              <BaseInput placeholder="Maximum" type="number" />
            </div>
          </InputWrapper>
          <div className="flex gap-3 pb-2">
            <InputCheckbox id="negotiable-salary">Negotiable Salary</InputCheckbox>
            <InputCheckbox id="hide-range-of-salary">Hide Range of Salary</InputCheckbox>
          </div>
        </div>

        <Textarea label="Task, Responsibility & Others" labelRequired placeholder="Add description here" rows={6} />
      </CardBody>

      <CardFooter>
        <Button type="submit" color="primary" className="w-32">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default VacancyInformationForm
