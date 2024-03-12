import Container from '@/components/Elements/Container'
import ErrorScreen from '@/components/Elements/ErrorScreen'
import PageHeader from '@/components/Elements/PageHeader'
import { vacancyService } from '@/services'
import currencyToNumber from '@/utils/currency-to-number'
import { Button, Stepper, useSteps, useToast } from 'jobseeker-ui'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProcessForm from '../../components/ProcessForm'
import RequirementsForm from '../../components/RequirementsForm'
import VacancyInformationForm from '../../components/VacancyInformationForm'
import useVacancyPage from '../../hooks/use-vacancy-page'
import { vacancyToFormEdit } from '../../utils/vacancy-to-form-edit'

const EditJobPage = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const toast = useToast()

  const { vacancy, pageError } = useVacancyPage()
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

  useEffect(() => {
    if (vacancy) {
      setFormValues(vacancyToFormEdit(vacancy))
      setIsLoaded(true)
    }
  }, [vacancy])

  const handleStepSubmit = async (data: any) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep || !vacancy) return

    try {
      const processedData = processFormData(data)
      setIsSubmitLoading(true)
      console.log(vacancy.id, processedData)
      await vacancyService.udpateVacancy(vacancy.id, processedData)
      toast('Job vacancy successfully updated.', { color: 'success', position: 'top-right' })
    } catch (error) {
      toast('An error occurred while updating the job vacancy.', { color: 'error', position: 'top-right' })
    } finally {
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

    obj.expiredDate = moment(obj.expiredDate).format('YYYY-MM-DDTHH:mm:ss.SSS')
    obj.minimumSalary = currencyToNumber(obj.minimumSalary)
    obj.maximumSalary = currencyToNumber(obj.maximumSalary)
    obj.maximumSalaryRequirement = currencyToNumber(obj.maximumSalaryRequirement)
    obj.recruitmentProcess = ['65d2e8985a44ab03fb6ce39f', '65d2e8985a44ab03fb6ce39f']
    obj.rrNumber = 'JOC1'

    return obj
  }

  if (pageError) return <ErrorScreen {...pageError} />

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Job' }, { text: 'Management' }, { text: 'Edit Job' }]}
        title="Edit Job Posting"
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

        {isLoaded && activeStep === 0 && (
          <VacancyInformationForm
            defaultValue={formValues.vacancyInformation}
            handlePrev={handlePrev}
            handleSubmit={(vacancyInformation) => handleStepSubmit({ ...formValues, vacancyInformation })}
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
            isUpdate
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

export default EditJobPage
