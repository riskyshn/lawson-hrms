import PageHeader from '@/components/Elements/PageHeader'
import OfferingLetterForm from '../components/OfferingLetterForm'

const CreateOfferingLetterPage: React.FC = () => {
  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }, { text: 'Create Offering Letter' }]}
        title="Offering Letter"
        subtitle="Please fill out the form below to generate offering letter"
      />
      <OfferingLetterForm />
    </>
  )
}

export default CreateOfferingLetterPage
