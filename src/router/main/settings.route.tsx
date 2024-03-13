import type { RouteObject } from 'react-router-dom'

import SettingsCompanyPage from '@/pages/settings/company/index/SettingsCompanyPage'
import SettingsBranchPage from '@/pages/settings/branch/index/SettingsBranchPage'
import SettingsDepartmentPage from '@/pages/settings/department/index/SettingsDepartmentPage'

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
    {
      path: 'department',
      name: 'Department',
      children: [
        {
          path: '',
          element: <SettingsDepartmentPage />,
        },
      ],
    },
  ],
}

export default settingsRoute
