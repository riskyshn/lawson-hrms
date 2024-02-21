import type { RouteObject } from 'react-router-dom'

import CreateJobPage from '@/pages/Main/Job/CreateJob'
import JobManagementPage from '@/pages/Main/Job/JobManagement'

const jobRoute: RouteObject = {
  path: 'job',
  name: 'Job',
  children: [
    {
      path: 'management',
      name: 'Management',
      children: [
        {
          path: '',
          element: <JobManagementPage />,
        },
        {
          path: 'create',
          name: 'Create',
          element: <CreateJobPage />,
        },
      ],
    },
  ],
}

export default jobRoute
