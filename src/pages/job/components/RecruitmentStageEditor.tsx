import { useState } from 'react'
import { Button, Card, CardBody } from '@jshrms/ui'
import { PlusCircleIcon } from 'lucide-react'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import useAsyncAction from '@/core/hooks/use-async-action'
import { organizationService } from '@/services'
import RecruitmentStageItem from './RecruitmentStageItem'

const RecruitmentStagesEditor: React.FC = () => {
  const [recruitmentStages, loading, onRefresh] = useAsyncAction(organizationService.fetchRecruitmentStages, {
    limit: 99999,
    sortDirection: 'ASC',
  })

  const [toCreateInterviews, setToCreateInterviews] = useState<Array<number>>([])
  const [toCreateAssessments, setToCreateAssessments] = useState<Array<number>>([])

  const interviews = recruitmentStages?.content.filter((el) => el.type == 'INTERVIEW') || []
  const assessments = recruitmentStages?.content.filter((el) => el.type == 'ASSESSMENT') || []

  return (
    <Card>
      <LoadingScreen show={loading || !recruitmentStages?.content} />
      {(!loading || !!recruitmentStages?.content) && (
        <>
          <CardBody className="grid grid-cols-1 gap-2">
            <h3 className="text-lg font-semibold">Interview</h3>
            {interviews.map((el) => (
              <RecruitmentStageItem item={el} key={el.oid} onRefresh={onRefresh} />
            ))}
            {toCreateInterviews.map((id) => (
              <RecruitmentStageItem
                isNew
                key={id}
                onRemove={() => setToCreateInterviews([...toCreateInterviews.filter((i) => i != id)])}
                type="INTERVIEW"
                onRefresh={onRefresh}
              />
            ))}
            <Button
              block
              color="primary"
              onClick={() => setToCreateInterviews([...toCreateInterviews, Date.now() + Math.random() * 10])}
              type="button"
              variant="light"
            >
              <PlusCircleIcon size={16} />
            </Button>
          </CardBody>
          <CardBody className="grid grid-cols-1 gap-2">
            <h3 className="text-lg font-semibold">Assessment</h3>
            {assessments.map((el) => (
              <RecruitmentStageItem item={el} key={el.oid} onRefresh={onRefresh} />
            ))}
            {toCreateAssessments.map((id) => (
              <RecruitmentStageItem
                isNew
                key={id}
                onRemove={() => setToCreateAssessments([...toCreateAssessments.filter((i) => i != id)])}
                onRefresh={onRefresh}
                type="ASSESSMENT"
              />
            ))}
            <Button
              block
              color="primary"
              onClick={() => setToCreateAssessments([...toCreateAssessments, Date.now() + Math.random() * 10])}
              type="button"
              variant="light"
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
