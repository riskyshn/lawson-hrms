import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { employeeService, payrollService } from '@/services'
import { Button, Spinner, Stepper, useSteps, useToast } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ComponentsDataForm from '../components/ComponentsDataForm'
import EmploymentDataForm from '../components/EmploymentDataForm'
import PayrollDataForm from '../components/PayrollDataForm'
import PersonalDataForm from '../components/PersonalDataForm'
import formDataToPayload from '../utils/form-data-to-payload'
import useLoadApplicant from './hooks/use-load-applicant'
import { applicantToFormCreate } from './utils/applicant-to-form-create'

const CreateEmployeePage = () => {
  const { applicant, isLoading } = useLoadApplicant()
  const [isLoaded, setIsLoaded] = useState(false)

  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()
  const [pageError, setPageError] = useState<any>()

  if (pageError) throw pageError

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

    const { personalData, employment } = applicantToFormCreate(applicant)
    setFormValues((formValues: any) => ({ ...formValues, personalData, employment }))
    setIsLoaded(true)
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
  console.log(isLoaded, isLoading)
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

        {!(isLoaded || !isLoading) && (
          <div className="flex items-center justify-center py-48">
            <Spinner height={40} className="text-primary-600" />
          </div>
        )}

        {(isLoaded || !isLoading) && activeStep === 0 && (
          <PersonalDataForm
            defaultValue={formValues.personalData}
            handlePrev={handlePrev}
            handleSubmit={(personalData) => handleStepSubmit({ ...formValues, personalData })}
          />
        )}
        {(isLoaded || !isLoading) && activeStep === 1 && (
          <EmploymentDataForm
            defaultValue={formValues.employment}
            handlePrev={handlePrev}
            handleSubmit={(employment) => handleStepSubmit({ ...formValues, employment })}
          />
        )}
        {(isLoaded || !isLoading) && activeStep === 2 && (
          <PayrollDataForm
            defaultValue={formValues.payroll}
            handlePrev={handlePrev}
            handleSubmit={(payroll) => handleStepSubmit({ ...formValues, payroll })}
          />
        )}
        {(isLoaded || !isLoading) && activeStep === 3 && (
          <ComponentsDataForm
            defaultValue={formValues.components}
            allFormData={formValues}
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
