import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { Button } from 'jobseeker-ui'
import { Link } from 'react-router-dom'
import PreviewVacancy from '../../components/PreviewVacancy'
import useVacancyPage from '../../hooks/use-vacancy-page'

const DetailJobPage: React.FC = () => {
  const { vacancy, isLoading } = useVacancyPage()

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Job' }, { text: 'Management' }, { text: 'Preview Management' }]}
        title="Preview Job Management"
        actions={
          <Button as={Link} to="/job/Management" variant="light" color="error">
            Back
          </Button>
        }
      />
      <Container className="flex flex-col gap-3 pb-3 xl:pb-8">
        <PreviewVacancy vacancy={vacancy} isLoading={isLoading} />
      </Container>
    </>
  )
}

export default DetailJobPage
