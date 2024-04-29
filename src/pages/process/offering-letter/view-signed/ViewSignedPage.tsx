import Container from '@/components/Elements/Layout/Container'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncAction from '@/core/hooks/use-async-action'
import { processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { Button, useToast } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const ViewSignedPage: React.FC = () => {
  const { applicantId } = useParams()
  const [previewUrl, setPreviewUrl] = useState<string>()
  const toast = useToast()

  const [preview] = useAsyncAction(processService.previewOfferingLetter, String(applicantId), { headers: { Accept: 'application/pdf' } })

  useEffect(() => {
    const onPreview = async () => {
      if (!preview) return
      try {
        const blob = new Blob([preview.data], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        setPreviewUrl(url)
      } catch (e) {
        toast(axiosErrorMessage(e), { color: 'error' })
      }
    }
    onPreview()
  }, [preview, toast])

  const onDownload = async () => {
    if (!preview) return
    try {
      const blob = new Blob([preview.data], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `offering-letter-${+new Date()}.pdf`
      link.click()
      window.URL.revokeObjectURL(link.href)
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
  }

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }, { text: 'View Signed Offering Letter' }]} />
      <Container className="flex h-[calc(100vh-102px)] flex-col gap-3 py-3">
        <LoadingScreen show={!previewUrl} className="flex-1" spinnerSize={80} />
        {previewUrl && <iframe src={previewUrl} className="block flex-1 rounded-lg bg-white" />}
        <div className="flex justify-end gap-3">
          <Button as={Link} to="/process/offering-letter" color="primary" variant="light" className="w-32">
            Back
          </Button>
          <Button color="primary" className="w-32" onClick={onDownload}>
            Download
          </Button>
        </div>
      </Container>
    </>
  )
}

export default ViewSignedPage
