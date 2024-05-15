import { Link, useParams } from 'react-router-dom'
import { Button, Container, LoadingScreen, PageHeader, useToast } from 'jobseeker-ui'
import { useAsyncAction } from '@/hooks'
import { processService } from '@/services'
import { axiosErrorMessage } from '@/utils'

const ViewSignedPage: React.FC = () => {
  const { applicantId } = useParams()
  const toast = useToast()

  const [data] = useAsyncAction(processService.getSignedOfferingLetter, String(applicantId))

  const onDownload = async () => {
    if (!data) return

    try {
      const response = await fetch(data.link)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `offering-letter-signed-${Date.now()}.pdf`
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
  }

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }, { text: 'View Signed Offering Letter' }]} />
      <Container className="flex h-[calc(100vh-102px)] flex-col gap-3 py-3">
        <LoadingScreen className="flex-1" show={!data?.link} spinnerSize={80} />
        {data?.link && <iframe className="block flex-1 rounded-lg bg-white" src={data.link} />}
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

export default ViewSignedPage
