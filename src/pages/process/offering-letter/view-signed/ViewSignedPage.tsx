import PageHeader from '@/components/Elements/PageHeader'
import Container from '@/components/Elements/Container'
import { Button } from 'jobseeker-ui'

const ViewSignedPage: React.FC = () => {
  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }, { text: 'View Signed Offering Letter' }]}
        title="View Signed Offering Letter"
      />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <iframe src={'/sample.pdf'} className="block h-full w-full rounded-lg bg-white" style={{ height: '100vh', border: 'none' }} />
        <div className="flex justify-end">
          <Button color="primary" className="w-32">
            Download
          </Button>
        </div>
      </Container>
    </>
  )
}

export default ViewSignedPage
