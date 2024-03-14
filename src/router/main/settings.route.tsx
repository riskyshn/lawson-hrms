import type { RouteObject } from 'react-router-dom'

import SettingsCompanyPage from '@/pages/settings/company/index/SettingsCompanyPage'
import SettingsBranchPage from '@/pages/settings/branch/index/SettingsBranchPage'
import SettingsDepartmentPage from '@/pages/settings/department/index/SettingsDepartmentPage'
import SettingsPositionPage from '@/pages/settings/position/index/SettingsPositionPage'
import SettingsJobLevelPage from '@/pages/settings/job-level/index/SettingsJobLevelPage'
import SettingsEmploymentStatusPage from '@/pages/settings/employment-status/index/SettingsEmploymentStatusPage'

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
    {
      path: 'position',
      name: 'Position',
      children: [
        {
          path: '',
          element: <SettingsPositionPage />,
        },
      ],
    },
    {
      path: 'job-level',
      name: 'Job Level',
      children: [
        {
          path: '',
          element: <SettingsJobLevelPage />,
        },
      ],
    },
    {
      path: 'employment-status',
      name: 'Employment Status',
      children: [
        {
          path: '',
          element: <SettingsEmploymentStatusPage />,
        },
      ],
    },
  ],
}

export default settingsRoute
