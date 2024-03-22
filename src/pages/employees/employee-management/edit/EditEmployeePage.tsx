import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { employeeService } from '@/services'
import currencyToNumber from '@/utils/currency-to-number'
import { Button, Spinner, Stepper, useSteps, useToast } from 'jobseeker-ui'
import moment from 'moment'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ComponentsDataForm from '../components/ComponentsDataForm'
import EmploymentDataForm from '../components/EmploymentDataForm'
import PayrollDataForm from '../components/PayrollDataForm'
import PersonalDataForm from '../components/PersonalDataForm'
import useEmployeePage from '../hooks/use-employee-page'
import { employeeToFormEdit } from '../utils/employee-to-form-edit'

const EditEmployeePage = () => {
  const { employee } = useEmployeePage()
  const [isLoaded, setIsLoaded] = useState(false)

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

  useEffect(() => {
    if (employee) {
      setFormValues(employeeToFormEdit(employee))
      setIsLoaded(true)
    }
  }, [employee])

  const handleStepSubmit = async (data: any) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep || !employee) return

    setIsSubmitLoading(true)

    try {
      const { personalData, payroll, components } = data

      const payload = {
        name: personalData.name,
        email: personalData.email,
        ...data,
        personalData: {
          ...personalData,
          dateOfBirth: moment(personalData.dateOfBirth).format('YYYY-MM-DD'),
        },
        payroll: {
          ...payroll,
          baseSalary: currencyToNumber(payroll.baseSalary),
        },
        components: {
          ...components,
          benefits: components.benefits.map((el: any) => ({ ...el, amount: currencyToNumber(el.amount) })),
          deductions: components.deductions.map((el: any) => ({ ...el, amount: currencyToNumber(el.amount) })),
        },
      }

      await employeeService.updateEmployee(employee.oid, payload)

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
        breadcrumb={[{ text: 'Employee' }, { text: 'Employee Management' }, { text: 'Edit' }]}
        title="Edit Employee"
        actions={
          <Button as={Link} to="/employees/employee-management" variant="light" color="error">
            Cancel
          </Button>
        }
      />

      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <Stepper
          activeStep={activeStep}
          className="grid grid-cols-1 md:grid-flow-row md:grid-cols-2"
          steps={[
            { title: 'Personal Data', details: 'Set Requirement Personal Data' },
            { title: 'Employment Data', details: 'Set Requirement Employment Data' },
            { title: 'Payroll', details: 'Set Payroll' },
            { title: 'Components', details: 'Set Components' },
          ]}
        />

        {!isLoaded && (
          <div className="flex items-center justify-center py-48">
            <Spinner height={40} className="text-primary-600" />
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
            isEdit
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

export default EditEmployeePage
