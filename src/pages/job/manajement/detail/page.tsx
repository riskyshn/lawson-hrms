import { Link } from 'react-router-dom'
import { Button } from '@jshrms/ui'
import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import PreviewVacancy from '@/components/Modules/Job/PreviewVacancy'
import useVacancyPage from '../../hooks/use-vacancy-page'

export const Component: React.FC = () => {
  const { isLoading, vacancy } = useVacancyPage()

  return (
    <>
      <PageHeader
        actions={
          <Button as={Link} color="error" to="/job/Management" variant="light">
            Back
          </Button>
        }
        breadcrumb={[{ text: 'Job' }, { text: 'Management' }, { text: 'Preview Management' }]}
        title="Preview Job Management"
      />
      <Container className="flex flex-col gap-3 pb-3 xl:pb-8">
        <PreviewVacancy isLoading={isLoading} vacancy={vacancy} />
      </Container>
    </>
  )
}

Component.displayName = 'DetailJobPage'
