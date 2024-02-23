import type { RouteObject } from 'react-router-dom'

import CreateJobPage from '@/pages/Main/job/manajement/create/CreateJobPage'
import JobManajementPage from '@/pages/Main/job/manajement/index/JobManajementPage'
import RecruitmentStagesPage from '@/pages/Main/job/manajement/recruitment-stages/RecruitmentStagesPage'

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
          element: <JobManajementPage />,
        },
        {
          path: 'create',
          name: 'Create',
          element: <CreateJobPage />,
        },
        {
          path: 'recruitment-stages',
          name: 'Create',
          element: <RecruitmentStagesPage />,
        },
      ],
    },
  ],
}

export default jobRoute
