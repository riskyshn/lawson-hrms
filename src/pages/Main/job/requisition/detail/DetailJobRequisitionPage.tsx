import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { Button, Card, CardBody, CardFooter, Textarea } from 'jobseeker-ui'
import { Link } from 'react-router-dom'
import PreviewVacancy from '../../components/PreviewVacancy'
import useVacancyPage from '../../hooks/use-vacancy-page'

const DetailJobRequisitionPage: React.FC = () => {
  const { vacancy, isLoading } = useVacancyPage()

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Job' }, { text: 'Requisition' }, { text: 'Preview Requisition' }]}
        title="Preview Job Requisition"
        actions={
          <Button as={Link} to="/job/requisition" variant="light" color="error">
            Cancel
          </Button>
        }
      />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <PreviewVacancy vacancy={vacancy} isLoading={isLoading} />

        <Card>
          <CardBody>
            <Textarea label="Notes" placeholder="Add Your Notes Here" />
          </CardBody>

          <CardFooter className="gap-3">
            <Button type="submit" color="error" className="w-32">
              Reject
            </Button>
            <Button type="submit" color="primary" className="w-32">
              Approve
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </>
  )
}

export default DetailJobRequisitionPage
