import PageHeader from '@/components/Elements/PageHeader'
import Container from '@/components/Elements/Container'
import SetupOfferingLetterForm from '../components/SetupOfferingLetterForm'

const SetupOfferingLetterPage: React.FC = () => {
  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }, { text: 'Setup Offering Letter' }]} />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <SetupOfferingLetterForm />
      </Container>
    </>
  )
}

export default SetupOfferingLetterPage
