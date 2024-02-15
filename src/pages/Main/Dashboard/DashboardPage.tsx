import PageHeader from '@/components/UI/PageHeader'
import TalentPoolCard from './components/TalentPoolCard'
import AnnouncementCard from './components/AnnouncementCard'

const DashboardPage: React.FC = () => {
  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Dashboard' }]}
        title="Dashboard"
        subtitle={
          <>
            Good day to you, <span className="text-primary-600">User</span>! <br />
            Today is <span className="text-primary-600">{new Date().toDateString()}</span>
          </>
        }
      />

      <div className="p-3">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div>
            <TalentPoolCard />
          </div>
          <div>
            <AnnouncementCard />
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardPage
