import genSidebarLinks from '@/utils/gen-sidebar-links'
import { BriefcaseIcon, FileIcon, RepeatIcon, UsersIcon } from 'lucide-react'

const recruitmentLinks = genSidebarLinks({
  title: 'Recruitment',
  items: [
    {
      parent: { icon: BriefcaseIcon, text: 'Job', to: '/job' },
      child: [
        { text: 'Job Management', to: '/job/management' },
        { text: 'Job Requisition', to: '/job/requisition' },
      ],
    },
    {
      parent: { icon: UsersIcon, text: 'Candidates', to: '/candidates' },
      child: [
        { text: 'Candidate Pool', to: '/candidates/pool' },
        { text: 'Candidate Management', to: '/candidates/management' },
        { text: 'Candidate Shortlisted', to: '/candidates/shortlisted' },
        { text: 'Candidate Rejected', to: '/candidates/rejected' },
        { text: 'Candidate Withdraw', to: '/candidates/withdraw' },
        { text: 'Candidate Blacklisted', to: '/candidates/blacklisted' },
        { text: 'Candidate Offered', to: '/candidates/offered' },
      ],
    },
    {
      parent: { icon: RepeatIcon, text: 'Process', to: '/process' },
      child: [
        {
          text: 'Interview',
          to: '/process/interview',
        },
        {
          text: 'Assessment',
          to: '/process/assessment',
        },
        {
          text: 'Offering Letter',
          to: '/process/offering-letter',
        },
        {
          text: 'Onboarding',
          to: '/process/onboarding',
        },
      ],
    },
    {
      parent: { icon: FileIcon, text: 'Report', to: '/report' },
      child: [
        {
          text: 'Summary & Analytics',
          to: '/report/summary',
        },
        {
          text: 'Candidate Demography',
          to: '/report/demography',
        },
      ],
    },
  ],
})

export default recruitmentLinks
