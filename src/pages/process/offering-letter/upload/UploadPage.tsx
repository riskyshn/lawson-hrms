import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { Stepper, useSteps, useToast } from 'jobseeker-ui'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import KKForm from '../components/KKForm'
import KTPForm from '../components/KTPForm'
import NPWPForm from '../components/NPWPForm'
import PaklaringForm from '../components/PaklaringForm'
import PaymentSlipForm from '../components/PaymentSlipForm'

const UploadPage = () => {
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
      toast('Upload document offering letter successfully created.', { color: 'success', position: 'top-right' })
      navigate(`/process/offering-letter`)
    } catch (error) {
      toast('An error occurred while creating the upload document offering letter.', { color: 'error', position: 'top-right' })
    }
  }

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Process' }, { text: 'Assesment' }, { text: 'Process' }]}
        title="Upload Document"
        subtitle="Company Name requires you to upload your documents inorder to complete the hiring process"
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

export default UploadPage
