import { Modal, ModalHeader, Stepper, useConfirm, useSteps, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import PersonalInformationForm from './components/PersonalInformationForm'
import EducationForm from './components/EducationForm'
import ExperiencesForm from './components/ExperiencesForm'

const CreateCandidateModal: React.FC<{ show?: boolean; onClose?: () => void; onSubmited?: () => void }> = ({ show, onClose }) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)

  const toast = useToast()
  const confirm = useConfirm()

  const [formValues, setFormValues] = useState<any>({
    personalInformation: {},
    educations: {},
    workingExperiences: {},
  })

  const { activeStep, isLastStep, handlePrev, handleNext } = useSteps(3)

  const handleStepSubmit = async (data: any) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep) return

    try {
      setIsSubmitLoading(true)

      toast('Job vacancy successfully created.', { color: 'success', position: 'top-right' })
    } catch (error) {
      toast('An error occurred while creating the job vacancy.', { color: 'error', position: 'top-right' })
      setIsSubmitLoading(false)
    }
  }

  const confirmBeforeClose = async () => {
    const confirmed = await confirm({
      text: 'Want to close this form without saving.',
      cancelBtnColor: 'primary',
      confirmBtnColor: 'error',
      confirmBtnText: 'Yes, close it!',
    })
    if (confirmed) onClose?.()
  }

  return (
    <Modal show={!!show} className="max-w-3xl">
      <ModalHeader subTitle="Input candidate information by filling out candidate form" onClose={confirmBeforeClose}>
        Create Candidate
      </ModalHeader>
      <>
        <Stepper
          className="p-3"
          activeStep={activeStep}
          steps={[
            { title: 'Personal Information', details: '' },
            { title: 'Educations', details: '' },
            { title: 'Experiences', details: '' },
          ]}
        />

        {activeStep === 0 && (
          <PersonalInformationForm
            defaultValue={formValues.personalInformation}
            handleCancel={confirmBeforeClose}
            handleSubmit={(personalInformation) => handleStepSubmit({ ...formValues, personalInformation })}
          />
        )}
        {activeStep === 1 && (
          <EducationForm
            defaultValue={formValues.educations}
            handlePrev={handlePrev}
            handleSubmit={(educations) => handleStepSubmit({ ...formValues, educations })}
          />
        )}

        {activeStep === 2 && (
          <ExperiencesForm
            defaultValue={formValues.workingExperiences}
            handlePrev={handlePrev}
            handleSubmit={(workingExperiences) => handleStepSubmit({ ...formValues, workingExperiences })}
            isLoading={isSubmitLoading}
          />
        )}
      </>
    </Modal>
  )
}

export default CreateCandidateModal
