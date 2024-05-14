import { Link } from 'react-router-dom'
import Container from '@jshrms/shared/components/Elements/Layout/Container'
import PageHeader from '@jshrms/shared/components/Elements/Layout/PageHeader'
import { Button } from '@jshrms/ui'
import RecruitmentStagesEditor from '../../components/RecruitmentStageEditor'

export const Component: React.FC = () => {
  return (
    <>
      <PageHeader
        actions={
          <Button as={Link} color="error" to="/job/management" variant="light">
            Back
          </Button>
        }
        breadcrumb={[{ text: 'Job' }, { text: 'Management' }, { text: 'Recruitment Stages' }]}
        subtitle="Setup Recruitment Stages According to Your Needs"
        title="Setup Master Recruitment Stages"
      />
      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <RecruitmentStagesEditor />
      </Container>
    </>
  )
}

Component.displayName = 'RecruitmentStagesPage'
