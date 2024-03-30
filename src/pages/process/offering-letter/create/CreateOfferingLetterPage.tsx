import PageHeader from '@/components/Elements/PageHeader'
import { useNavigate } from 'react-router-dom'
import { Stepper, useSteps, useToast } from 'jobseeker-ui'
import { useState } from 'react'
import Container from '@/components/Elements/Container'
import RenumerationForm from './components/RenumerationForm'
import EmployeeDetailsForm from './components/EmployeeDetailsForm'

const CreateOfferingLetterPage: React.FC = () => {
  const navigate = useNavigate()
  const toast = useToast()

  const [formValues, setFormValues] = useState<any>({
    personalData: {},
    employmentData: {},
    payrollData: {},
    componentsData: {},
  })

  const { activeStep, isLastStep, handlePrev, handleNext } = useSteps(2, {
    onNext() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  })

  const handleStepSubmit = async (data: any) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep) return

    try {
      toast('Offering letter successfully created.', { color: 'success', position: 'top-right' })
      navigate(`/process/offering-letter`)
    } catch (error) {
      toast('An error occurred while creating the offering letter.', { color: 'error', position: 'top-right' })
    }
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }, { text: 'Create Offering Letter' }]}
        title="Offering Letter"
        subtitle="Please fill out the form below to generate offering letter"
      />

      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <Stepper
          activeStep={activeStep}
          steps={[
            { title: 'Employment Details', details: 'Set Employment Detail’s' },
            { title: 'Remuneration & Benefits', details: 'Set Information' },
          ]}
        />

        {activeStep === 0 && (
          <EmployeeDetailsForm
            defaultValue={formValues.personalData}
            handlePrev={handlePrev}
            handleSubmit={(employeeData) => handleStepSubmit({ ...formValues, employeeData })}
          />
        )}
        {activeStep === 1 && (
          <RenumerationForm
            defaultValue={formValues.employmentData}
            handlePrev={handlePrev}
            handleSubmit={(renumerationData) => handleStepSubmit({ ...formValues, renumerationData })}
          />
        )}
      </Container>
    </>
  )
}

export default CreateOfferingLetterPage
