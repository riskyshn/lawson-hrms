import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { Button } from 'jobseeker-ui'
import { Link } from 'react-router-dom'

const ViewSignedPage: React.FC = () => {
  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }, { text: 'View Signed Offering Letter' }]} />
      <Container className="flex h-[calc(100vh-102px)] flex-col gap-3 py-3">
        <iframe src={'/sample.pdf'} className="block h-full flex-1 rounded-lg bg-white" />
        <div className="flex justify-end gap-3">
          <Button as={Link} to="/process/offering-letter" color="primary" variant="light" className="w-32">
            Back
          </Button>
          <Button color="primary" className="w-32">
            Download
          </Button>
        </div>
      </Container>
    </>
  )
}

export default ViewSignedPage
