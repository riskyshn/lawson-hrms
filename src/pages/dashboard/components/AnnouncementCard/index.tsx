import { useState } from 'react'
import { BaseInputDateRange, Button, Card, CardBody, CardFooter, CardHeader } from 'jobseeker-ui'
import moment from 'moment'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import useAsyncSearch from '@/core/hooks/use-async-search'
import { dashboardService } from '@/services'
import AnnouncementItem from './AnnouncmentItem'
import CreateModal from './CreateModal'
import PreviewModal from './PreviewModal'

const AnnouncementCard: React.FC = () => {
  const [show, setShow] = useState(false)
  const [selectedToPreview, setSelectedToPreview] = useState<IDashboardAnnouncement | null>(null)
  const [filterDate, setFilterDate] = useState<{ endDate: Date; startDate: Date }>()

  const { onRefresh, pageData } = useAsyncSearch(dashboardService.fetchAnnouncements, {
    end_date: filterDate?.endDate && moment(filterDate.endDate).format('Y-MM-DD'),
    limit: 20,
    start_date: filterDate?.startDate && moment(filterDate.startDate).format('Y-MM-DD'),
  })

  return (
    <>
      <CreateModal onClose={() => setShow(false)} onRefresh={onRefresh} show={show} />
      <PreviewModal item={selectedToPreview} onClose={() => setSelectedToPreview(null)} />

      <Card className="flex h-[500px] flex-col">
        <LoadingScreen className="flex-1" show={!pageData} />
        {pageData && (
          <>
            <CardHeader
              actions={<BaseInputDateRange onValueChange={setFilterDate} placeholder="Filter by date" value={filterDate} />}
              className="h-16"
            >
              <div className="font-semibold">Announcement</div>
            </CardHeader>
            <CardBody as="ul" className="chrome-scrollbar flex-1 overflow-y-auto">
              {pageData.content.map((el, i) => (
                <AnnouncementItem item={el} key={i} onClick={setSelectedToPreview} onRefresh={onRefresh} />
              ))}
            </CardBody>
            <CardFooter>
              <Button block color="primary" onClick={() => setShow(true)} type="button" variant="light">
                Quick publish an announcement
              </Button>
            </CardFooter>
          </>
        )}
      </Card>
    </>
  )
}

export default AnnouncementCard
