import { PackageIcon, SettingsIcon } from 'lucide-react'
import genSidebarLinks from '@/utils/gen-sidebar-links'

const settingsLinks = genSidebarLinks({
  items: [
    {
      child: [
        { text: 'Company', to: '/settings/company' },
        { text: 'Branch', to: '/settings/branches' },
        { text: 'Department', to: '/settings/departments' },
        { text: 'Position', to: '/settings/positions' },
        { text: 'Job Level', to: '/settings/job-levels' },
        { text: 'Employment Status', to: '/settings/employment-status' },
        { text: 'Document Request', to: '/settings/document-request' },
        { text: 'Role', to: '/settings/roles' },
        { text: 'Permissions', to: '/settings/permissions' },
        { text: 'Work Placement', to: '/settings/work-placements' },
      ],
      parent: { icon: SettingsIcon, text: 'Settings', to: '/settings' },
    },
    { parent: { icon: PackageIcon, text: 'CMS', to: '/cms' } },
  ],
  title: 'Settings',
})

export default settingsLinks
