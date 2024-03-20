import type { RouteObject } from 'react-router-dom'

import SettingBranchesPage from '@/pages/settings/branches/SettingBranchesPage'
import SettingsCompanyPage from '@/pages/settings/company/SettingsCompanyPage'
import SettingDepartmentsPage from '@/pages/settings/departments/SettingDepartmentsPage'
import SettingEmploymentStatusPage from '@/pages/settings/employment-status/SettingEmploymentStatusPage'
import SettingJobLevelsPage from '@/pages/settings/job-levels/SettingJobLevelsPage'
import SettingPositionsPage from '@/pages/settings/positions/SettingPositionsPage'
import SettingRolesPage from '@/pages/settings/roles/SettingRolesPage'
import SettingWorkPlacementsPage from '@/pages/settings/work-placements/SettingWorkPlacementsPage'
import SettingsDocumentRequestPage from '@/pages/settings/document-request/index/SettingsDocumentRequestPage'

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
      path: 'branches',
      name: 'Branches',
      element: <SettingBranchesPage />,
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
      path: 'job-levels',
      name: 'Job Levels',
      element: <SettingJobLevelsPage />,
    },
    {
      path: 'employment-status',
      name: 'Employment Status',
      element: <SettingEmploymentStatusPage />,
    },
    {
      path: 'document-request',
      name: 'Document Request',
      element: <SettingsDocumentRequestPage />,
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
