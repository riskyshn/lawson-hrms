import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { useOrganizationStore } from '@/store'
import { Button, Card, CardBody } from 'jobseeker-ui'
import { PlusCircleIcon } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import RecruitmentStageItem from './components/RecruitmentStageItem'

const RecruitmentStagesPage: React.FC = () => {
  const { recruitmentStages } = useOrganizationStore()

  const [toCreateInterviews, setToCreateInterviews] = useState<Array<number>>([])
  const [toCreateAssesments, setToCreateAssesments] = useState<Array<number>>([])

  const interviews = recruitmentStages.filter((el) => el.type == 'INTERVIEW')
  const assesments = recruitmentStages.filter((el) => el.type == 'ASSESMENT')

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Job' }, { text: 'Management' }, { text: 'Recruitment Stages' }]}
        title="Setup Master Recruitment Stages"
        subtitle="Setup Recruitment Stages According to Your Needs"
        actions={
          <Button as={Link} to="/job/management" variant="light" color="error">
            Back
          </Button>
        }
      />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <Card>
          <CardBody className="grid grid-cols-1 gap-2">
            <h3 className="text-lg font-semibold">Interview</h3>
            {interviews.map((el) => (
              <RecruitmentStageItem key={el.oid} item={el} />
            ))}
            {toCreateInterviews.map((id) => (
              <RecruitmentStageItem
                key={id}
                type="INTERVIEW"
                isNew
                onRemove={() => setToCreateInterviews([...toCreateInterviews.filter((i) => i != id)])}
              />
            ))}
            <Button
              block
              variant="light"
              color="primary"
              type="button"
              onClick={() => setToCreateInterviews([...toCreateInterviews, Date.now() + Math.random() * 10])}
            >
              <PlusCircleIcon size={16} />
            </Button>
          </CardBody>

          <CardBody className="grid grid-cols-1 gap-2">
            <h3 className="text-lg font-semibold">Assesment</h3>
            {assesments.map((el) => (
              <RecruitmentStageItem key={el.oid} item={el} />
            ))}
            {toCreateAssesments.map((id) => (
              <RecruitmentStageItem
                key={id}
                isNew
                type="ASSESMENT"
                onRemove={() => setToCreateAssesments([...toCreateAssesments.filter((i) => i != id)])}
              />
            ))}
            <Button
              block
              variant="light"
              color="primary"
              type="button"
              onClick={() => setToCreateAssesments([...toCreateAssesments, Date.now() + Math.random() * 10])}
            >
              <PlusCircleIcon size={16} />
            </Button>
          </CardBody>
        </Card>
      </Container>
    </>
  )
}

export default RecruitmentStagesPage
