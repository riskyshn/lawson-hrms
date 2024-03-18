import { SettingsIcon } from 'lucide-react'
import genSidebarLinks from '@/utils/gen-sidebar-links'

const settingsLinks = genSidebarLinks({
  title: 'Settings',
  items: [
    {
      parent: { icon: SettingsIcon, text: 'Settings', to: '/settings' },
      child: [
        { text: 'Company', to: '/settings/company' },
        { text: 'Branch', to: '/settings/branches' },
        { text: 'Department', to: '/settings/departments' },
        { text: 'Position', to: '/settings/positions' },
        { text: 'Job Level', to: '/settings/job-levels' },
        { text: 'Employment Status', to: '/settings/employment-status' },
        { text: 'Document Request', to: '/settings/document-request' },
        { text: 'Role', to: '/settings/roles' },
        { text: 'Work Placement', to: '/settings/work-placements' },
      ],
    },
  ],
})

export default settingsLinks
