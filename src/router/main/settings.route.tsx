import type { RouteObject } from 'react-router-dom'

import SettingsBranchPage from '@/pages/settings/branch/index/SettingsBranchPage'
import SettingsCompanyPage from '@/pages/settings/company/index/SettingsCompanyPage'
import SettingDepartmentsPage from '@/pages/settings/departments/SettingDepartmentsPage'
import SettingsEmploymentStatusPage from '@/pages/settings/employment-status/index/SettingsEmploymentStatusPage'
import SettingsJobLevelPage from '@/pages/settings/job-level/index/SettingsJobLevelPage'
import SettingPositionsPage from '@/pages/settings/positions/SettingPositionsPage'
import SettingRolesPage from '@/pages/settings/roles/SettingRolesPage'
import SettingWorkPlacementsPage from '@/pages/settings/work-placements/SettingWorkPlacementsPage'

const settingsRoute: RouteObject = {
  path: 'settings',
  name: 'Settings',
  children: [
    {
      path: 'company',
      name: 'Company',
      element: <SettingsCompanyPage />,
    },
    {
      path: 'branch',
      name: 'Branch',
      element: <SettingsBranchPage />,
    },
    {
      path: 'departments',
      name: 'Departments',
      element: <SettingDepartmentsPage />,
    },
    {
      path: 'positions',
      name: 'Positions',
      element: <SettingPositionsPage />,
    },
    {
      path: 'job-level',
      name: 'Job Level',
      element: <SettingsJobLevelPage />,
    },
    {
      path: 'employment-status',
      name: 'Employment Status',
      element: <SettingsEmploymentStatusPage />,
    },
    {
      path: 'roles',
      name: 'Roles',
      element: <SettingRolesPage />,
    },
    {
      path: 'work-placements',
      name: 'Work Placements',
      element: <SettingWorkPlacementsPage />,
    },
  ],
}

export default settingsRoute
