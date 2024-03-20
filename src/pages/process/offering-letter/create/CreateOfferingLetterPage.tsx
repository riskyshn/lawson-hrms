import PageHeader from '@/components/Elements/PageHeader'
import Container from '@/components/Elements/Container'
import OfferingLetterForm from '../components/OfferingLetterForm'

const CreateOfferingLetterPage: React.FC = () => {
  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }, { text: 'Setup Offering Letter' }]} />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <OfferingLetterForm />
      </Container>
    </>
  )
}

export default CreateOfferingLetterPage
