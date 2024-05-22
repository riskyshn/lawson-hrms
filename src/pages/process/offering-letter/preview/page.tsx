import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Button, Container, LoadingScreen, PageHeader, useToast } from 'jobseeker-ui'
import { useAsyncAction } from '@/hooks'
import { processService } from '@/services'
import { axiosErrorMessage } from '@/utils'

export const Component: React.FC = () => {
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
      <PageHeader breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }, { text: 'Preview Offering Letter' }]} />
      <Container className="flex h-[calc(100vh-102px)] flex-col gap-3 py-3">
        <LoadingScreen className="flex-1" show={!previewUrl} spinnerSize={80} />
        {previewUrl && <iframe className="block flex-1 rounded-lg bg-white" src={previewUrl} />}
        <div className="flex justify-end gap-3">
          <Button as={Link} className="w-32" color="primary" to="/process/offering-letter" variant="light">
            Back
          </Button>
          <Button className="w-32" color="primary" onClick={onDownload}>
            Download
          </Button>
        </div>
      </Container>
    </>
  )
}

Component.displayName = 'PreviewOfferingLetterPage'
