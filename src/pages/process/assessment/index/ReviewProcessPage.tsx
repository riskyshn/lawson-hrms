import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { Button, Stepper, useSteps, useToast } from 'jobseeker-ui'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import KTPForm from '../components/KTPForm'
import NPWPForm from '../components/NPWPForm'
import KKForm from '../components/KKForm'
import PaklaringForm from '../components/PaklaringForm'
import PaymentSlipForm from '../components/PaymentSlipForm'
import { DownloadIcon } from 'lucide-react'

const ReviewProcessPage = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isSubmitLoading, setIsSubmitLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const [formValues, setFormValues] = useState<any>({
    personalData: {},
    employmentData: {},
    payrollData: {},
    componentsData: {},
  })

  const { activeStep, isLastStep, handlePrev, handleNext } = useSteps(5, {
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
      toast('Assessment process successfully created.', { color: 'success', position: 'top-right' })
      navigate(`/process/assessment`)
    } catch (error) {
      toast('An error occurred while creating the assessment process.', { color: 'error', position: 'top-right' })
      setIsSubmitLoading(false)
    }
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Process' }, { text: 'Assesment' }, { text: 'Review Process' }]}
        title="Candidate Document"
        subtitle="Review Candidate Document"
        actions={
          <Button as={Link} to="/process/assessment" color="primary" className="ml-3 gap-2" rightChild={<DownloadIcon size={18} />}>
            Download All Document
          </Button>
        }
      />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <Stepper
          activeStep={activeStep}
          steps={[
            { title: 'KTP', details: 'Kartu Identitas Penduduk' },
            { title: 'NPWP', details: 'Nomor Pokok Wajib Pajak' },
            { title: 'KK', details: 'Kartu Keluarga' },
            { title: 'Paklaring', details: 'Surat Keterangan Kerja' },
            { title: 'Payment Slip', details: 'Slip Gaji' },
          ]}
        />

        {activeStep === 0 && (
          <KTPForm
            defaultValue={formValues.personalData}
            handlePrev={handlePrev}
            handleSubmit={(ktpData) => handleStepSubmit({ ...formValues, ktpData })}
          />
        )}
        {activeStep === 1 && (
          <NPWPForm
            defaultValue={formValues.employmentData}
            handlePrev={handlePrev}
            handleSubmit={(npwpData) => handleStepSubmit({ ...formValues, npwpData })}
          />
        )}
        {activeStep === 2 && (
          <KKForm
            defaultValue={formValues.payrollData}
            handlePrev={handlePrev}
            handleSubmit={(kkData) => handleStepSubmit({ ...formValues, kkData })}
          />
        )}
        {activeStep === 3 && (
          <PaklaringForm
            defaultValue={formValues.payrollData}
            handlePrev={handlePrev}
            handleSubmit={(paklaringData) => handleStepSubmit({ ...formValues, paklaringData })}
          />
        )}
        {activeStep === 4 && (
          <PaymentSlipForm
            defaultValue={formValues.payrollData}
            handlePrev={handlePrev}
            handleSubmit={(paymentSlipData) => handleStepSubmit({ ...formValues, paymentSlipData })}
          />
        )}
      </Container>
    </>
  )
}

export default ReviewProcessPage
