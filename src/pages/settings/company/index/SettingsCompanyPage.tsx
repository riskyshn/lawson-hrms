import PageHeader from '@/components/Elements/PageHeader'
import SettingsCompanyForm from '../components/SettingsCompanyForm'
import Container from '@/components/Elements/Container'

const SettingsCompanyPage: React.FC = () => {
  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Settings' }, { text: 'Company' }]} title="Company" />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <SettingsCompanyForm />
      </Container>
    </>
  )
}

export default SettingsCompanyPage
