import { SidebarLinksOptions } from '@jshrms/ui'
import { BriefcaseIcon, FileIcon, RepeatIcon, UsersIcon } from 'lucide-react'

const recruitmentLinks: SidebarLinksOptions = {
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
      parent: { icon: RepeatIcon, text: 'Process', to: '/process' },
    },
    {
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
      parent: { icon: FileIcon, text: 'Report', to: '/report' },
    },
  ],
  title: 'Recruitment',
}

export default recruitmentLinks
