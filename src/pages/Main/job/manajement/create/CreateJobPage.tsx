import { useState } from 'react'
import { Button, Stepper, useSteps } from 'jobseeker-ui'
import PageHeader from '@/components/UI/PageHeader'
import VacancyInformationForm from './components/VacancyInformationForm'
import ProcessForm from './components/ProcessForm'
import RequirementsForm from './components/RequirementsForm'
import Container from '@/components/Elements/Container'
import { Link } from 'react-router-dom'

const CreateJobPage: React.FC = () => {
  const [formValues, setFormValues] = useState<any>({
    vacancyInformation: {},
    process: {},
    requirements: {},
  })
  const { activeStep, handlePrev, handleNext } = useSteps(3, {
    onNext() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  })

  const handleStepSubmit = (data: any) => {
    handleNext()
    setFormValues(data)
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
      <Container className="flex flex-col gap-3 pb-3 xl:pb-8">
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
          />
        )}
      </Container>
    </>
  )
}

export default CreateJobPage
