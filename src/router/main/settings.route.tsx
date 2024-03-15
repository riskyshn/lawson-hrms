import type { RouteObject } from 'react-router-dom'

import SettingsBranchPage from '@/pages/settings/branch/index/SettingsBranchPage'
import SettingsCompanyPage from '@/pages/settings/company/index/SettingsCompanyPage'
import SettingsDepartmentPage from '@/pages/settings/department/index/SettingsDepartmentPage'
import SettingsEmploymentStatusPage from '@/pages/settings/employment-status/index/SettingsEmploymentStatusPage'
import SettingsJobLevelPage from '@/pages/settings/job-level/index/SettingsJobLevelPage'
import SettingsPositionPage from '@/pages/settings/position/index/SettingsPositionPage'
import SettingsRolePage from '@/pages/settings/roles/index/SettingsRolePage'

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
      path: 'department',
      name: 'Department',
      element: <SettingsDepartmentPage />,
    },
    {
      path: 'position',
      name: 'Position',
      element: <SettingsPositionPage />,
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
      path: 'role',
      name: 'Roles',
      element: <SettingsRolePage />,
    },
  ],
}

export default settingsRoute
import type { RouteObject } from 'react-router-dom'

import SettingsCompanyPage from '@/pages/settings/company/index/SettingsCompanyPage'
import SettingsBranchPage from '@/pages/settings/branch/index/SettingsBranchPage'
import SettingsDepartmentPage from '@/pages/settings/department/index/SettingsDepartmentPage'
import SettingsPositionPage from '@/pages/settings/position/index/SettingsPositionPage'
import SettingsJobLevelPage from '@/pages/settings/job-level/index/SettingsJobLevelPage'
import SettingsEmploymentStatusPage from '@/pages/settings/employment-status/index/SettingsEmploymentStatusPage'
import SettingsDocumentRequestPage from '@/pages/settings/document-request/index/SettingsDocumentRequestPage'
import SettingsWorkPlacementPage from '@/pages/settings/workplacement/index/SettingsWorkPlacementPage'

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
    {
      path: 'document-request',
      name: 'Document Request',
      children: [
        {
          path: '',
          element: <SettingsDocumentRequestPage />,
        },
      ],
    },
    {
      path: 'workplacement',
      name: 'Work Placement',
      children: [
        {
          path: '',
          element: <SettingsWorkPlacementPage />,
        },
      ],
    },
  ],
}

export default settingsRoute
