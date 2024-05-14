import React, { useState } from 'react'
import { Modal, ModalHeader, Stepper, useConfirm, useSteps, useToast } from '@jshrms/ui'
import { authService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import EducationForm from './components/EducationForm'
import ExperiencesForm from './components/ExperiencesForm'
import PersonalInformationForm from './components/PersonalInformationForm'
import formCreateToPayload from './utils/form-create-to-payload'

const CreateCandidateModal: React.FC<{ onClose?: () => void; onSubmited?: () => void; show?: boolean }> = ({
  onClose,
  onSubmited,
  show,
}) => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)

  const toast = useToast()
  const confirm = useConfirm()

  const [formValues, setFormValues] = useState<any>({
    educations: {},
    personalInformation: {},
    workingExperiences: {},
  })

  const { activeStep, handleNext, handlePrev, isLastStep } = useSteps(3)

  const handleStepSubmit = async (data: any) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep) return

    try {
      setIsSubmitLoading(true)
      await authService.signUpCandidate(formCreateToPayload(data))
      onClose?.()
      onSubmited?.()
      toast('Candidate successfully created.', { color: 'success' })
    } catch (error) {
      toast(axiosErrorMessage(error), { color: 'error' })
      setIsSubmitLoading(false)
    }
  }

  const confirmBeforeClose = async () => {
    const confirmed = await confirm({
      cancelBtnColor: 'primary',
      confirmBtnColor: 'error',
      confirmBtnText: 'Yes, close it!',
      text: 'Want to close this form without saving.',
    })
    if (confirmed) onClose?.()
  }

  return (
    <Modal className="max-w-3xl" show={!!show}>
      <ModalHeader onClose={confirmBeforeClose} subTitle="Input candidate information by filling out candidate form">
        Create Candidate
      </ModalHeader>
      <>
        <Stepper
          activeStep={activeStep}
          className="p-3"
          steps={[
            { details: '', title: 'Personal Information' },
            { details: '', title: 'Educations' },
            { details: '', title: 'Experiences' },
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
