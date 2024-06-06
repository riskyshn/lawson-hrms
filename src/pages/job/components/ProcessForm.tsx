import React, { useState } from 'react'
import { Button, Card, CardBody, CardFooter, InputCheckbox, LoadingScreen, Modal, ModalHeader } from 'jobseeker-ui'
import { EditIcon } from 'lucide-react'
import { useAsyncAction } from '@/hooks'
import { organizationService } from '@/services'
import RecruitmentStagesEditor from './RecruitmentStageEditor'

const ProcessForm: React.FC<{ defaultValue: any; handlePrev: () => void; handleSubmit: (data: any) => void }> = (props) => {
  const [recruitmentStages, loading, onRefresh] = useAsyncAction(organizationService.fetchRecruitmentStages, { limit: 99999 })
  const [showModal, setShowModal] = useState(false)
  const [stages, setStages] = useState<Array<string>>(() => props.defaultValue?.recruitmentProcess || [])

  const administrations = recruitmentStages?.content.filter((el) => el.type == 'ADMINISTRATION')
  const selections = recruitmentStages?.content.filter((el) => el.type == 'SELECTION')

  const items = [
    {
      text: 'Candidate Apply',
    },
    {
      items: administrations,
      modalEditor: true,
      text: 'Administration',
    },
    {
      items: selections,
      modalEditor: true,
      text: 'Selection',
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
      <Modal show={showModal} hideCloseButton onClose={() => setShowModal(false)}>
        <ModalHeader onClose={() => setShowModal(false)}>Setup Master Recruitment Stages</ModalHeader>
        <RecruitmentStagesEditor onRefresh={onRefresh} />
      </Modal>

      <Card>
        <CardBody className="grid grid-cols-1 gap-2">
          <div className="pb-2">
            <h3 className="text-lg font-semibold">Process</h3>
            <p className="text-xs text-gray-500">Please fill out this form below</p>
          </div>

          <div className="p-3">
            <LoadingScreen show={loading} />
            {!loading && (
              <ol className="border-l border-dashed ">
                {items.map((el, i) => (
                  <li className="relative mb-5 pl-6 last:mb-0" key={i}>
                    <span className="absolute left-[-0.4rem] top-1.5 flex h-3 w-3 items-center justify-center rounded-full bg-white ring-4 ring-primary-600" />
                    <h3 className="flex items-center gap-3 font-semibold">
                      {el.text}
                      {el.modalEditor && (
                        <button className="text-primary-600 hover:text-primary-700" onClick={() => setShowModal(true)} type="button">
                          <EditIcon size={16} />
                        </button>
                      )}
                    </h3>
                    {el.items && (
                      <div className="flex flex-col gap-3 py-3">
                        {el.items.map((el, i2) => (
                          <div key={i2}>
                            <InputCheckbox
                              checked={!!stages.find((id) => id === el.oid)}
                              id={`check-${i}-${i2}`}
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
            )}
          </div>
        </CardBody>

        <CardFooter className="gap-3">
          <Button className="w-32" color="primary" onClick={props.handlePrev} type="button" variant="light">
            Prev
          </Button>
          <Button className="w-32" color="primary" onClick={onSubmit} type="button">
            Next
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

export default ProcessForm
