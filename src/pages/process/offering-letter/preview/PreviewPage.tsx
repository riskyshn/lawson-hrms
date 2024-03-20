import PageHeader from '@/components/Elements/PageHeader'
import Container from '@/components/Elements/Container'
import { Button } from 'jobseeker-ui'
import { Link } from 'react-router-dom'

const PreviewPage: React.FC = () => {
  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }, { text: 'Preview Offering Letter Template' }]}
        title="Preview Offering Letter Template"
      />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <iframe src={'/sample.pdf'} className="block h-full w-full rounded-lg bg-white" style={{ height: '100vh', border: 'none' }} />
        <div className="flex justify-end">
          <Button as={Link} to="/process/offering-letter/create" color="primary" className="w-32">
            Back
          </Button>
        </div>
      </Container>
    </>
  )
}

export default PreviewPage
