import MainModal from '@/components/Elements/MainModal'
import { useOrganizationStore } from '@/store'
import { Button, Card, CardBody, CardFooter, InputCheckbox } from 'jobseeker-ui'
import { EditIcon } from 'lucide-react'
import React, { useState } from 'react'
import RecruitmentStagesEditor from './RecruitmentStageEditor'

const ProcessForm: React.FC<{ defaultValue: any; handlePrev: () => void; handleSubmit: (data: any) => void }> = (props) => {
  const { recruitmentStages } = useOrganizationStore()
  const [showModal, setShowModal] = useState(false)
  const [stages, setStages] = useState<Array<string>>(() => props.defaultValue?.recruitmentProcess || [])

  const interviews = recruitmentStages.filter((el) => el.type == 'INTERVIEW')
  const assesments = recruitmentStages.filter((el) => el.type == 'ASSESMENT')

  const items = [
    {
      text: 'Candidate Apply',
    },
    {
      text: 'Interview',
      modalEditor: true,
      items: interviews,
    },
    {
      text: 'Assessment',
      modalEditor: true,
      items: assesments,
    },
    {
      text: 'Offering Letter',
    },
    {
      text: 'Onboarding',
    },
  ]

  const onSubmit = () => {
    props.handleSubmit({
      recruitmentProcess: stages,
    })
  }

  return (
    <>
      <MainModal className="max-w-xl" show={showModal} onClose={() => setShowModal(false)}>
        <h1 className="mb-3 text-center text-lg font-semibold">Setup Master Recruitment Stages</h1>
        <RecruitmentStagesEditor />
      </MainModal>

      <Card>
        <CardBody className="grid grid-cols-1 gap-2">
          <div className="pb-2">
            <h3 className="text-lg font-semibold">Process</h3>
            <p className="text-xs text-gray-500">Please fill out this form below</p>
          </div>

          <div className="p-3">
            <ol className="border-l border-dashed ">
              {items.map((el, i) => (
                <li key={i} className="relative mb-5 pl-6 last:mb-0">
                  <span className="absolute left-[-0.4rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-white ring-4 ring-primary-600" />
                  <h3 className="flex items-center gap-3 font-semibold">
                    {el.text}
                    {el.modalEditor && (
                      <button type="button" className="text-primary-600 hover:text-primary-700" onClick={() => setShowModal(true)}>
                        <EditIcon size={16} />
                      </button>
                    )}
                  </h3>
                  {el.items && (
                    <div className="flex flex-col gap-3 py-3">
                      {el.items.map((el, i2) => (
                        <div key={i2}>
                          <InputCheckbox
                            id={`check-${i}-${i2}`}
                            checked={!!stages.find((id) => id === el.oid)}
                            onChange={(e) => {
                              const isChecked = e.currentTarget.checked
                              if (isChecked) {
                                setStages((prevStages) => [...prevStages, el.oid])
                              } else {
                                setStages((prevStages) => prevStages.filter((id) => id !== el.oid))
                              }
                            }}
                          >
                            {el.name}
                          </InputCheckbox>
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
    </>
  )
}

export default ProcessForm
