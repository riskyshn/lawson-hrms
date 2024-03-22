import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { Button, Stepper, useSteps, useToast } from 'jobseeker-ui'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ComponentsDataForm from '../components/ComponentsDataForm'
import EmploymentDataForm from '../components/EmploymentDataForm'
import PayrollDataForm from '../components/PayrollDataForm'
import PersonalDataForm from '../components/PersonalDataForm'
import moment from 'moment'
import currencyToNumber from '@/utils/currency-to-number'
import { employeeService } from '@/services'

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

      await employeeService.createEmployee(payload)

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
          className="grid grid-cols-1 md:grid-flow-row md:grid-cols-2"
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
