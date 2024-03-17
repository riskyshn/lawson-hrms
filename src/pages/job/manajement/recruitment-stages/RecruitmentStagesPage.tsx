import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { Button } from 'jobseeker-ui'
import { Link } from 'react-router-dom'
import RecruitmentStagesEditor from '../../components/RecruitmentStageEditor'

const RecruitmentStagesPage: React.FC = () => {
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
        <RecruitmentStagesEditor />
      </Container>
    </>
  )
}

export default RecruitmentStagesPage