import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { employeeService } from '@/services'
import { Button, Stepper, useSteps, useToast } from 'jobseeker-ui'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ComponentsDataForm from '../components/ComponentsDataForm'
import EmploymentDataForm from '../components/EmploymentDataForm'
import PayrollDataForm from '../components/PayrollDataForm'
import PersonalDataForm from '../components/PersonalDataForm'
import formDataToPayload from '../utils/form-data-to-payload'

const CreateEmployeePage = () => {
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const [formValues, setFormValues] = useState<any>({
    personalData: {},
    employment: {},
    payroll: {},
    components: {},
  })

  const { activeStep, isLastStep, handlePrev, handleNext } = useSteps(4, {
    onNext() {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    },
  })

  const handleStepSubmit = async (data: any) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep) return

    setIsSubmitLoading(true)

    try {
      await employeeService.createEmployee(formDataToPayload(data))

      toast('Employee successfully created.', { color: 'success' })
      navigate(`/employees/employee-management`)
    } catch (error) {
      toast('An error occurred while creating the Employee.', { color: 'error' })
      setIsSubmitLoading(false)
    }
  }

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
            defaultValue={formValues.employment}
            handlePrev={handlePrev}
            handleSubmit={(employment) => handleStepSubmit({ ...formValues, employment })}
          />
        )}
        {activeStep === 2 && (
          <PayrollDataForm
            defaultValue={formValues.payroll}
            handlePrev={handlePrev}
            handleSubmit={(payroll) => handleStepSubmit({ ...formValues, payroll })}
          />
        )}
        {activeStep === 3 && (
          <ComponentsDataForm
            defaultValue={formValues.components}
            handlePrev={handlePrev}
            handleSubmit={(components) => handleStepSubmit({ ...formValues, components })}
            isLoading={isSubmitLoading}
          />
        )}
      </Container>
    </>
  )
}

export default CreateEmployeePage
