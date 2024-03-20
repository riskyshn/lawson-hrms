import { Button, Card, CardBody, CardFooter, Dropzone, InputCheckbox } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'

const KTPForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const { handleSubmit } = useForm({})
  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <Dropzone />
        <InputCheckbox className="text-gray-400" id="work-experience">
          I don’t have previous work experience
        </InputCheckbox>
      </CardBody>

      <CardFooter>
        <Button type="submit" color="primary" className="w-32">
          Next
        </Button>
      </CardFooter>
    </Card>
  )
}

export default KTPForm
