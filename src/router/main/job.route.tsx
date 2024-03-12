import type { RouteObject } from 'react-router-dom'
import CreateJobPage from '@/pages/job/manajement/create/CreateJobPage'
import DetailJobPage from '@/pages/job/manajement/detail/DetailJobPage'
import EditJobPage from '@/pages/job/manajement/edit/EditJobPage'
import JobManajementPage from '@/pages/job/manajement/index/JobManajementPage'
import RecruitmentStagesPage from '@/pages/job/manajement/recruitment-stages/RecruitmentStagesPage'
import ApproveListPage from '@/pages/job/requisition/approve-list/ApproveListPage'
import CreateJobRequisitionPage from '@/pages/job/requisition/create/CreateJobRequisitionPage'
import DetailJobRequisitionPage from '@/pages/job/requisition/detail/DetailJobRequisitionPage'
import EditJobRequisitionPage from '@/pages/job/requisition/edit/EditJobRequisitionPage'
import JobRequisitionPage from '@/pages/job/requisition/index/JobRequisitionPage'

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
          path: ':vacancyId',
          name: 'Detail',
          element: <DetailJobPage />,
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
          path: ':vacancyId',
          name: 'Detail',
          element: <DetailJobRequisitionPage />,
        },
        {
          path: 'create',
          name: 'Create',
          element: <CreateJobRequisitionPage />,
        },
        {
          path: ':vacancyId/edit',
          name: 'Edit',
          element: <EditJobRequisitionPage />,
        },
        {
          path: 'approve-list',
          name: 'Approve List',
          element: <ApproveListPage />,
        },
      ],
    },
  ],
}

export default jobRoute
