import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Spinner, Stepper, useSteps, useToast } from '@jshrms/ui'
import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { employeeService } from '@/services'
import ComponentsDataForm from '../components/ComponentsDataForm'
import EmploymentDataForm from '../components/EmploymentDataForm'
import PayrollDataForm from '../components/PayrollDataForm'
import PersonalDataForm from '../components/PersonalDataForm'
import useEmployeePage from '../hooks/use-employee-page'
import { employeeToFormEdit } from '../utils/employee-to-form-edit'
import formDataToPayload from '../utils/form-data-to-payload'

export const Component: React.FC = () => {
  const { employee } = useEmployeePage()
  const [isLoaded, setIsLoaded] = useState(false)

  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const [formValues, setFormValues] = useState<any>({
    components: {},
    employment: {},
    payroll: {},
    personalData: {},
  })

  const { activeStep, handleNext, handlePrev, isLastStep } = useSteps(4, {
    onNext() {
      window.scrollTo({ behavior: 'smooth', top: 0 })
    },
  })

  useEffect(() => {
    if (!employee) return

    const load = async () => {
      const values = await employeeToFormEdit(employee)
      console.log(values)
      setFormValues(values)
      setIsLoaded(true)
    }
    load()
  }, [employee])

  const handleStepSubmit = async (data: any) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep || !employee) return

    setIsSubmitLoading(true)

    try {
      await employeeService.updateEmployee(employee.oid, formDataToPayload(data))

      toast('Employee successfully updated.', { color: 'success' })
      navigate(`/employees/employee-management`)
    } catch (error) {
      toast('An error occurred while updating the Employee.', { color: 'error' })
      setIsSubmitLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        actions={
          <Button as={Link} color="error" to="/employees/employee-management" variant="light">
            Cancel
          </Button>
        }
        breadcrumb={[{ text: 'Employee' }, { text: 'Employee Management' }, { text: 'Edit' }]}
        title="Edit Employee"
      />

      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <Stepper
          activeStep={activeStep}
          steps={[
            { details: 'Set Requirement Personal Data', title: 'Personal Data' },
            { details: 'Set Requirement Employment Data', title: 'Employment Data' },
            { details: 'Set Payroll', title: 'Payroll' },
            { details: 'Set Components', title: 'Components' },
          ]}
        />

        {!isLoaded && (
          <div className="flex items-center justify-center py-48">
            <Spinner className="text-primary-600" height={40} />
          </div>
        )}

        {isLoaded && activeStep === 0 && (
          <PersonalDataForm
            defaultValue={formValues.personalData}
            handlePrev={handlePrev}
            handleSubmit={(personalData) => handleStepSubmit({ ...formValues, personalData })}
          />
        )}
        {isLoaded && activeStep === 1 && (
          <EmploymentDataForm
            defaultValue={formValues.employment}
            handlePrev={handlePrev}
            handleSubmit={(employment) => handleStepSubmit({ ...formValues, employment })}
          />
        )}
        {isLoaded && activeStep === 2 && (
          <PayrollDataForm
            defaultValue={formValues.payroll}
            handlePrev={handlePrev}
            handleSubmit={(payroll) => handleStepSubmit({ ...formValues, payroll })}
          />
        )}
        {isLoaded && activeStep === 3 && (
          <ComponentsDataForm
            allFormData={formValues}
            defaultValue={formValues.components}
            handlePrev={handlePrev}
            handleSubmit={(components) => handleStepSubmit({ ...formValues, components })}
            isEdit
            isLoading={isSubmitLoading}
          />
        )}
      </Container>
    </>
  )
}

Component.displayName = 'EditEmployeePage'
