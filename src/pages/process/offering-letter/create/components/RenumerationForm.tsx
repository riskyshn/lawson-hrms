import { BaseInput, Button, Card, CardBody, CardFooter, Input } from 'jobseeker-ui'
import { MinusCircleIcon, PlusCircleIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'

const RenumerationForm: React.FC<{
  defaultValue: any
  handlePrev: () => void
  handleSubmit: (data: any) => void
}> = (props) => {
  const { handleSubmit } = useForm({})
  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <Input label="Base Salary" labelRequired />

        <span className="text-xs">Benefit/Allowance</span>
        <div className="flex gap-1">
          <BaseInput className="flex-1" placeholder="Benefit/Allowance Name" />
          <BaseInput className="flex-1" placeholder="Rp." />
          <Button color="primary" type="button">
            Save
          </Button>
          <Button color="error" iconOnly type="button">
            <MinusCircleIcon />
          </Button>
        </div>
        <Button block variant="light" color="primary" type="button" onClick={() => {}}>
          <PlusCircleIcon size={16} />
        </Button>
      </CardBody>

      <CardFooter>
        <Button variant="light" color="primary" className="mr-3 w-32">
          Cancel
        </Button>
        <Button type="submit" color="primary" className="w-48">
          Send Offering Letter
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RenumerationForm
