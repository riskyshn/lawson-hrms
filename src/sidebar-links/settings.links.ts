import { SettingsIcon } from 'lucide-react'
import genSidebarLinks from '@/utils/gen-sidebar-links'

const settingsLinks = genSidebarLinks({
  title: 'Settings',
  items: [
    {
      parent: { icon: SettingsIcon, text: 'Settings', to: '/settings' },
      child: [
        { text: 'Company', to: '/settings/company' },
        { text: 'Branch', to: '/settings/branch' },
        { text: 'Department', to: '/settings/department' },
        { text: 'Position', to: '/settings/position' },
        { text: 'Job Level', to: '/settings/job-level' },
        { text: 'Employment Status', to: '/settings/employment-status' },
        { text: 'Document Request', to: '/settings/document-request' },
        { text: 'Role', to: '/settings/roles' },
        { text: 'Work Placement', to: '/settings/workplacement' },
      ],
    },
  ],
})

export default settingsLinks
