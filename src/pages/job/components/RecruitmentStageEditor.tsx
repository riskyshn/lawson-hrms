import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import useAsyncAction from '@/core/hooks/use-async-action'
import { organizationService } from '@/services'
import { Button, Card, CardBody } from 'jobseeker-ui'
import { PlusCircleIcon } from 'lucide-react'
import { useState } from 'react'
import RecruitmentStageItem from './RecruitmentStageItem'

const RecruitmentStagesEditor: React.FC = () => {
  const [recruitmentStages, loading] = useAsyncAction(organizationService.fetchRecruitmentStages, { limit: 99999 })

  const [toCreateInterviews, setToCreateInterviews] = useState<Array<number>>([])
  const [toCreateAssessments, setToCreateAssessments] = useState<Array<number>>([])

  const interviews = recruitmentStages?.content.filter((el) => el.type == 'INTERVIEW') || []
  const assessments = recruitmentStages?.content.filter((el) => el.type == 'ASSESSMENT') || []

  return (
    <Card>
      <LoadingScreen show={loading} />
      {!loading && (
        <>
          {' '}
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
            <h3 className="text-lg font-semibold">Assessment</h3>
            {assessments.map((el) => (
              <RecruitmentStageItem key={el.oid} item={el} />
            ))}
            {toCreateAssessments.map((id) => (
              <RecruitmentStageItem
                key={id}
                isNew
                type="ASSESSMENT"
                onRemove={() => setToCreateAssessments([...toCreateAssessments.filter((i) => i != id)])}
              />
            ))}
            <Button
              block
              variant="light"
              color="primary"
              type="button"
              onClick={() => setToCreateAssessments([...toCreateAssessments, Date.now() + Math.random() * 10])}
            >
              <PlusCircleIcon size={16} />
            </Button>
          </CardBody>
        </>
      )}
    </Card>
  )
}

export default RecruitmentStagesEditor
