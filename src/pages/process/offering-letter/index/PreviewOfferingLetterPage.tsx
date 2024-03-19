import PageHeader from '@/components/Elements/PageHeader'
import Container from '@/components/Elements/Container'

const PreviewOfferingLetterPage: React.FC = () => {
  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }, { text: 'Setup Offering Letter' }]} />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <iframe src={'/sample.pdf'} className="block h-full w-full rounded-lg bg-white" style={{ height: '100vh', border: 'none' }} />
      </Container>
    </>
  )
}

export default PreviewOfferingLetterPage
