import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { vacancyService } from '@/services'
import currencyToNumber from '@/utils/currency-to-number'
import { Button, Stepper, useSteps, useToast } from 'jobseeker-ui'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProcessForm from '../../components/ProcessForm'
import RequirementsForm from '../../components/RequirementsForm'
import VacancyInformationForm from '../../components/VacancyInformationForm'
import moment from 'moment'

const CreateJobRequisitionPage = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const [formValues, setFormValues] = useState<any>({
    vacancyInformation: {},
    process: {},
    requirements: {},
  })

  const { activeStep, isLastStep, handlePrev, handleNext } = useSteps(3, {
    onNext() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  })

  const handleStepSubmit = async (data: any) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep) return

    try {
      const processedData = processFormData(data)
      setIsSubmitLoading(true)

      const createdVacancy = await vacancyService.createVacancy(processedData)
      toast('Job vacancy successfully created.', { color: 'success', position: 'top-right' })
      navigate(`/job/requisition/${createdVacancy.oid}`)
    } catch (error) {
      toast('An error occurred while creating the job vacancy.', { color: 'error', position: 'top-right' })
      setIsSubmitLoading(false)
    }
  }

  const processFormData = (data: Record<string, Record<string, any>>) => {
    const obj: Record<string, any> = {}
    Object.values(data).forEach((item) => {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          obj[key] = item[key]
        }
      }
    })

    obj.expiredDate = moment().add(3, 'months').format('YYYY-MM-DDTHH:mm:ss.SSS') // remove this when omi updated the backend.
    obj.minimumSalary = currencyToNumber(obj.minimumSalary)
    obj.maximumSalary = currencyToNumber(obj.maximumSalary)
    obj.maximumSalaryRequirement = currencyToNumber(obj.maximumSalaryRequirement)

    return obj
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Job' }, { text: 'Requisition' }, { text: 'Create Job' }]}
        title="Create Job Posting"
        actions={
          <Button as={Link} to="/job/requisition" variant="light" color="error">
            Cancel
          </Button>
        }
      />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <Stepper
          activeStep={activeStep}
          steps={[
            { title: 'Vacancy Information', details: 'Setup Your Vacancy' },
            { title: 'Process', details: 'Set Requirement Process' },
            { title: 'Requirements', details: 'Set Requirements' },
          ]}
        />

        {activeStep === 0 && (
          <VacancyInformationForm
            isRequisition
            defaultValue={formValues.vacancyInformation}
            handlePrev={handlePrev}
            handleSubmit={(vacancyInformation) => handleStepSubmit({ ...formValues, vacancyInformation })}
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
            isRequisition
            defaultValue={formValues.requirements}
            handlePrev={handlePrev}
            handleSubmit={(requirements) => handleStepSubmit({ ...formValues, requirements })}
            isLoading={isSubmitLoading}
          />
        )}
      </Container>
    </>
  )
}

export default CreateJobRequisitionPage
