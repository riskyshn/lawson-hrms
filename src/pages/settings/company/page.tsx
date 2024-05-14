import Container from '@jshrms/shared/components/Elements/Layout/Container'
import PageHeader from '@jshrms/shared/components/Elements/Layout/PageHeader'
import SettingsCompanyForm from './components/SettingsCompanyForm'

export const Component: React.FC = () => {
  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Settings' }, { text: 'Company' }]} title="Company" />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <SettingsCompanyForm />
      </Container>
    </>
  )
}

Component.displayName = 'SettingsCompanyPage'
