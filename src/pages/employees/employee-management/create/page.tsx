import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Stepper, useSteps, useToast } from '@jshrms/ui'
import Container from '@/components/Elements/Layout/Container'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { employeeService, payrollService } from '@/services'
import ComponentsDataForm from '../components/ComponentsDataForm'
import EmploymentDataForm from '../components/EmploymentDataForm'
import PayrollDataForm from '../components/PayrollDataForm'
import PersonalDataForm from '../components/PersonalDataForm'
import formDataToPayload from '../utils/form-data-to-payload'
import useLoadApplicant from './hooks/use-load-applicant'
import { applicantToFormCreate } from './utils/applicant-to-form-create'

export const Component: React.FC = () => {
  const { applicant, applicantId } = useLoadApplicant()

  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const [pageError, setPageError] = useState<any>()
  const [isDataLoaded, setIsDataLoaded] = useState(!applicantId)

  if (pageError) throw pageError

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
    const load = async () => {
      try {
        const data = await payrollService.fetchBpjsComponent()
        setFormValues({ ...formValues, payroll: { ...formValues.payroll, jkk: data.paidByEmployer?.jkk?.rate } })
      } catch (e) {
        setPageError(e)
      }
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!applicant) return
    const { employment, personalData } = applicantToFormCreate(applicant)
    setFormValues((formValues: any) => ({ ...formValues, employment, personalData }))
    setIsDataLoaded(true)
  }, [applicant])

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
        actions={
          <Button as={Link} color="error" to="/employees/employee-management" variant="light">
            Cancel
          </Button>
        }
        breadcrumb={[{ text: 'Employee' }, { text: 'Employee Management' }, { text: 'Create' }]}
        title="Add Employee"
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

        <LoadingScreen show={!isDataLoaded} spinnerSize={80} strokeWidth={1} />

        {isDataLoaded && (
          <>
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
                allFormData={formValues}
                defaultValue={formValues.components}
                handlePrev={handlePrev}
                handleSubmit={(components) => handleStepSubmit({ ...formValues, components })}
                isLoading={isSubmitLoading}
              />
            )}
          </>
        )}
      </Container>
    </>
  )
}

Component.displayName = 'CreateEmployeePage'
