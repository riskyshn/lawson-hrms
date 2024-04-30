import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import useAsyncSearch from '@/core/hooks/use-async-search'
import { dashboardService } from '@/services'
import { BaseInputDateRange, Button, Card, CardBody, CardFooter, CardHeader } from 'jobseeker-ui'
import moment from 'moment'
import { useState } from 'react'
import AnnouncementItem from './AnnouncmentItem'
import CreateModal from './CreateModal'
import PreviewModal from './PreviewModal'

const AnnouncementCard: React.FC = () => {
  const [show, setShow] = useState(false)
  const [selectedToPreview, setSelectedToPreview] = useState<IDashboardAnnouncement | null>(null)
  const [filterDate, setFilterDate] = useState<{ startDate: Date; endDate: Date }>()

  const { pageData, onRefresh } = useAsyncSearch(dashboardService.fetchAnnouncements, {
    limit: 20,
    start_date: filterDate?.startDate && moment(filterDate.startDate).format('Y-MM-DD'),
    end_date: filterDate?.endDate && moment(filterDate.endDate).format('Y-MM-DD'),
  })

  return (
    <>
      <CreateModal show={show} onClose={() => setShow(false)} onRefresh={onRefresh} />
      <PreviewModal item={selectedToPreview} onClose={() => setSelectedToPreview(null)} />

      <Card className="flex h-[500px] flex-col">
        <LoadingScreen show={!pageData} className="flex-1" />
        {pageData && (
          <>
            <CardHeader
              className="h-16"
              actions={<BaseInputDateRange placeholder="Filter by date" value={filterDate} onValueChange={setFilterDate} />}
            >
              <div className="font-semibold">Announcement</div>
            </CardHeader>
            <CardBody as="ul" className="chrome-scrollbar flex-1 overflow-y-auto">
              {pageData.content.map((el, i) => (
                <AnnouncementItem key={i} item={el} onClick={setSelectedToPreview} onRefresh={onRefresh} />
              ))}
            </CardBody>
            <CardFooter>
              <Button type="button" block color="primary" variant="light" onClick={() => setShow(true)}>
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
