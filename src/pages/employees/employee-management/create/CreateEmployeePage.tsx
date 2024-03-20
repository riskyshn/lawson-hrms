import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { Button, Stepper, useSteps, useToast } from 'jobseeker-ui'
import { Link, useNavigate } from 'react-router-dom'
import PersonalDataForm from './components/PersonalDataForm'
import { useEffect, useState } from 'react'
import EmploymentDataForm from './components/EmploymentDataForm'
import PayrollDataForm from './components/PayrollDataForm'
import ComponentsDataForm from './components/ComponentsDataForm'

const CreateEmployeePage = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const [formValues, setFormValues] = useState<any>({
    personalData: {},
    employmentData: {},
    payrollData: {},
    componentsData: {},
  })

  const { activeStep, isLastStep, handlePrev, handleNext, setActiveStep } = useSteps(4, {
    onNext() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  })

  const handleStepSubmit = async (data: any) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep) return

    try {
      setIsSubmitLoading(true)
      toast('Job vacancy successfully created.', { color: 'success', position: 'top-right' })
      navigate(`/employee/employee-management`)
    } catch (error) {
      toast('An error occurred while creating the job vacancy.', { color: 'error', position: 'top-right' })
      setIsSubmitLoading(false)
    }
  }

  useEffect(() => {
    setActiveStep(3)
  }, [setActiveStep])

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Employee' }, { text: 'Employee Management' }, { text: 'Create' }]}
        title="Add Employee"
        actions={
          <Button as={Link} to="/employees/employee-management" variant="light" color="error">
            Cancel
          </Button>
        }
      />

      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <Stepper
          activeStep={activeStep}
          steps={[
            { title: 'Personal Data', details: 'Set Requirement Personal Data' },
            { title: 'Employment Data', details: 'Set Requirement Employment Data' },
            { title: 'Payroll', details: 'Set Payroll' },
            { title: 'Components', details: 'Set Components' },
          ]}
        />

        {activeStep === 0 && (
          <PersonalDataForm
            defaultValue={formValues.personalData}
            handlePrev={handlePrev}
            handleSubmit={(personalData) => handleStepSubmit({ ...formValues, personalData })}
          />
        )}
        {activeStep === 1 && (
          <EmploymentDataForm
            defaultValue={formValues.employmentData}
            handlePrev={handlePrev}
            handleSubmit={(employmentData) => handleStepSubmit({ ...formValues, employmentData })}
          />
        )}
        {activeStep === 2 && (
          <PayrollDataForm
            defaultValue={formValues.payrollData}
            handlePrev={handlePrev}
            handleSubmit={(payrollData) => handleStepSubmit({ ...formValues, payrollData })}
          />
        )}
        {activeStep === 3 && (
          <ComponentsDataForm
            defaultValue={formValues.payrollData}
            handlePrev={handlePrev}
            handleSubmit={(componentsData) => handleStepSubmit({ ...formValues, componentsData })}
            isLoading={isSubmitLoading}
          />
        )}
      </Container>
    </>
  )
}

export default CreateEmployeePage
