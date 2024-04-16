import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import useAsyncSearch from '@/hooks/use-async-search'
import { dashboardService } from '@/services'
import { BaseInputDate, Button, Card, CardBody, CardFooter, CardHeader } from 'jobseeker-ui'
import moment from 'moment'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import AnnouncementItem from './AnnouncmentItem'
import CreateModal from './CreateModal'
import PreviewModal from './PreviewModal'

const AnnouncementCard: React.FC = () => {
  const [show, setShow] = useState(false)
  const [selectedToPreview, setSelectedToPreview] = useState<IDashboardAnnouncement | null>(null)
  const [filterDate, setFilterDate] = useState<{ startDate: Date; endDate: Date }>()

  const { pageData, isLoading, onRefresh } = useAsyncSearch<IDashboardAnnouncement>({
    action: dashboardService.fetchAnnouncements,
    params: {
      limit: 20,
      start_date: filterDate?.startDate ? moment(filterDate?.startDate).format('Y-MM-DD') : undefined,
      end_date: filterDate?.endDate ? moment(filterDate?.endDate).format('Y-MM-DD') : undefined,
    },
  })

  return (
    <Card>
      <CreateModal show={show} onClose={() => setShow(false)} onRefresh={onRefresh} />
      <PreviewModal item={selectedToPreview} onClose={() => setSelectedToPreview(null)} />
      <LoadingScreen show={!pageData} />
      {pageData && (
        <>
          <CardHeader
            className="h-16"
            actions={
              <BaseInputDate
                placeholder="Filter by date"
                value={filterDate}
                onValueChange={(v) => {
                  if (v?.startDate && v?.endDate) {
                    setFilterDate({ startDate: new Date(v.startDate), endDate: new Date(v.endDate) })
                  } else {
                    setFilterDate(undefined)
                  }
                }}
              />
            }
          >
            <div className="font-semibold">Announcement</div>
          </CardHeader>
          <CardBody className="p-0">
            {!isLoading && (
              <ul className="chrome-scrollbar max-h-80 overflow-y-auto p-3">
                {pageData.content.map((el, i) => (
                  <AnnouncementItem key={i} item={el} onClick={setSelectedToPreview} onRefresh={onRefresh} />
                ))}
              </ul>
            )}

            <LoadingScreen show={isLoading} />
            <div className="p-3">
              <Button variant="light" block onClick={() => setShow(true)}>
                Quick publish an announcement
              </Button>
            </div>
          </CardBody>
          <CardFooter>
            <Button as={Link} to="/attendance/announcement" block color="primary" variant="light">
              See All Announcement
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

export default AnnouncementCard
