import type { RouteObject } from 'react-router-dom'

import CreateJobPage from '@/pages/Main/job/manajement/create/CreateJobPage'
import JobManajementPage from '@/pages/Main/job/manajement/index/JobManajementPage'
import RecruitmentStagesPage from '@/pages/Main/job/manajement/recruitment-stages/RecruitmentStagesPage'
import JobRequisitionPage from '@/pages/Main/job/requisition/index/JobRequisitionPage'
import ApproveListPage from '@/pages/Main/job/requisition/approve-list/ApproveListPage'
import PreviewPage from '@/pages/Main/job/requisition/preview/PreviewPage'
import EditJobPage from '@/pages/Main/job/manajement/edit/EditJobPage'

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
          path: ':vacancyId/edit',
          name: 'Edit',
          element: <EditJobPage />,
        },
        {
          path: 'recruitment-stages',
          name: 'Recruitment Stages',
          element: <RecruitmentStagesPage />,
        },
      ],
    },
    {
      path: 'requisition',
      name: 'Requisition',
      children: [
        {
          path: '',
          element: <JobRequisitionPage />,
        },
        {
          path: 'approve-list',
          name: 'Approve List',
          element: <ApproveListPage />,
        },
        {
          path: 'preview',
          name: 'Preview',
          element: <PreviewPage />,
        },
      ],
    },
  ],
}

export default jobRoute
