import type { RouteObject } from 'react-router-dom'

import SettingsCompanyPage from '@/pages/settings/company/index/SettingsCompanyPage'
import SettingsBranchPage from '@/pages/settings/branch/index/SettingsBranchPage'

const settingsRoute: RouteObject = {
  path: 'settings',
  name: 'Settings',
  children: [
    {
      path: 'company',
      name: 'Company',
      children: [
        {
          path: '',
          element: <SettingsCompanyPage />,
        },
      ],
    },
    {
      path: 'branch',
      name: 'Branch',
      children: [
        {
          path: '',
          element: <SettingsBranchPage />,
        },
      ],
    },
  ],
}

export default settingsRoute
