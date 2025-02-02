import { useState } from 'react'
import { Button, Card, CardBody, LoadingScreen } from 'jobseeker-ui'
import { PlusCircleIcon } from 'lucide-react'
import { useAsyncAction } from '@/hooks'
import { organizationService } from '@/services'
import RecruitmentStageItem from './RecruitmentStageItem'

const RecruitmentStagesEditor: React.FC<{ onRefresh?: () => void }> = ({ onRefresh: onDataRefresh }) => {
  const [recruitmentStages, loading, onRefresh] = useAsyncAction(organizationService.fetchRecruitmentStages, {
    limit: 99999,
    sortDirection: 'ASC',
  })

  const [toCreateInterviews, setToCreateInterviews] = useState<Array<number>>([])
  const [toCreateAssessments, setToCreateAssessments] = useState<Array<number>>([])

  const administrations = recruitmentStages?.content.filter((el) => el.type == 'ADMINISTRATION') || []
  const selections = recruitmentStages?.content.filter((el) => el.type == 'SELECTION') || []

  return (
    <Card>
      <LoadingScreen show={loading} />
      {!loading && !!recruitmentStages?.content && (
        <>
          <CardBody className="grid grid-cols-1 gap-2">
            <h3 className="text-lg font-semibold">Administration</h3>
            {administrations.map((el) => (
              <RecruitmentStageItem
                item={el}
                key={el.oid}
                onRefresh={() => {
                  onRefresh()
                  onDataRefresh?.()
                }}
              />
            ))}
            {toCreateInterviews.map((id) => (
              <RecruitmentStageItem
                isNew
                key={id}
                onRemove={() => setToCreateInterviews([...toCreateInterviews.filter((i) => i != id)])}
                type="ADMINISTRATION"
                onRefresh={() => {
                  onRefresh()
                  onDataRefresh?.()
                }}
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
            <h3 className="text-lg font-semibold">Selection</h3>
            {selections.map((el) => (
              <RecruitmentStageItem
                item={el}
                key={el.oid}
                onRefresh={() => {
                  onRefresh()
                  onDataRefresh?.()
                }}
              />
            ))}
            {toCreateAssessments.map((id) => (
              <RecruitmentStageItem
                isNew
                key={id}
                onRemove={() => setToCreateAssessments([...toCreateAssessments.filter((i) => i != id)])}
                onRefresh={() => {
                  onRefresh()
                  onDataRefresh?.()
                }}
                type="SELECTION"
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
