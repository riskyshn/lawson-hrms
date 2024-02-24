import PageHeader from '@/components/UI/PageHeader'
import AnnouncementCard from './components/AnnouncementCard'
import { useAuthStore } from '@/store'
import Container from '@/components/Elements/Container'
import RecentlyAppliedCandidatesCard from './components/RecentlyAppliedCandidatesCard'
import UpcomingScheduleCard from './components/UpcomingScheduleCard'
import BgImage from '@/assets/hero.jpg'
import Logo from '@/components/Logo/Logo'
import RecentlyPostedJobsCard from './components/RecentlyPostedJobsCard'

const DashboardPage: React.FC = () => {
  const { user } = useAuthStore()
  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Dashboard' }]} />

      <Container className="py-3 xl:pb-8">
        <div className="relative mb-3 overflow-hidden rounded-lg bg-primary-600 px-3 py-14 text-white">
          <span
            className="absolute inset-0 block bg-cover bg-center bg-no-repeat opacity-20"
            style={{
              backgroundImage: `url(${BgImage})`,
            }}
          />

          <Logo className="absolute right-3 top-1/2 ml-auto h-48 w-48 -translate-y-1/2 opacity-30 md:h-72 md:w-72 [&_path]:fill-white" />

          <div className="relative z-10">
            <h1 className="mb-2 text-3xl font-semibold text-white">Company Name</h1>
            <>
              Good day to you, <span className="font-semibold capitalize">{user?.firstName}</span>! <br />
              Today is <span className="font-semibold">{new Date().toDateString()}</span>
            </>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <RecentlyAppliedCandidatesCard />
            <UpcomingScheduleCard />
          </div>
          <div className="flex flex-col gap-3">
            <AnnouncementCard />
            <RecentlyPostedJobsCard />
          </div>
        </div>
      </Container>
    </>
  )
}

export default DashboardPage
