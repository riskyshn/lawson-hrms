import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { BaseInput, Button, Card, CardBody, CardFooter, Input, InputCheckbox, InputCurrency, InputWrapper, Select } from 'jobseeker-ui'

const options = Array.from(Array(20)).map((_, v) => ({ label: `Option ${v}`, value: `Option ${v}` }))

const schema = yup.object({})

const RequirementsForm: React.FC<{ defaultValue: any; handlePrev: () => void; handleSubmit: (data: any) => void }> = (props) => {
  const { handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: props.defaultValue as yup.InferType<typeof schema>,
  })

  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Requirements</h3>
          <p className="text-xs text-gray-500">Please fill out this form below</p>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="pb-2">
            <Select className="mb-2" label="Gender" placeholder="Male, Female" options={options} />
            <InputCheckbox id="gender-required">Candidate must meet the criteria</InputCheckbox>
          </div>
          <div className="pb-2">
            <Select className="mb-2" label="Minimal Education" placeholder="Choose Education" options={options} />
            <InputCheckbox id="minimal-education-required">Candidate must meet the criteria</InputCheckbox>
          </div>
        </div>

        <div className="pb-2">
          <InputWrapper label="Age" className="mb-2">
            <div className="grid grid-cols-2 gap-3">
              <BaseInput placeholder="Minimum" type="number" />
              <BaseInput placeholder="Maximum" type="number" />
            </div>
          </InputWrapper>
          <InputCheckbox id="age-required">Candidate must meet the criteria</InputCheckbox>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="pb-2">
            <Input className="mb-2" label="Minimum GPA" placeholder="Example : 3.25" />
            <InputCheckbox id="minimum-gpa-required">Candidate must meet the criteria</InputCheckbox>
          </div>
          <div className="pb-2">
            <Input className="mb-2" label="Minimum Experience" placeholder="Example : 3.25" />
            <InputCheckbox id="minimum-experience-required">Candidate must meet the criteria</InputCheckbox>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="pb-2">
            <Select className="mb-2" label="Province" placeholder="Province" options={options} />
            <InputCheckbox id="province-required">Candidate must meet the criteria</InputCheckbox>
          </div>
          <div className="pb-2">
            <Select className="mb-2" label="City" placeholder="City" options={options} />
            <InputCheckbox id="city-required">Candidate must meet the criteria</InputCheckbox>
          </div>
        </div>

        <div className="pb-2">
          <InputCurrency label="Maximum Salary Expectation" prefix="Rp" className="mb-2" />
          <InputCheckbox id="maximum-salary-expectation-required">Candidate must meet the criteria</InputCheckbox>
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

export default RequirementsForm
