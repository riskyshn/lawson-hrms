import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Container, PageHeader, Stepper, useSteps, useToast } from 'jobseeker-ui'
import { vacancyService } from '@/services'
import ProcessForm from '../../components/ProcessForm'
import RequirementsForm from '../../components/RequirementsForm'
import VacancyInformationForm from '../../components/VacancyInformationForm'
import formDataToPayload from '../../utils/form-data-to-payload'

export const Component: React.FC = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const [formValues, setFormValues] = useState<any>({
    process: {},
    requirements: {},
    vacancyInformation: {},
  })

  const { activeStep, handleNext, handlePrev, isLastStep } = useSteps(3, {
    onNext() {
      window.scrollTo({ behavior: 'smooth', top: 0 })
    },
  })

  const handleStepSubmit = async (data: any) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep) return

    try {
      setIsSubmitLoading(true)

      const createdVacancy = await vacancyService.createVacancy(formDataToPayload(data, true))
      toast('Job vacancy successfully created.', { color: 'success' })
      navigate(`/job/requisition/${createdVacancy.oid}`)
    } catch (error) {
      toast('An error occurred while creating the job vacancy.', { color: 'error' })
      setIsSubmitLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        actions={
          <Button as={Link} color="error" to="/job/requisition" variant="light">
            Cancel
          </Button>
        }
        breadcrumb={[{ text: 'Job' }, { text: 'Requisition' }, { text: 'Create Job' }]}
        title="Create Job Posting"
      />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <Stepper
          activeStep={activeStep}
          steps={[
            { details: 'Setup Your Vacancy', title: 'Vacancy Information' },
            { details: 'Set Requirement Process', title: 'Process' },
            { details: 'Set Requirements', title: 'Requirements' },
          ]}
        />

        {activeStep === 0 && (
          <VacancyInformationForm
            defaultValue={formValues.vacancyInformation}
            handlePrev={handlePrev}
            handleSubmit={(vacancyInformation) => handleStepSubmit({ ...formValues, vacancyInformation })}
            isRequisition
          />
        )}
        {activeStep === 1 && (
          <ProcessForm
            defaultValue={formValues.process}
            handlePrev={handlePrev}
            handleSubmit={(process) => handleStepSubmit({ ...formValues, process })}
          />
        )}
        {activeStep === 2 && (
          <RequirementsForm
            defaultValue={formValues.requirements}
            handlePrev={handlePrev}
            handleSubmit={(requirements) => handleStepSubmit({ ...formValues, requirements })}
            isLoading={isSubmitLoading}
            isRequisition
          />
        )}
      </Container>
    </>
  )
}

Component.displayName = 'CreateJobRequisitionPage'
