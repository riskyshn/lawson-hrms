import { BriefcaseIcon, FileIcon, RepeatIcon, UsersIcon } from 'lucide-react'
import genSidebarLinks from '@/utils/gen-sidebar-links'

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
    { parent: { icon: RepeatIcon, text: 'Process', to: '/process' } },
    { parent: { icon: FileIcon, text: 'Report', to: '/report' } },
  ],
})

export default recruitmentLinks
