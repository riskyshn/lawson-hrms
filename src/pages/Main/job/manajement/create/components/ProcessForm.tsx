import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Button, Card, CardBody, CardFooter, InputCheckbox } from 'jobseeker-ui'
import { EditIcon } from 'lucide-react'

const schema = yup.object({})

const ProcessForm: React.FC<{ defaultValue: any; handlePrev: () => void; handleSubmit: (data: any) => void }> = (props) => {
  const { handleSubmit } = useForm({
    resolver: yupResolver(schema),
    defaultValues: props.defaultValue as yup.InferType<typeof schema>,
  })

  const onSubmit = handleSubmit(props.handleSubmit)

  return (
    <Card>
      <CardBody className="grid grid-cols-1 gap-2">
        <div className="pb-2">
          <h3 className="text-lg font-semibold">Process</h3>
          <p className="text-xs text-gray-500">Please fill out this form below</p>
        </div>

        <div className="p-3">
          <ol className="border-l border-dashed ">
            {[1, 2, 3, 4].map((i) => (
              <li key={i} className="relative mb-5 pl-6 last:mb-0">
                <span className="absolute left-[-0.4rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-white ring-4 ring-primary-600" />
                <h3 className="flex items-center gap-3 font-semibold">
                  Candidate Apply
                  {(i == 2 || i == 3) && (
                    <a href="#" className="text-primary-600 hover:text-primary-700">
                      <EditIcon size={16} />
                    </a>
                  )}
                </h3>
                {(i == 2 || i == 3) && (
                  <div className="flex flex-col gap-3 py-3">
                    {[1, 2, 3, 4].map((i2) => (
                      <div key={i2}>
                        <InputCheckbox id={`check-${i}-${i2}`}>Interview HR</InputCheckbox>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
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

export default ProcessForm
