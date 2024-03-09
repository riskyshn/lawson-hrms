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

const CreateJobPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false)
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
  const navigate = useNavigate()
  const toast = useToast()

  const handleStepSubmit = async (data: Record<string, Record<string, any>>) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep) return

    const obj: Record<string, any> = {}
    Object.values(data).forEach((item) => {
      for (const key in item) {
        if (Object.prototype.hasOwnProperty.call(item, key)) {
          obj[key] = item[key]
        }
      }
    })

    obj.minimumSalary = currencyToNumber(obj.minimumSalary)
    obj.maximumSalary = currencyToNumber(obj.maximumSalary)

    obj.provinceRequirementId = obj.provinceRequirementId?.split('|')[1]
    obj.maximumSalaryRequirement = currencyToNumber(obj.maximumSalaryRequirement)

    obj.recruitmentProcess = ['65d2e8985a44ab03fb6ce39f', '65d2e8985a44ab03fb6ce39f']
    obj.approvals = ['65d2e8985a44ab03fb6ce39f', '65d2e8985a44ab03fb6ce39f']

    obj.rrNumber = 'JOC1'

    setIsLoading(true)

    try {
      const data = await vacancyService.createVacancy(obj)
      toast('Job vacancy successfully created.', { color: 'success', position: 'top-right' })
      navigate(`/job/management/${data.id}/edit`)
    } catch (e: any) {
      toast('An error occurred while creating the job vacancy.', { color: 'error', position: 'top-right' })
      setIsLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Job' }, { text: 'Management' }, { text: 'Create Job' }]}
        title="Create Job Posting"
        actions={
          <Button as={Link} to="/job/management" variant="light" color="error">
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
            defaultValue={formValues.requirements}
            handlePrev={handlePrev}
            handleSubmit={(requirements) => handleStepSubmit({ ...formValues, requirements })}
            isLoading={isLoading}
          />
        )}
      </Container>
    </>
  )
}

export default CreateJobPage
