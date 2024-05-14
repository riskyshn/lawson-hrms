import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Container from '@jshrms/shared/components/Elements/Layout/Container'
import PageHeader from '@jshrms/shared/components/Elements/Layout/PageHeader'
import { processService } from '@jshrms/shared/services'
import { axiosErrorMessage, currencyToNumber } from '@jshrms/shared/utils'
import { Stepper, useSteps, useToast } from '@jshrms/ui'
import moment from 'moment'
import EmployeeDetailsForm from '../components/EmployeeDetailsForm'
import RenumerationForm from '../components/RenumerationForm'

const processFormData = (data: Record<string, Record<string, any>>) => {
  const obj: Record<string, any> = {}
  Object.values(data).forEach((item) => {
    for (const key in item) {
      if (Object.prototype.hasOwnProperty.call(item, key)) {
        obj[key] = item[key]
      }
    }
  })

  obj.joinDate = moment(obj.joinDate).format('YYYY-MM-DD')
  if (obj.expiryDate) obj.expiryDate = moment(obj.expiryDate).format('YYYY-MM-DD')
  obj.baseSalary = currencyToNumber(obj.baseSalary)
  obj.benefits = obj.benefits.map((el: Record<string, any>) => ({ ...el, amount: currencyToNumber(el.amount) }))

  obj.cityId = obj.city?.value
  delete obj.city
  obj.departmentId = obj.department?.value
  delete obj.department
  obj.jobLevelId = obj.jobLevel?.value
  delete obj.jobLevel
  obj.jobTypeId = obj.jobType?.value
  delete obj.jobType
  obj.positionId = obj.position?.value
  delete obj.position

  return obj
}

const CreateOfferingLetterPage: React.FC = () => {
  const { applicantId } = useParams()
  const navigate = useNavigate()
  const toast = useToast()

  const [loading, setLoading] = useState(false)

  const [formValues, setFormValues] = useState<any>({
    step1: {},
    step2: {},
  })

  const { activeStep, handleNext, handlePrev, isLastStep } = useSteps(2, {
    onNext() {
      window.scrollTo({ behavior: 'smooth', top: 0 })
    },
  })

  const handleStepSubmit = async (data: any) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep) return
    setLoading(true)
    try {
      await processService.createOfferingLetter({ applicantId, ...processFormData(data) })
      toast('Offering letter successfully created.', { color: 'success' })
      navigate(`/process/offering-letter`)
    } catch (error) {
      toast(axiosErrorMessage(error), { color: 'error' })
      setLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }, { text: 'Create Offering Letter' }]}
        subtitle="Please fill out the form below to generate offering letter"
        title="Offering Letter"
      />

      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <Stepper
          activeStep={activeStep}
          steps={[
            { details: 'Set Employment Detail’s', title: 'Employment Details' },
            { details: 'Set Information', title: 'Remuneration & Benefits' },
          ]}
        />

        {activeStep === 0 && (
          <EmployeeDetailsForm
            defaultValue={formValues.step1}
            handlePrev={handlePrev}
            handleSubmit={(step1) => handleStepSubmit({ ...formValues, step1 })}
          />
        )}
        {activeStep === 1 && (
          <RenumerationForm
            defaultValue={formValues.step2}
            handlePrev={handlePrev}
            handleSubmit={(step2) => handleStepSubmit({ ...formValues, step2 })}
            isLoading={loading}
          />
        )}
      </Container>
    </>
  )
}

export default CreateOfferingLetterPage
