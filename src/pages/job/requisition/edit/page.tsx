import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Spinner, Stepper, useSteps, useToast } from 'jobseeker-ui'
import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { vacancyService } from '@/services'
import ProcessForm from '../../components/ProcessForm'
import RequirementsForm from '../../components/RequirementsForm'
import VacancyInformationForm from '../../components/VacancyInformationForm'
import useVacancyPage from '../../hooks/use-vacancy-page'
import formDataToPayload from '../../utils/form-data-to-payload'
import { vacancyToFormEdit } from '../../utils/vacancy-to-form-edit'

export const Component: React.FC = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const { vacancy } = useVacancyPage()
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

  useEffect(() => {
    if (vacancy) {
      setFormValues(vacancyToFormEdit(vacancy, true))
      setIsLoaded(true)
    }
  }, [vacancy])

  const handleStepSubmit = async (data: any) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep || !vacancy) return

    try {
      setIsSubmitLoading(true)
      await vacancyService.udpateVacancy(vacancy.oid, formDataToPayload(data, true))
      toast('Job vacancy successfully updated.', { color: 'success' })
      navigate('/job/requisition')
    } catch (error) {
      toast('An error occurred while updating the job vacancy.', { color: 'error' })
    } finally {
      setIsSubmitLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        actions={
          <Button as={Link} color="error" to="/job/management" variant="light">
            Cancel
          </Button>
        }
        breadcrumb={[{ text: 'Job' }, { text: 'Management' }, { text: 'Edit Job' }]}
        title="Edit Job Posting"
      />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        {
          <Stepper
            activeStep={activeStep}
            steps={[
              { details: 'Setup Your Vacancy', title: 'Vacancy Information' },
              { details: 'Set Requirement Process', title: 'Process' },
              { details: 'Set Requirements', title: 'Requirements' },
            ]}
          />
        }

        {!isLoaded && (
          <div className="flex items-center justify-center py-48">
            <Spinner className="text-primary-600" height={40} />
          </div>
        )}

        {isLoaded && activeStep === 0 && (
          <VacancyInformationForm
            defaultValue={formValues.vacancyInformation}
            handlePrev={handlePrev}
            handleSubmit={(vacancyInformation) => handleStepSubmit({ ...formValues, vacancyInformation })}
            isRequisition
          />
        )}

        {isLoaded && activeStep === 1 && (
          <ProcessForm
            defaultValue={formValues.process}
            handlePrev={handlePrev}
            handleSubmit={(process) => handleStepSubmit({ ...formValues, process })}
          />
        )}

        {isLoaded && activeStep === 2 && (
          <RequirementsForm
            defaultValue={formValues.requirements}
            handlePrev={handlePrev}
            handleSubmit={(requirements) => handleStepSubmit({ ...formValues, requirements })}
            isLoading={isSubmitLoading}
            isUpdate
          />
        )}
      </Container>
    </>
  )
}

Component.displayName = 'EditJobRequisitionPage'
