import BgImage from '@/assets/hero.webp'
import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import Logo from '@/components/Logo/Logo'
import { useAuthStore, useOrganizationStore } from '@/store'
import AnnouncementCard from './components/AnnouncementCard'
import RecentlyAppliedCandidatesCard from './components/RecentlyAppliedCandidatesCard'
import RecentlyPostedJobsCard from './components/RecentlyPostedJobsCard'
import UpcomingScheduleCard from './components/UpcomingScheduleCard'
import moment from 'moment'

export const Component: React.FC = () => {
  const { user } = useAuthStore()
  const { company } = useOrganizationStore()
  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Dashboard' }]} />

      <Container className="py-3 xl:pb-8">
        <div className="background-animate relative mb-3 overflow-hidden rounded-lg bg-gradient-to-r from-primary-400 to-primary-900 px-3 py-14 text-white">
          <span
            className="absolute inset-0 block bg-cover bg-fixed bg-center bg-no-repeat opacity-10"
            style={{
              backgroundImage: `url(${BgImage})`,
            }}
          />

          <Logo className="absolute right-3 top-1/2 ml-auto h-48 w-48 -translate-y-1/2 opacity-30 md:h-72 md:w-72 [&_path]:fill-white" />

          <div className="relative z-10">
            <h1 className="mb-2 text-3xl font-semibold text-white">{company?.name}</h1>
            <>
              Good day to you, <span className="font-semibold capitalize">{user?.firstName}</span>! <br />
              Today is <span className="font-semibold">{moment(new Date()).format('dddd, D MMMM YYYY')}</span>
            </>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <UpcomingScheduleCard />
            <RecentlyAppliedCandidatesCard />
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

Component.displayName = 'DashboardPage'
