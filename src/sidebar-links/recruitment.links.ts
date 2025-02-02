import { BriefcaseIcon, FileIcon, RepeatIcon, UsersIcon } from 'lucide-react'
import { SidebarLinksOptions } from '@/hooks'

const recruitmentLinks: SidebarLinksOptions = {
  title: 'Recruitment',
  items: [
    {
      child: [
        { text: 'Job Management', to: '/job/management' },
        { text: 'Job Requisition', to: '/job/requisition' },
      ],
      parent: { icon: BriefcaseIcon, text: 'Job', to: '/job' },
    },
    {
      child: [
        { text: 'Candidate Pool', to: '/candidates/pool' },
        { text: 'Candidate Management', to: '/candidates/management' },
        { text: 'Candidate Shortlisted', to: '/candidates/shortlisted' },
        { text: 'Candidate Rejected', to: '/candidates/rejected' },
        { text: 'Candidate Withdraw', to: '/candidates/withdraw' },
        { text: 'Candidate Blacklisted', to: '/candidates/blacklisted' },
        { text: 'Candidate Offered', to: '/candidates/offered' },
      ],
      parent: { icon: UsersIcon, text: 'Candidates', to: '/candidates' },
    },
    {
      child: [
        { text: 'Administration', to: '/process/administration' },
        { text: 'Selection', to: '/process/selection' },
        { text: 'Offering Letter', to: '/process/offering-letter' },
        { text: 'Onboarding', to: '/process/onboarding' },
      ],
      parent: { icon: RepeatIcon, text: 'Process', to: '/process' },
    },
    {
      child: [
        { text: 'Summary & Analytics', to: '/report/summary' },
        { text: 'Candidate Demography', to: '/report/demography' },
      ],
      parent: { icon: FileIcon, text: 'Report', to: '/report' },
    },
  ],
}

export default recruitmentLinks
