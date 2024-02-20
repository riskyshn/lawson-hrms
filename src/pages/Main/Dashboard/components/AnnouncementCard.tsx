import { Card } from 'jobseeker-ui'

const AnnouncementCard: React.FC = () => {
  return (
    <Card>
      <div className="flex items-center border-b">
        <div className="flex-1 items-center p-3">
          <span className="text-lg font-semibold">Announcement</span>
        </div>
        <div className="relative flex w-1/2 p-3">
          <div className="relative flex flex-1 rounded-lg border">
            <label className="pointer-events-none absolute left-2 top-1 block text-xs">Filter by date</label>
            <input type="date" className="block w-full bg-transparent px-2 pb-1 pt-6 text-sm leading-none focus:outline-none" />
          </div>
        </div>
      </div>
      <div className="h-96 p-3">
        <ul>
          <li>
            <div></div>
          </li>
        </ul>
      </div>
    </Card>
  )
}

export default AnnouncementCard
